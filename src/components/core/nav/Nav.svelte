<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { appStore } from "src/lib/store";
    import Link from "./Link.svelte";
    import SunIcon from "src/icons/Sun.svelte"
    import MoonIcon from "src/icons/Moon.svelte"
    $: theme = $appStore.theme
    $: logoSrc = $appStore.theme==="dark"?"/images/logo.png":"/images/dark-logo.png"
    const dispatch = createEventDispatcher()
    /** Change site theme from */
    const changeTheme = ()=> dispatch("themeChanged",$appStore.theme)
</script>

<header class="nav-header">
    <nav class="nav">
        <a href="/" class="logo">
            <img src={logoSrc} alt="anthony">
        </a>
        <ul class="nav-links">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
        </ul>
        <button class="theme-toggle" on:click={changeTheme}>
            {#if theme==="dark"}
                <MoonIcon size="100%"/>
            {:else}
                <SunIcon size="100%"/>
            {/if}
        </button>
    </nav>
</header>

<style lang="scss">
    .nav-header{
        padding: 15px 0;
        backdrop-filter: blur(5px);
        z-index: 2;
        border-bottom: 1px solid var(--border-color);
        box-shadow: 0 2px 2px var(--shadow);
    }
    .nav{
        max-width: var(--max-width);
        width: 95%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    }
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
        img{
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
        }
    }
    .nav-links{
        display: flex;
        align-items: center;
        gap: 10px;
        list-style: none;
        background-color: var(--nav-bg);
        padding: 10px;
        border-radius: 50px;
    }
    .theme-toggle{
        all: unset;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        fill: var(--icon-color);
    }
    // mobile
    @media(max-width:700px){
        .nav-header{
            position: sticky;
            top: 0;
            left: 0;
        }
        .logo{
            width: 40px;
            height: 40px;
        }
        .theme-toggle{
            width: 30px;
            height: 30px;
        }
    }
</style>