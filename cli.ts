import * as clack from "@clack/prompts";
import { execSync } from "child_process"
import fs from "fs"
const CONFIG = { selectedApp:"",dev:false }
const APPS:AppData = {
    "developedbyant.com":{
        port:3000,
        local:"~/dev/projects/developedbyant.com",
        prod:"/var/www/developedbyant.com",
    },
    "kitdocs.dev":{
        port:3001,
        local:"~/dev/projects/kit-docs",
        prod:"/var/www/kitdocs.dev",
    },
    "svelteblocks.dev":{
        port:3002,
        local:"~/dev/projects/svelte-blocks",
        prod:"/var/www/svelteblocks.dev",
    }
}

/** Add site nginx server block */
const addToNginx = (appData:AppData)=>{
    /** project base dir */
    const base = CONFIG['dev'] ? './testNginx' : '/etc/nginx'
    const [domain,domainData] = [Object.keys(appData)[0],Object.values(appData)[0]]
    const nginxSitesPath = `${base}/sites-available`
    const nginxSites = fs.readdirSync(nginxSitesPath).filter(site=>(site.endsWith(".com")||site.endsWith(".dev")))
     // if app does not exists in nginx, create server block and link it
    if(nginxSites.includes(domain)) return
    // else create server block
    const serverBlock = `server {
    server_name ${domain} www.${domain};
    location / {
        proxy_pass http://localhost:${domainData.port};
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        include proxy_params; 
    }
}`
    // create server block file
    fs.writeFileSync(`${base}/sites-available/${domain}`,serverBlock)
    clack.log.info("Nginx server block created")
    // to avoid error, stop function when dev mode
    if(CONFIG['dev']) return
    // add site to sites enabled
    execSync(`sudo ln -s ${base}/sites-available/${domain} ${base}/sites-enabled/`)
    clack.log.info(`Enabled ${domain}`)
    // restart nginx
    execSync(`sudo systemctl restart nginx`)
    clack.log.info("Restarted nginx")
    clack.log.success(`App:${CONFIG.selectedApp} was added to nginx`)
}

/** Capitalize string */
const capitalize = (data:string)=> data.charAt(0).toUpperCase()+data.slice(1)

/** Check if action was canceled */
const cancelAction = (action:any,actionName:string)=>{
    if(!clack.isCancel(action)) return
    clack.cancel(`Action ${actionName} was canceled`);
    process.exit(1);
}

while(true){
    const spinner = clack.spinner()
    const runningApps = JSON.parse(execSync("pm2 jlist").toString()) as Running[]

    // select top action
    const topAction:TopAction = await clack.select({
        message: "Select top action",
        options: [
            { label: "Check apps", value: "apps" },
            { label: "List ports", value: "ports" },
            { label: "Stop CLI", value: "stop" }
        ]
    }) as any;
    cancelAction(topAction,"Top action")
    if(topAction==="ports"){
        clack.log.info("APPS ports: "+JSON.stringify(Object.values(APPS).map(data=>data.port)))
        clack.log.info("PM2 ports: "+JSON.stringify(runningApps.map(data=>data.pm2_env.PORT)))
        continue
    }
    else if(topAction==="stop"){
        clack.log.info("Good bye :)")
        process.exit(1);
    }

    // select app
    const selectApp:any = await clack.select({
        message: "Select app",
        options: Object.keys(APPS).map(appName=>{ return { label: capitalize(appName), value: appName } })
    });
    cancelAction(selectApp,"App selection") ; CONFIG['selectedApp'] = selectApp

    // select action to run
    const actionToRun:ActionToRun = await clack.select({
        message: "What would you like to do ?",
        options: [
            { label: "Check status", value: "status" },
            { label: "Start app", value: "start" },
            { label: "Restart app", value: "restart" },
            { label: "Stop app", value: "stop" },
            { label: "Delete app", value: "delete" },
        ]
    }) as any;
    cancelAction(actionToRun,"Action to run")

    // handle action to run
    const runningAppData = runningApps.find(data=>data.name===CONFIG.selectedApp)
    // check status
    if(actionToRun==="status"){
        if(!runningAppData){
            clack.log.error(`App:${CONFIG.selectedApp} is not running`)
            continue
        }
        // else show app data
        clack.log.info(JSON.stringify({
            status:runningAppData.pm2_env.status,
            name:runningAppData.name,
            port:runningAppData.pm2_env.PORT,
            url:`http://localhost:${runningAppData.pm2_env.PORT}`,
            path:runningAppData.pm2_env.pm_exec_path
        },null,4))
    }
    // start app
    else if(actionToRun==="start"){
        // if app is already started, skip loop
        if(runningAppData){
            clack.log.error(`App:${CONFIG.selectedApp} is already started`)
            continue
        }
        // else start app
        // show start options
        let startOptions:string[] = await clack.multiselect({
            message: 'Options to start app with (use space key to select)',
            options: [
                { value: '--watch', label: 'Watch app', hint: 'auto restart app when file change' },
                { value: '-i', label: 'Cluster mode' },
            ],
            required: false,
        }) as any;
        cancelAction(startOptions,"Options selection")
        // if Cluster was selected
        if(startOptions.find(data=>data==="-i")){
            const clustersNum:number = await clack.select({
                message: "Select top action",
                options: [
                    { label: "minimum", value: 1 },
                    { label: "maximum", value: 0 },
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                    { label: "3", value: 3 },
                    { label: "4", value: 4 },
                    { label: "5", value: 5 },
                    { label: "6", value: 6 },
                ]
            }) as any;
            cancelAction(clustersNum,"Cluster selection")
            startOptions = startOptions.map(data=>data==="-i"?`-i ${clustersNum}`:data)
        }
        const appData = APPS[CONFIG.selectedApp]
        // build app running bun run build
        spinner.start("Running bun install")
        execSync(`cd ${CONFIG.dev?appData.local:appData.prod} && bun install && cd ${process.cwd()}`)
        spinner.start("Building app")
        execSync(`cd ${CONFIG.dev?appData.local:appData.prod} && bun run build && cd ${process.cwd()}`)
        spinner.stop("App was build app")
        // start app
        execSync(`PORT=${appData.port} pm2 start ${CONFIG.dev?appData.local:appData.prod}/build/index.js --name=${CONFIG.selectedApp} ${startOptions.join(" ")}`)
        clack.log.success(`App:${CONFIG.selectedApp} was started`)
        // add site to nginx
        addToNginx({ [selectApp]:APPS[selectApp] })
    }
    // restart app
    else if(actionToRun==="restart"){
        // if app is not running show error and skip loop
        if(!runningAppData){
            clack.log.error(`App:${CONFIG.selectedApp} is not running`)
            continue
        }
        // build app running bun run build
        const appData = APPS[CONFIG.selectedApp]
        spinner.start("Running bun install")
        execSync(`cd ${CONFIG.dev?appData.local:appData.prod} && bun install && cd ${process.cwd()}`)
        spinner.start("Building app")
        execSync(`cd ${CONFIG.dev?appData.local:appData.prod} && bun run build && cd ${process.cwd()}`)
        spinner.stop("App was build app")
        // else restart app
        execSync(`pm2 restart ${CONFIG.selectedApp}`)
        clack.log.success(`App:${CONFIG.selectedApp} was restarted`)
    }
    // stop app
    else if(actionToRun==="stop"){
        // if app is not running show error and skip loop
        if(!runningAppData){
            clack.log.error(`App:${CONFIG.selectedApp} is not running`)
            continue
        }
        // else stop app
        execSync(`pm2 stop ${CONFIG.selectedApp}`)
        clack.log.success(`App:${CONFIG.selectedApp} was stopped`)
    }
    // delete app
    else if(actionToRun==="delete"){
        // if app is not running show error and skip loop
        if(!runningAppData){
            clack.log.error(`App:${CONFIG.selectedApp} is not running`)
            continue
        }
        // else stop app
        execSync(`pm2 delete ${CONFIG.selectedApp}`)
        clack.log.success(`App:${CONFIG.selectedApp} was deleted`)
    }
}

type TopAction = "ports"|"apps"|"stop"
type ActionToRun = "status"|"restart"|"start"|"stop"|"delete"
type AppData = {
    [key:string]:{
        port:number
        local:string
        prod:`${string}.${string}`
    }
}
type Running = {
    pid:number
    name:string
    pm2_env:{
        pm_exec_path:string
        PORT:number
        status:"online"|"stopped"
    }
}