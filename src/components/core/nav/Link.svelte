<script lang="ts">
    export let href:string
    import { page } from "$app/stores"
    $: active = $page.url.pathname===href || $page.url.pathname.split("/")[1]===href.split("/")[1]
</script>

<li class:active>
    <a {href} class="nav-link">
        <slot />
    </a>
</li>

<style lang="scss">
    .nav-link{
        text-decoration: none;
        font-size: 15px;
        font-weight: 600;
        color: var(--nav-link-color);
        padding: 5px 10px;
        border-radius: 50px;
    }
    .active .nav-link,.nav-link:hover{
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        background-color: var(--nav-link-bg);
        color: var(--nav-link-active-color);
    }
    // mobile
    @media(max-width:700px){
        .nav-link{
            font-size: 13px;
            /* font-weight: 500; */
        }
        
    }
</style>