<script>
    import logo2023 from '$lib/assets/images/IdeaHacks 2023 Logo.png'
</script>

<body> 
    <div class="rect">
        
        <div class="title">
            <h1>2023</h1>
        </div>
        <div class="text">
            <body>Sponsors</body>
        </div>
    </div>
    <img class="img" alt = "test" src = {logo2023}/>
</body>

<style lang="postcss">
    .title{
        position:relative;
        width: 824px;
        height: 86px;
        top: 44px;
        left: 120px; 
        
        font-family: Bogimber;
        font-size: 48px;
        font-weight: 400;
        line-height: 60px;
        letter-spacing: 0em;
        text-align: center;
        color: rgba(255, 255, 255, 1);
    }

    .rect{
        position:relative;
        width: 1130px;
        height: 1134px;
        top: 0px;
        left: 180px;

        border: 1px; 

        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(247.52deg, rgba(255, 0, 0, 0.17) 1.52%, rgba(255, 255, 255, 0) 96.99%), linear-gradient(247.76deg, #FFFFFF 1.72%, #FF5656 99.27%);
        border: 1px solid;
        border-image-source: linear-gradient(247.76deg, #FFFFFF 1.72%, #FF5656 99.27%);

        box-shadow: 2px 2px 100px 0px rgba(66, 66, 66, 0.1) inset;
        box-shadow: -2px -2px 100px 0px rgba(255, 255, 255, 0.1) inset;
    }

    .text{
        position: relative;
        width: 570px;
        height: 488px;
        top: 150px;
        left: 525px;

        font-family: Open Sans;
        font-size: 28px;
        font-weight: 400;
        line-height: 40px;
        letter-spacing: 0em;
        text-align: left;
        color: rgba(255, 255, 255, 1);
    }

    .img{
        position: relative;
        top: -750px;
        left: 225px;
        width: 372px;
        height: 332px;
    }

    :global(html){
        background: linear-gradient(180deg, #240202 0%, #70130B 18.75%, #A53018 44.27%, #D97E2E 71.35%, #F6C042 95.83%);
        width: 640px;
        height: 4714px;
    }

</style>