import type { Request, Response  } from "express";
import {generateSlug} from "random-word-slugs";
import { ECSClient, RunTaskCommand, type ECSClientConfig } from "@aws-sdk/client-ecs";
import projectModel from "../models/projectsModel.js";
import { DeleteObjectsCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import logModel from "../models/logsModel.js";

const config: ECSClientConfig = {
    region:"ap-south-1",
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string ,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
}

const ecsClient = new ECSClient(config);

const R2_client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT as string,
    credentials:{
        accessKeyId: process.env.R2_ACCESSKEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_ACCESSKEY as string
    }
});


export const projectCreateController = async (req: Request, res: Response)=>{

  const { gitUrl, projectId, buildScript, envs } = req.body;


  

  
  const project_id: string = projectId ? (projectId.toLowerCase()+ "-" + generateSlug(2)) : generateSlug(2);
  if(!gitUrl || !project_id || !buildScript) return res.status(404).json({msg:"bad request."});

  const defaultEnv = [
    {name: "GIT_REPOSITORY_URL", value: gitUrl},
    {name: "PROJECT_ID", value: project_id},
    {name: "BUILD_SCRIPT", value: buildScript}
  ];

  const containerEnv = envs ? envs.concat(defaultEnv) : defaultEnv;
  

  const command = new RunTaskCommand({
      cluster: "arn:aws:ecs:ap-south-1:642328612524:cluster/builder_Server_cluster",
      taskDefinition: "arn:aws:ecs:ap-south-1:642328612524:task-definition/build_server_task:3",
      launchType: 'FARGATE',
      count: 1,
      networkConfiguration: {
          awsvpcConfiguration: {
              assignPublicIp: 'ENABLED',
              subnets: ["subnet-0cd6b7c31df6730ca", "subnet-09fa6f65cfee11145", "subnet-0d9298071a52630a7"],
              securityGroups: ['sg-0f67ee28233325551']
          }
      },
      overrides:{
          containerOverrides:[
              {
                  name: "build_Server_image",
                  environment: containerEnv
              }
          ]
      }
  });

  const r2_Res = await ecsClient.send(command);
  

  if(r2_Res.$metadata.httpStatusCode === 200){
      const newProject = await projectModel.create({
          created_by: req.user.id,
          project_id: project_id,
          project_url: `https://${project_id}.lecrev-lnf2.onrender.com`
      });
      return res.status(201).json(newProject);
  }
  
  return res.status(500).json({msg: "Server error."});
    
};

export const allProjectController = async(req: Request, res: Response) => {
  const id = req.user.id;
  if(id){      
      const projects = await projectModel.find({created_by: id});
      return res.status(200).json(projects);
  }
};

export const deleteProjectController = async(req: Request, res: Response) => {

  try {

    const id = req.params.id as string;
    const folderPath = req.params.prefix as string;

    if (!folderPath || folderPath.trim() === "") {
      return res.status(400).json({ error: "Folder path is required." });
    }

    // Guard against accidentally wiping the whole bucket
    const prefix = folderPath.replace(/^\/+/, ""); // strip leading slashes
    if (prefix === "" || prefix === "/") {
      return res.status(400).json({ error: "Refusing to delete bucket root." });
    }

    const deletedCount = await deleteFolder(id,prefix);

    if (deletedCount === 0) {
      return res.status(404).json({ error: "No objects found under that folder." });
    }

    return res.status(200).json({
      message: `Project ${prefix} deleted.`,
      deletedCount,
    });
  } catch (err) {
    console.error("Error deleting folder:", err);
    return res.status(500).json({ error: "Failed to delete folder." });
  }

    
};

async function deleteFolder(id: string, prefix: string) {
  if (!prefix.endsWith("/")) prefix += "/";  

  let continuationToken;
  let totalDeleted = 0;

  do {
    const listResponse: any = await R2_client.send(
      new ListObjectsV2Command({
        Bucket: process.env.BUCKET_NAME,
        Prefix: `outputs/${prefix}`,
        ContinuationToken: continuationToken,
      })
    );

    const contents = listResponse.Contents;
    if (!contents || contents.length === 0) break;   

    const deleteResponse = await R2_client.send(
      new DeleteObjectsCommand({
        Bucket: process.env.BUCKET_NAME,
        Delete: {
          Objects: contents.map((obj: any) => ({ Key: obj.Key })),
          Quiet: false,
        },
      })
    );

    totalDeleted += deleteResponse.Deleted?.length ?? 0;

    if (deleteResponse.Errors?.length) {
      throw new Error(
        `Failed to delete some objects: ${JSON.stringify(deleteResponse.Errors)}`
      );
    }
    if(deleteResponse.$metadata.httpStatusCode === 200){
        await projectModel.deleteOne({_id: id});
        
        await logModel.deleteMany({project_id: prefix.replace("/","")});        
    };
    continuationToken = listResponse.NextContinuationToken;
  } while (continuationToken);

  return totalDeleted;
}
