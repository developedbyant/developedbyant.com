<div class="page-title">
    <hr class="line">
    <h2 class="title"><slot /></h2>
    <hr class="line">
</div>

<style lang="scss">
    .page-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    }
    .title{
        color: var(--header-color);
        font-size: 60px;
        font-weight: 900;
        text-align: center;
        position: relative;
        text-transform: uppercase;
    }
    .line{
        all: unset;
        flex: 1;
        height: 5px;
        background-color: var(--border-color);
        border-radius: 2px;
    }
    // mobile
    @media(max-width:700px){
        .title{
            font-size: 40px;
            font-weight: 500;
        }
    }
</style>