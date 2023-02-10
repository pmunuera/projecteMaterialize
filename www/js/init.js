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
  $('#articleList').children().remove();
  $('.row').children().remove();
  $.ajax({
    method: "GET",
    url: "https://api.spaceflightnewsapi.net/v3/articles?_limit=3",
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
    for(let item in msg) {
      var title = msg[item].title;
      var elem = $("<li class='collection-item'><div id='"+msg[item].id+"'>"+title+"<a id='sendTo2' href='#!' class='secondary-content'><i class='material-icons'>send</i></a></div></li>");
      var elem2= $("<div class='col s12 m4'>"+ 
      "<div class='icon-block'>"
        +"<h2 class='center'><img align='center' src="+msg[item].imageUrl+" height=100px width=100px></h2>"
        +"<h5 class='center'>"+msg[item].title+"</h5>"
        +"<h6 class='center'>From: "+msg[item].newsSite+"</h6>"

        +"<p class='light'>"+msg[item].summary+"</p>"
      +"</div></div>");
      $('.row').append(elem2);
      $('#sendTo2',elem).click(loadInformation);
      $('#articleList').append(elem);
    };
  }).fail(function () {
    alert("ERROR");
  });
}
function loadInformation(e){
  //var instance = M.Tabs.getInstance('#test-swipe-2');
  //instance.select('test-swipe-2');
  //$('#test-swipe-2').select();
  $('.tabs').tabs('select', 'test-swipe-2');
  $('#test-swipe-2').children().remove();
  var idArticle=$(e.target).parent().parent().attr("id");
  $.ajax({
    method: "GET",
    url: "https://api.spaceflightnewsapi.net/v3/articles/"+idArticle,
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
    for(let item in msg) {
        var element = msg[item];
        if(item=="imageUrl"){
          $('#test-swipe-2').append("<img src='"+element+"'>");
        }
        else if(item=="id"){
          $('#test-swipe-2').append("<p style='text-align:center'>ID: "+element+"</p>");
        }
        else if(item=="url"){
          $('#test-swipe-2').append("<a href='"+element+"' targer='_blank'>"+element+"</a>");
        }
        else if(item=="title"){
          $('#test-swipe-2').append("<h1 style='text-align:center'>"+element+"</h1>");
        }
        else if(item=="newsSite"){
          $('#test-swipe-2').append("<p style='text-align:center'>From: "+element+"</p>");
        }
        else if(item=="summary"){
          $('#test-swipe-2').append("<h2 style='text-align:center'>Summary: "+element+"</h2>");
        }
        else{
          $('#test-swipe-2').append("<p>"+element+"</p>");
        }
    };
  }
  ).fail(function () {
    alert("ERROR");
  });
}
