import path from "path";
import { ChildProcess, exec } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import mime from "mime-types";
import {Redis} from "ioredis";

const projectId = process.env.PROJECT_ID;
const buildScript = process.env.BUILD_SCRIPT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const R2_client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT as string,
    credentials:{
        accessKeyId: process.env.R2_ACCESSKEY_ID as  string,
        secretAccessKey: process.env.R2_SECRET_ACCESSKEY as string
    }
});

const producer = new Redis(process.env.REDIS_URL as string);

const publishLog = async(logs: string): Promise<void> =>{
    await producer.publish(`logs:${projectId}`,JSON.stringify({projectId, logs}));
};


async function uploader(): Promise<void>{

    console.log("running index.ts");
    await publishLog("build started...");

    const outputDirPath: string = path.join(__dirname,"output");

    const allEnvs = Object.entries(process.env);
    if(allEnvs.length>37){
       allEnvs.length = (allEnvs.length - 37);
       const envContent = allEnvs.map(({name,value}:any)=> `${name}=${/[\n\s#]/.test(value)? JSON.stringify(value): value}`).join("\n");
       if(envContent) {
        fs.writeFileSync(path.join(outputDirPath, ".env"), envContent, "utf-8");     
        
        console.log(`.env file created with ${allEnvs.length} variables.`);        
        await publishLog(`.env file created with ${allEnvs.length} variables.`);
       };
    };

    const npmCommand: ChildProcess = exec(`cd ${outputDirPath} && npm install && ${buildScript}`);

    npmCommand.stdout?.on("data", async function(data){
        console.log(data.toString());
        await publishLog(data.toString());
    });

    npmCommand.stderr?.on("data", async function(data){
        console.error(data.toString());
        await publishLog(data.toString());
    });

    npmCommand.on("error", async function(error){
        console.error("error: "+error.toString());
        await publishLog("error: "+error.toString());
    });

    npmCommand.on("close", async function(){
        console.log("build completed.");
        await publishLog("build completed.");

        const distFolderPath: string = path.join(__dirname,"output","dist");
        const distFolderContents = fs.readdirSync(distFolderPath,{recursive: true});

        publishLog("uploading started...");

        for(const file of distFolderContents){

            const filePath: string = path.join(distFolderPath,file as any);            
            if(fs.lstatSync(filePath).isDirectory()) continue;

            console.log("uploading", filePath);
            await publishLog("uploading "+ filePath);

            const command = new PutObjectCommand({
                Bucket: "vercel-clone",
                Key:`outputs/${projectId}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath) || undefined
            })

            await R2_client.send(command);

            console.log("uploaded", filePath);  
            await publishLog("uploaded "+ filePath);       
        }

        console.log("finished.");
        await publishLog("finished.");

        process.exit(0);

    });
};

uploader();