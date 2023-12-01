<!-- <script>
    import historyImg from '$lib/assets/images/history1.png'
</script>

<body>

    <div class="grid-container">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>  
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>  
      <div class="grid-item">7</div>
      <div class="grid-item">8</div>
      <div class="grid-item">9</div>  
    </div>
    
</body>

<style lang="postcss">
    .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    //background-color: #2196F3;
    padding: 10px;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(247.52deg, rgba(255, 0, 0, 0.17) 1.52%, rgba(255, 255, 255, 0) 96.99%), linear-gradient(247.76deg, #FFFFFF 1.72%, #FF5656 99.27%);
    border: 1px solid;
    border-image-source: linear-gradient(247.76deg, #FFFFFF 1.72%, #FF5656 99.27%);

    box-shadow: 2px 2px 100px 0px rgba(66, 66, 66, 0.1) inset;
    box-shadow: -2px -2px 100px 0px rgba(255, 255, 255, 0.1) inset;
    }

    .grid-item {
    //background-color: rgba(255, 255, 255, 0.8);
    //border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    font-size: 30px;
    text-align: center;

    //background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(247.52deg, rgba(255, 0, 0, 0.17) 1.52%, rgba(255, 255, 255, 0) 96.99%), linear-gradient(247.76deg, #FFFFFF 1.72%, #FF5656 99.27%);
    border: 1px solid;
    border-image-source: linear-gradient(247.76deg, #FFFFFF 1.72%, #FF5656 99.27%);

    box-shadow: 2px 2px 100px 0px rgba(66, 66, 66, 0.1) inset;
    box-shadow: -2px -2px 100px 0px rgba(255, 255, 255, 0.1) inset;
    }

    :global(html){
        background: linear-gradient(180deg, #240202 0%, #70130B 18.75%, #A53018 44.27%, #D97E2E 71.35%, #F6C042 95.83%);
        width: 640px;
        height: 4714px;
    }
</style> -->

<script> 
    import historyImg from '$lib/assets/images/history1.png'
</script>

<body> 
    <title>History</title>
    
    <div class="rect">
        
        <div class="title">
            <h1>HISTORY</h1>
        </div>
        <div class="text">
            <body>IDEA Hacks was founded in 2014 by members of UCLA IEEE and Theta Tau Upsilon Delta. Ever since our first hackathon in January 2015, IDEA Hacks’ vision has been to provide engineering students with a space to learn, create, and inspire one another. As the first and largest hardware hackathon in California, we encourage interdisciplinary teams to build hands-on components as opposed to a software hackathon.Throughout the years we’ve increased the breadth of our event, and at our last hackathon over 200 hackers participated. Our goals are to benefit the engineering community and the community as a whole by promoting innovation in areas that matter. Featured projects include an GPS-based navigator, activity tracker, and many more!</body>
        </div>
    </div>
    <img class="img" alt = "test" src = {historyImg}/>
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
        top: 391px;
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
        width: 448px;
        height: 538px;
        top: -500px;
        left: 225px;
    }

    :global(html){
        background: linear-gradient(180deg, #240202 0%, #70130B 18.75%, #A53018 44.27%, #D97E2E 71.35%, #F6C042 95.83%);
        width: 640px;
        height: 4714px;
    }

</style>
