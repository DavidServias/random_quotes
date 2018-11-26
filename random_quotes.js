//code snippet from facebook to enable sharing
window.fbAsyncInit = function() {
    FB.init({
      appId            : '294073091448541',//my ID 
      //https://developers.facebook.com/apps/294073091448541/dashboard/
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.2'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

//quote sources and array of quotes from each
const sources=[
  {title:"The Office", 
   isActive:true,
   image:"https://upload.wikimedia.org/wikipedia/en/thumb/8/80/The_office_US.jpg/300px-The_office_US.jpg",
   quoteArr:[ {quote:"That's what she said.", attr:"Michael Scott"},
              {quote:"Bears, beets, Battlestar Galacta.", attr: "Jim Halpert"},
              {quote:"I went to Cornell. Ever heard of it?", attr: "Andrew Bernard"}
            ]},
  
  {title:"Breakfast Club", 
   isActive:false,
   image:"https://cdn.theatlantic.com/assets/media/img/mt/2018/01/break/lead_720_405.jpg?mod=1533691920",
   quoteArr:[ {quote:"Eat my shorts.", attr: "John Bender"},
              {quote:"Could you describe the ruckus, sir?", attr: "Brian"},
              {quote:"Screws fall out all the time. The world is an imperfect place.", attr: "John Bender"}
            ]},
  
  {title:"Big Lebowski",
   isActive:false,
   image:"https://i.ytimg.com/vi/V0aDEvmf5u0/maxresdefault.jpg",
   quoteArr:[ {quote:"That rug really tied the room together.", attr:"Walter"},
              {quote:"Yeah, well, you know, that’s just, like, your opinion, man.", attr:"The Dude"},
              {quote: "F*ck it, Dude. Let’s go bowling.", attr:"Walter"},
              {quote: "This is not ‘Nam. This is bowling. There are rules.", attr:"Walter"},
              {quote: "This aggression will not stand, man.", attr:"The Dude"},
              {quote:"Careful man, there’s a beverage here!", attr:"The Dude"},
              {quote: "Forget it, Donny, you're out of your element!", attr:"Walter"},
              {quote:"For your information, the Supreme Court has roundly rejected prior restraint!", attr:"Walter"}
             
            ]},
  ];
      
new Vue({
  el:"#app",
  data: {
    sources: sources,
    currentQuote:"click \'New\' to get a quote.",
    attribution:""
  },
  methods: {
    toggleSources: function(thisSrc) {
      sources.forEach(function(source){
        source.isActive=false;
      });
      this.currentQuote="click \'New\' to get a quote.";
      this.attribution="";
      thisSrc.isActive=true;
      let imageVal="url("+ thisSrc.image+")";
      document.body.style.backgroundImage=imageVal;
    },
    newQuote:function() {
      //get active source
      let activeSrc;
      sources.forEach(function(source) {
        if(source.isActive===true){
          activeSrc=source;
        };
      });
      //choose random quote from active source
      let r;
      do {//if random quote is the same as current, choose a new quote
        r=Math.floor(Math.random()*activeSrc.quoteArr.length);   
      } while (this.currentQuote===activeSrc.quoteArr[r].quote);
      this.currentQuote=activeSrc.quoteArr[r].quote;
      this.attribution=activeSrc.quoteArr[r].attr;
    },
    share:function() {
      FB.ui({
        method: 'share',
        href: 'https://developers.facebook.com/docs/',
        quote: '"'+this.currentQuote+'"  --'+this.attribution
      }, function(response){});
    }
  }
});
