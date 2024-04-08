import fs from "fs"
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mdToSvelte from 'md-to-svelte';

/** Convert markdown file to svelte
 * @param outPutDir - Directory to save converted markdown  */
function viteMdToSvelte(outPutDir:`src/routes/${string}`) {
    return {
        name: 'md-to-svelte',
        async handleHotUpdate(data:any) {
            const run = (data.file.endsWith(".md") && data.server.config.mode === "development");
            if(run){
				const pages = await mdToSvelte(outPutDir, {
                    appName:"DevelopedByAnt",domainUrl:"https://developedbyant.com",
                    defaultImage:"https://developedbyant.com/images/backdrop.png", devMode:true
                })
				// save pages to markdown.json
				fs.writeFileSync("src/routes/blog/data.json",JSON.stringify(pages,null,4))
			}
        },
    };
}


export default defineConfig({
	plugins: [viteMdToSvelte("src/routes/blog/"),sveltekit()],
});