<script lang="ts">
    import data from "./data.json";
    import PageTitle from "src/components/PageTitle.svelte";
    // console.log(data)
    const posts:typeof data['Posts'][0][] = []
    for(const items of Object.values(data)){
        for(const post of items){ posts.push(post) }
    }
</script>

<PageTitle>SOON</PageTitle>
<div class="items">
    {#each posts as post}
        <a href={post.href} class="item">
            <div class="image">
                <img src={ post.image || "/images/test.png"} alt={post.title}>
            </div>
            <div class="info">
                <span class="title">{post.title}</span>
                <p class="desc">{post.description}</p>
            </div>
        </a>
    {/each}
</div>

<style>
    .items{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin: 30px 0px;
    }
    .item{
        text-decoration: none;
        width: calc(100% / 4 - 15px);
        display: flex;
        flex-direction: column;
        background: var(--card-bg);
        color: var(--card-text-color);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 1px 2px 3px var(--shadow);
    }
    .image{
        display: flex;
        align-items: center;
        justify-content: center;
        & img{
            object-fit: contain;
            object-position: center;
            width: 100%;
            height: 100%;
        }
    }
    .info{
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 5px;
    }
    .title{
        font-size: 20px;
        font-weight: 600;
        color: var(--card-header-color);
        text-transform: capitalize;
    }
    .desc{
        font-size: 14px;
        font-weight: 300;
        color: var(--card-text-color);
    }
    /* on mobile */
    @media(max-width:700px){
        .item{
            width: 100%;
        }
    }
</style>