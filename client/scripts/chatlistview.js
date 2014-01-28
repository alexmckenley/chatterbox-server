var ChatListView = Backbone.View.extend({
  initialize: function() {
    this.collection.on("reset", this.render, this);
    this.collection.on("add", this.render, this);

    var that = this;
    setInterval(function() {
      that.collection.fetch();
    }, 3000);
  },
  events: {
  },
  render: function () {
    var chats = this.collection.map(function (chat) {
      var chatView = new ChatView({model: chat});
        if (this.collection.room === undefined || chat.get("roomname") === this.collection.room) {
          return chatView.render();
        }
    }, this);

    this.$el.html("");
    this.$el.append(chats);
  }
  // addOne: function (chat, collection) {
  //   console.log("Added to collection");
  // }
});

$(document).ready(function() {
  chatList = new ChatList();
  var chatListView = new ChatListView({el: $(".chats"), collection: chatList});
  chatList.fetch({reset: true});
  var newChatView = new NewChatView({el: $(".post"), collection: chatList});
  var newRoomFormView = new RoomFormView({el: $(".roomContainer"), collection: chatList});
});