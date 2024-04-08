<script lang="ts">
    export let title:string
    export let icon:any = undefined
</script>

<div class="card">
    <div class="content">
        <div class="header">
            <span class="title">{title}</span>
            {#if icon} 
                <div class="icon">
                    <svelte:component this={icon} size="100%"/>
                </div>
            {/if}
        </div>
        <p class="text"><slot /></p>
    </div>
</div>

<style lang="scss">
    .card{
        width: calc(100% / 3 - 20px);
        padding: 2px;
        border-radius: 10px;
        background: var(--app-bg);
        position: relative;
        box-shadow: 1px 2px 3px var(--shadow);
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    .icon{
        width: 30px;
        height: 30px;
        fill: var(--icon-color);
    }
    .content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        background-color: var(--card-bg);
        padding: 10px;
        border-radius: 6px;
        height: 100%;
    }
    .title{
        text-transform: uppercase;
        font-size: 25px;
        font-weight: 700;
        color: var(--card-header-color);
    }
    .text{
        font-size: 15px;
        font-weight: 400;
        color: var(--card-text-color);
    }
    // mobile
    @media(max-width:900px){
        .card{
            width: calc(100% / 2 - 20px);
        }
    }
    @media(max-width:700px){
        .card{
            width: 100%;
        }
    }
</style>