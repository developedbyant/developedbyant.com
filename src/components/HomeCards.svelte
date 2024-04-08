<script lang="ts">
    import data from "src/data";
    import Cards from "./cards/Cards.svelte";
    import Card from "./cards/Card.svelte";
    // icons
    import Html from "src/icons/brand/Html.svelte";
    import Svelte from "src/icons/brand/Svelte.svelte";
    import MongoDB from "src/icons/brand/MongoDB.svelte";
    import NodeJs from "src/icons/brand/NodeJs.svelte";
    import React from "src/icons/brand/React.svelte";
    import Sass from "src/icons/brand/Sass.svelte";
    const icons:{[key:string]:any} = {
        html:Html,
        nodejs:NodeJs,
        react:React,
        svelte:Svelte,
        mongodb:MongoDB,
        sass:Sass,
    }
</script>

<Cards>
    {#each data.skills as skill}
        <Card title={skill.title} icon={icons[skill.icon]}>{skill.description}</Card>
    {/each}
</Cards>