<script lang="ts">
    export let data:PageData
    import"../app.css"
    import { page } from "$app/stores";
    import { metaTagsStore,appStore } from "src/lib/store"
    import apiRequest from "src/lib/api";
    import Nav from "src/components/core/nav/Nav.svelte";
    import Footer from "src/components/core/footer/Footer.svelte";
    import type { PageData } from "./$types.js";
    // set store
    appStore.set({ theme:data.theme })
    $: light = $appStore.theme==="light"
    $: url = $page.url.href
    $: appName = $metaTagsStore.appName
    $: ogType = $metaTagsStore.ogType ? $metaTagsStore.ogType:"website" 
    $: title = $metaTagsStore.title ? `${$metaTagsStore.title} | ${appName}`:`${appName} | Portfolio` 
    $: description = $metaTagsStore.description ? $metaTagsStore.description:"I am a full Stack JavaScript Developer." 
    $: image = $metaTagsStore.image ? $metaTagsStore.image:"https://developedbyant.com/images/backdrop.png" 

    /** Change current theme color */
    function changeTheme() {
        // update app store
        appStore.update(data=>{ data['theme']=data['theme']==="dark"?"light":"dark" ; return data }) 
        // send api request to update theme cookie
        apiRequest("/api/set-theme",{ theme:$appStore.theme })
    }
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />
</svelte:head>
<div class="app" class:light>
    <div class="content">
        <Nav on:themeChanged={changeTheme}/>
        <main>
            <slot />
        </main>
        <Footer />
    </div>
</div>

<style lang="scss">
    .app{
        height: 100vh;
        overflow-y: scroll;
        scroll-behavior:smooth;
        background: var(--app-bg);
    }
    .content{
        display: flex;
        flex-direction: column;
        gap: 50px;
    }
    main{
        max-width: var(--max-width);
        width: 95%;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 80px;
    }
    // mobile
    @media(max-width:700px){
        main{
            gap: 40px;
        }
    }
</style>