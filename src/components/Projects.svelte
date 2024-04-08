<script lang="ts">
    import data from "src/data";
    // icons
    import Html from "src/icons/brand/Html.svelte";
    import Svelte from "src/icons/brand/Svelte.svelte";
    import MongoDB from "src/icons/brand/MongoDB.svelte";
    import NodeJs from "src/icons/brand/NodeJs.svelte";
    import React from "src/icons/brand/React.svelte";
    import Sass from "src/icons/brand/Sass.svelte";
    import ExternalLink from "src/icons/ExternalLink.svelte";
    const icons:{[key:string]:any} = {
        html:Html,
        nodejs:NodeJs,
        react:React,
        svelte:Svelte,
        mongodb:MongoDB,
        sass:Sass,
    }
    const projects = data.projects
</script>

<div class="projects">
    {#each projects as project }
        <div class="project">
            <div class="image">
                <div class="blur">
                    <a href={project.url} target="_blank" class="btn">
                        <ExternalLink size="100%"/>
                    </a>
                </div>
                <img src={project.image} alt={project.title} class="image">
            </div>
            <div class="info">
                <span class="title">{project.title}</span>
                <p class="desc">{project.desc}</p>
                <div class="technologies">
                    {#each project.technologies as technology }
                        <div class="technology">
                            <svelte:component size="100%" this={icons[technology]} />
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    .projects{
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }
    .project{
        width: calc(100% / 2 - 10px);
        display: flex;
        gap: 10px;
        border-radius: 10px;
        box-shadow: 1px 2px 3px var(--shadow);
        background-color: var(--app-fb);
        overflow: hidden;
        border: 1.5px solid var(--border-color);
    }
    .image{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .blur{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,20%);
            z-index: 1;
        }
        img{
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
        }
    }
    .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--app-fb);
        padding: 6px;
        fill: var(--icon-color);
        border-radius: 50%;
        box-shadow: 1px 2px 2px var(--shadow);
        margin: 5px 0 0 5px;
        width: 25px;
        height: 25px;
    }
    .info{
        flex: 1.5;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .title{
        text-transform: capitalize;
        font-size: 30px;
        font-weight: 700;
        color: var(--header-color);
    }
    .desc{
        text-transform: capitalize;
        font-size: 14px;
        font-weight: 400;
        color: var(--text-color);
    }
    .technologies{
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: auto;
        margin-bottom: 10px;
    }
    .technology{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        padding: 5px;
        background: var(--border-color);
        border-radius: 5px;
        box-shadow: 1px 2px 3px var(--shadow);
    }
    // mobile
    @media(max-width:700px){
        .project{
            width: 100%;
            flex-direction: column;
        }
        .info{
            padding: 10px;
        }
        .title{
            font-size: 25px;
        }
        .desc{
            font-size: 13px;
            font-weight: 300;
        }
    }
</style>