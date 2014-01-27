$(document).ready(function() {

  //set up global variables
  // var username = prompt("What's your name?");
  var latest = 0;
  
  //set up the initial layout
  $("body").prepend("<h1>Chatterbox</h1>");
  $("body").append("<a href='#'>Add a chat</a>")
           .append("<div class='post'></div>");
  $(".post").append("<input type='text' size='50'></input><button>Post</button>");
  $("body").append("<div id='main'></div>");

  $();


  var appendChat = function(val) {
    var node = $("<div class='chat'></div>");
    var template = function () { return $("<p></p>"); };
    var user = template().attr("class", "username").text(decodeURIComponent(val.username));
    var message =  template().attr("class", "message").text(decodeURIComponent(val.text));
    var time = template().text(val.createdAt);
    node.append(user,message,time);
    $("#main").prepend(node);
  };


  var initialChats = function() {
   $.get("https://api.parse.com/1/classes/chatterbox", function(response) {
      var newest = response.results.length;
      var start = newest - 10;

      for (var i = start; i < newest; i++) {
        appendChat(response.results[i]);
        if (i === newest-1) {
          latest = response.results[i].createdAt;
        }
      }
    });

  };

  var getChats = function() {
    $.get("https://api.parse.com/1/classes/chatterbox", function(response) {
      var newest = response.results.length;
      var start = newest - 10;

      for (var i = start; i < newest; i++) {
        var val = response.results[i];
        if (val.createdAt > latest) {
          appendChat(val);
          console.log("new!");
        }
      }
    });
  };

  var postChat = function() {

  }

  initialChats();
  setInterval(getChats,1000);

});

