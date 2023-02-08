(function($){
  $(function(){
    $('.sidenav').sidenav();
    $('.tabs').tabs({"swipeable":true});
    
    $('#loadArticlesButton').click(load_articles);
  }); // end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
  
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}

function load_articles(){
  $.ajax({
    method: "GET",
    url: "https://api.spaceflightnewsapi.net/v3/articles?_limit=3",
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
    for(let item in msg) {
      var title = msg[item].title;
      var elem = $("<li class='collection-item'><div id='"+msg[item].id+"'>"+title+"<a id='sendTo2' href='#!' class='secondary-content'><i class='material-icons'>send</i></a></div></li>");
      $('#sendTo2',elem).click(loadInformation);
      $('#articleList').append(elem);
    };
  }).fail(function () {
    alert("ERROR");
  });
}
function loadInformation(e){
  var idArticle=$(e.target).parent().parent().attr("id");
  alert(idArticle);
  $.ajax({
    method: "GET",
    url: "https://api.spaceflightnewsapi.net/v3/articles/"+idArticle,
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
    for(let item in msg) {
        var title = msg[item].title;
        $('#test-swipe-2').append("<p>"+title+"</p>");
    };
  }
  ).fail(function () {
    alert("ERROR");
  });
}
