const general=document.getElementById("ge")
const sport=document.getElementById("sp")
const politics=document.getElementById("po")
const tech=document.getElementById("te")
const serch=document.getElementById("ser")
const text=document.getElementById("txt")

const type=document.getElementById("newstype")
const details=document.getElementById("newsdetails")

const newsarrr=[]

const API_KEY="709bfbcb27434eea99b854e88501de62";
const HEADLINES_NEWS ="https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const general_NEWS="https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey="
const SPORTS_NEWS ="https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey="
const politics_NEWS= "https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey="
 const TECHNOLOGY_NEWS= "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
const SEARCH_NEWS ="https://newsapi.org/v2/everything?q=";



general.addEventListener("click",function(){
    getGeneral();
})
sport.addEventListener("click",function(){
    getsport();
})
politics.addEventListener("click",function(){
    getpolitics();
})
tech.addEventListener("click",function(){
    gettech();
})
serch.addEventListener("click",function(){
    getserch();
})

const getGeneral=async()=>{
    const res=await fetch(general_NEWS+API_KEY);
    newsar=[]
    if(res.status>=200&&res.status<300){
        const json=await res.json();
        newsar=json.articles
        console.log(json)
    }
    else{
        console.log(res.status,res.statusText)
    }
    displaynews();
}

const getsport=async()=>{
    const res=await fetch(SPORTS_NEWS+API_KEY);
    newsar=[]
    if(res.status>=200&&res.status<300){
        const json=await res.json();
        newsar=json.articles
    }
    displaynews();
}

const getpolitics=async()=>{
    const res=await fetch(politics_NEWS+API_KEY);
    newsar=[]
    if(res.status>=200&&res.status<300){
        const json=await res.json();
        newsar=json.articles
    }
    displaynews();
}

const gettech=async()=>{
    const res=await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsar=[]
    if(res.status>=200&&res.status<300){
        const json=await res.json();
        newsar=json.articles
    }
    displaynews();
}

const getserch=async()=>{
    if(text.value==null){
        return;
    }
    const res=await fetch(SEARCH_NEWS+encodeURIComponent(text.value)+"&apiKey="+API_KEY);
    newsar=[]
    if(res.status>=200&&res.status<300){
        const json=await res.json();
        newsar=json.articles
    }
    displaynews();
}

function displaynews(){
    details.innerHTML=""
    if(newsar.length==0){
        details.innerHTML="<h5>no data</h5>"
        return;
    }
    newsar.forEach(news => {
        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}