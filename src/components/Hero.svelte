<script lang="ts">
    import data from "src/data";
    import SocialMedias from "src/components/SocialMedias.svelte";
    const imageSrc = "/images/anthony.png"
</script>

<section class="hero">
    <div class="info">
        <h2 class="header">{data.title}</h2>
        <p class="about">{data.description}</p>
        <SocialMedias />
    </div>
    <div class="image">
        <img src={imageSrc} alt="anthony">
    </div>
</section>

<style lang="scss">
    .hero{
        display: flex;
        align-items: center;
        gap: 40px;
    }
    .info{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .header{
        font-size: 70px;
        font-weight: 900;
        color: var(--header-color);
    }
    .about{
        font-size: 18px;
        font-weight: 400;
        color: var(--text-color);
        text-transform: capitalize;
    }
    .image{
        min-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 30px 10px var(--shadow);
        img{
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: auto;
        }
    }
    // mobile
    @media(max-width:700px){
        .hero{
            gap: 10px;
            flex-direction: column-reverse;
            align-items: flex-start;
        }
        .header{
            font-size: 50px;
            font-weight: 700;
        }
        .about{
            font-size: 15px;
            font-weight: 300;
        }
        .image{
            min-width: 100px;
            width: 150px;
        }
    }
</style>