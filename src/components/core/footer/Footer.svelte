<script lang="ts">
    import SocialMedias from "src/components/SocialMedias.svelte";
    const text = `© Copyright ${new Date().getFullYear()}. All rights reserved.`
</script>

<footer class="main-footer">
    <div class="content">
        <span class="copyright">{text}</span>
        <SocialMedias />
    </div>
</footer>

<style lang="scss">
    .main-footer{
        background-color: var(--footer-bg);
        padding: 20px 0;
    }
    .content{
        max-width: var(--max-width);
        width: 95%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .copyright{
        text-transform: capitalize;
        font-size: 15px;
        font-weight: 300;
        color: var(--footer-text-color);
    }
    // mobile
    @media(max-width:700px){
        .content{
            flex-direction: column;
        }
        .copyright{
            font-size: 13px;
            font-weight: 300;
        }
    }
</style>