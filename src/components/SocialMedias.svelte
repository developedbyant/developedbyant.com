<script lang="ts">
    import data from "src/data";
    import TwitterX from "src/icons/TwitterX.svelte"
    import Github from "src/icons/Github.svelte";
    import Linkedin from "src/icons/Linkedin.svelte";
    // import Meta from "src/icons/Meta.svelte";
    import Instagram from "src/icons/Instagram.svelte";
    const socialMedias = data.socialMedias
</script>

<ul class="social-medias">
    <a target="_blank" href={socialMedias.twitter} class="social-media">
        <TwitterX size="100%"/>
    </a>
    <a target="_blank" href={socialMedias.github} class="social-media">
        <Github size="100%"/>
    </a>
    <a target="_blank" href={socialMedias.linkedin} class="social-media">
        <Linkedin size="100%"/>
    </a>
     <a target="_blank" href={socialMedias.instagram} class="social-media">
        <Instagram size="100%"/>
    </a>
    <!-- <a href="/" class="social-media">
        <Meta size="100%"/>
    </a> -->
</ul>

<style lang="scss">
    .social-medias{
        display: flex;
        gap: 10px;
    }
    .social-media{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--icon-color);
        width: 40px;
        height: 40px;
        background-color: var(--app-fb);
        padding: 10px;
        border-radius: 3px;
        box-shadow: 1px 2px 3px var(--shadow);
    }
</style>