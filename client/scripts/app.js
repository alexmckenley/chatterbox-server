var latest = 0;
var url = 'https://api.parse.com/1/classes/chatterbox';
var roomFilter = false;
var room;
var roomList = [];
var friends = [];

var events = _.clone(Backbone.Events);

var Chat = Backbone.Model.extend({
  url: url
});

var Chats = Backbone.Collection.extend({
  model: Chat,
  send: function(message) {
    $.ajax({
      url: url,
      type: "POST",
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(){
        events.trigger("chat:send");
      },
      error: function(req, errType, errMsg){
        console.error("Error sending request: ", errMsg);
      }
    });
  },
  get: function() {
    $.get(url + "?order=-createdAt", function(response) {
      var messages = response.results;
      for (var i = messages.length -1; i >= 0 ; i--) {  
        var date = new Date(messages[i].createdAt);
        if (date > latest) {
          appendNode(messages[i]);
          if (!_.contains(roomList, messages[i].roomname)) {
            roomList.push(messages[i].roomname);
            $("#rooms").append("<option value='" + messages[i].roomname + "'>");
          }
          if (roomFilter && messages[i].roomname !== room) {
            node.hide();
          }
          if (i === 0) {
            latest = new Date(messages[i].createdAt);
          }
        }
      }
    });
  }
});


var ChatView = Backbone.View.extend({
  initialize: function() {
    var add = $.proxy(this.sendMessage,this);
    $('#chatForm').submit(add);

    this.collection.on("send", this.clearInput, this);

    $('.toggleRoom').click(function(e) {
      e.preventDefault();
      $(".enterRoom").toggle();
    });
    $("#roomForm").submit(selectRoom);
    $(".chats").on("click", ".username", function(e){
      e.preventDefault();
      var user = $(this).data("user");
      if (!_.contains(friends, user)) {
        friends.push(user);
        $(".friendList").append($("<li>" + user + "</li>"));
        updateFriends(user);
      }
    });
  },
  events: {

  },
  sendMessage: function(e) {
    e.preventDefault();
    var that = this;
    this.chats.send({
      username: getURLParameter('username'),
      text: $('.newMessage').val(),
      roomname: room
    });
  },
  clearInput: function() {
    $(".newMessage").val("");
  }
});

var ChatsView = Backbone.View.extend({
  initialize: function(options) {
  }

});


var appendNode = function(response) {
  var node = $("<div class='chat' data-room='" + response.roomname + "'></div>");
  var user = $("<a href='#' class='username' data-user='" + response.username + "'></a>").text(response.username + ":");
  var message = $("<span class='text'></span>").text(response.text);
  var time = $("<span class='createdAt'></span>").text(response.createdAt);
  var chatroom = $("<span class='roomname'></span>").text("(" + response.roomname + ")");
  node.append(user, message, time, chatroom);
  $(".chats").prepend(node);
};

var getURLParameter = function(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
  );
};


var selectRoom = function(e) {
  e.preventDefault();
  room = $("input[name='rooms']").val();

  if (room === null || room === "") {
    room = undefined;
    roomFilter = false;
    $(".chat").show();
    return;
  }
  roomFilter = true;

  $.each($(".chat"),function(index, value) {
    var currRoom = $(value).data("room");

    if (currRoom === undefined || room !== currRoom) {
      $(value).hide();
    } else {
      $(value).show();
    }
  });

};

var updateFriends = function(name) {
  $("a[data-user='" + name + "']").parent().find(".text").css("font-weight", "bold");
};

$(document).ready(function() {

  var chats = new Chats();
  chats.get();
  setInterval(chats.get.bind(chats), 1000);
  new ChatView({chats: chats});
  new ChatsView({el: $(".chats"), collection: chats});
});
