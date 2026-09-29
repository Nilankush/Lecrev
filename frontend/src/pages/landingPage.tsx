import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Check,
  Zap,
  MousePointerClick,
  Terminal,
  Globe,
  LayoutDashboard,
  Rocket,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";
import { useContext, type ReactNode } from "react";
import { OpenSignInContext } from "@/context/openSignInContext";
import { authClient } from "@/lib/auth-client";
import SignInDialog from "@/components/signInDialog";

function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-xl rounded-2xl border bg-card shadow-2xl overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
        <div className="ml-3 flex-1 truncate rounded-md bg-muted px-3 py-1 text-xs font-mono text-muted-foreground">
          https://my-app.lecrev.shop
        </div>
      </div>
      <div className="bg-black p-4 font-mono text-xs leading-6 text-green-400">
        <p><span className="text-muted-foreground">$</span> npm install</p>
        <p>✓ dependencies installed</p>
        <p><span className="text-muted-foreground">$</span> npm run build</p>
        <p>✓ build completed</p>
        <p className="text-cyan-300">→ uploading outputs/my-app/...</p>
        <p className="text-green-300">✓ finished. Live!</p>
      </div>
    </motion.div>
  );
}

function SimpleVisual() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-mono">Enter details:</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {[
          ["Project Name", "my-awesome-app"],
          ["Git URL *", "https://github.com/you/repo"],
          ["Build Script *", "npm run build"],
        ].map(([label, val]) => (
          <div key={label}>
            <p className="mb-1 text-xs text-muted-foreground">{label}</p>
            <div className="rounded-md border bg-muted px-3 py-2 font-mono text-xs">{val}</div>
          </div>
        ))}
        <Button className="w-full" size="sm">
          Deploy <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function FastVisual() {
  const lines = [
    "build started...",
    "npm install • 42 packages",
    "vite v6 building for production...",
    "✓ 128 modules transformed",
    "build completed.",
    "uploading outputs/my-app/index.html",
    "finished.",
  ];
  return (
    <Card className="w-full bg-black text-green-400">
      <CardContent className="p-4 font-mono text-xs leading-6">
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <Terminal className="h-4 w-4" /> live build logs
          <Badge variant="secondary" className="ml-auto">
            <span className="mr-1 h-2 w-2 animate-pulse rounded-full bg-green-500" /> streaming
          </Badge>
        </div>
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </CardContent>
    </Card>
  );
}

function ConvenientVisual() {
  return (
    <Card className="w-full">
      <CardContent className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2">
        {["portfolio", "blog", "dashboard-ui"].map((name) => (
          <div key={name} className="rounded-xl border p-3">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline" className="text-[10px]">Deployed</Badge>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="flex items-center gap-1 font-mono text-sm">
              <FaGithub className="h-4 w-4" /> {name}
            </p>
            <p className="mt-1 truncate text-xs text-cyan-500">https://{name}.lecrev.shop</p>
          </div>
        ))}
        <div className="col-span-full flex items-center gap-2 rounded-xl bg-muted p-3 text-xs">
          <LayoutDashboard className="h-4 w-4" /> All projects, URLs and logs in one place
        </div>
      </CardContent>
    </Card>
  );
}

const gradientText = "inline-block bg-linear-to-r from-[#8A2387] via-[#E94057] to-[#F27121] bg-clip-text text-transparent";

export default function LandingPage():React.JSX.Element{

    const openSignInContext = useContext(OpenSignInContext);

    if(!openSignInContext){
        throw new Error("OpenSignInContext must be used within a provider.");
    };
    

    const {data} = authClient.useSession();

    const user = data?.user;

    const navigate = useNavigate()

    const navigateToHome = () => {
      if(!user){
        return openSignInContext.setOpenSignIn(true);
      };
      navigate("/home");
    }

    return(
        <div className="flex w-full flex-col items-center">
          {openSignInContext.openSignIn && <SignInDialog openDialog={openSignInContext.openSignIn} closeDialog={openSignInContext.setOpenSignIn}/>}
            {/* HERO */}
            <section className="flex w-full flex-col items-center px-4 pb-16 pt-10 text-center md:pt-20">
                <Reveal>
                <Badge variant="outline" className="mb-4 font-mono">
                    <Rocket className="mr-1 h-3 w-3" /> PaaS for frontend apps
                </Badge>
                </Reveal>
                <Reveal delay={0.05}>
                <h1 className="font-mono text-3xl font-extrabold tracking-tight md:text-6xl">
                    DEPLOY YOUR PROJECTS
                </h1>
                </Reveal>
                <Reveal delay={0.1}>
                <p className={`mt-3 text-lg font-semibold md:text-2xl ${gradientText}`}>
                    Simple | Fast | Convenient
                </p>
                </Reveal>
                <Reveal delay={0.15}>
                <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
                    Paste a Git URL, add your build command and envs. LECREV builds in an
                    isolated container, uploads your <code className="font-mono">dist/</code> to
                    edge storage, and gives you a live URL — with streaming logs.
                </p>
                </Reveal>
                <Reveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={navigateToHome}>
                    Deploy Now <ArrowRight className="h-4 w-4" />
                </Button>
                </Reveal>
                <div className="mt-12 w-full flex justify-center px-2">
                <HeroVisual />
                </div>
            </section>

            <Separator className="w-[90%]" />

            {/* HOW IT WORKS */}
            <section id="how" className="w-full max-w-6xl px-4 py-16">
                <Reveal className="text-center">
                <h2 className="font-mono text-2xl font-bold md:text-3xl">How it works</h2>
                <p className="mt-2 text-sm text-muted-foreground">Three steps. No YAML, no servers.</p>
                </Reveal>
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                    { icon: <FaGithub className="h-5 w-5" />, t: "1. Connect", d: "Paste any public Git repo URL. Import from your GitHub list in one click." },
                    { icon: <Terminal className="h-5 w-5" />, t: "2. Build", d: "We run npm install + your build script in a clean container. Watch logs live." },
                    { icon: <Globe className="h-5 w-5" />, t: "3. Go live", d: "Your dist/ ships to R2 and gets an instant public URL you can share." },
                ].map((s, i) => (
                    <Reveal key={s.t} delay={i * 0.1}>
                    <Card className="h-full">
                        <CardHeader><CardTitle className="flex items-center gap-2 text-base">{s.icon}{s.t}</CardTitle></CardHeader>
                        <CardContent className="text-sm text-muted-foreground">{s.d}</CardContent>
                    </Card>
                    </Reveal>
                ))}
                </div>
            </section>

            {/* PILLARS */}
            <section className="w-full max-w-6xl space-y-20 px-4 pb-20">
                {/* SIMPLE */}
                <div id="simple" className="grid items-center gap-8 md:grid-cols-2">
                <Reveal>
                    <Badge><MousePointerClick className="mr-1 h-3 w-3" /> Simple</Badge>
                    <h3 className="mt-3 font-mono text-2xl font-bold md:text-4xl">
                    Deploy with a <span className={gradientText}>form</span>, not a pipeline
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {["Project name (optional)", "Git URL + build script", "Add .env vars inline"].map((x) => (
                        <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />{x}</li>
                    ))}
                    </ul>
                    <Button className="mt-6" variant="secondary" onClick={navigateToHome}>Try it — no config <ArrowRight className="h-4 w-4" /></Button>
                </Reveal>
                <Reveal y={60}><SimpleVisual /></Reveal>
                </div>

                {/* FAST */}
                <div id="fast" className="grid items-center gap-8 md:grid-cols-2">
                <Reveal y={60} className="order-2 md:order-1"><FastVisual /></Reveal>
                <Reveal className="order-1 md:order-2">
                    <Badge><Zap className="mr-1 h-3 w-3" /> Fast</Badge>
                    <h3 className="mt-3 font-mono text-2xl font-bold md:text-4xl">
                    Container builds, <span className={gradientText}>instant URLs</span>
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {["Isolated build per project", "dist/ pushed to R2 edge storage", "Live subdomain in seconds"].map((x) => (
                        <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />{x}</li>
                    ))}
                    </ul>
                </Reveal>
                </div>

                {/* CONVENIENT */}
                <div id="convenient" className="grid items-center gap-8 md:grid-cols-2">
                <Reveal>
                    <Badge><LayoutDashboard className="mr-1 h-3 w-3" /> Convenient</Badge>
                    <h3 className="mt-3 font-mono text-2xl font-bold md:text-4xl">
                    Everything in <span className={gradientText}>one dashboard</span>
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {["One-click import from GitHub repos", "Real-time log streaming per deploy", "Project list with live URLs + redeploy"].map((x) => (
                        <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />{x}</li>
                    ))}
                    </ul>
                </Reveal>
                <Reveal y={60}><ConvenientVisual /></Reveal>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full px-4 pb-16">
                <Reveal className="mx-auto max-w-4xl rounded-3xl border bg-linear-to-br from-[#8A2387]/15 via-[#E94057]/15 to-[#F27121]/15 p-8 text-center md:p-12">
                <h2 className="font-mono text-2xl font-bold md:text-4xl">Ship your first project in minutes</h2>
                <p className="mt-2 text-sm text-muted-foreground">If it builds to static files, LECREV can host it.</p>
                <Button size="lg" className="mt-6" onClick={navigateToHome}>
                    Start Deploying <ArrowRight className="h-4 w-4" />
                </Button>
                </Reveal>
            </section>

            <footer className="flex w-full items-center justify-between border-t px-4 py-6 text-xs text-muted-foreground md:px-10">
                <p className={`font-extrabold ${gradientText}`}>LECREV</p>
                <p className="font-mono">Simple | Fast | Convenient</p>
            </footer>
        </div>
  );
};