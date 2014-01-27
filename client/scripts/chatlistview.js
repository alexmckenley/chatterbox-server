var ChatListView = Backbone.View.extend({
  initialize: function() {
    this.collection.on("reset", this.render, this);
    this.collection.on("add", this.addOne, this);

    var that = this;
    setInterval(function() {
      that.collection.fetch();
    }, 1000);
  },
  events: {
  },
  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (chat, collection) {
    var chatView = new ChatView({model: chat});
    if (this.collection.room === undefined || chat.get("roomname") === this.collection.room) {
      this.$el.append(chatView.render());
    }
  }
});

$(document).ready(function() {

  chatList = new ChatList();
  var chatListView = new ChatListView({el: $(".chats"), collection: chatList});
  chatList.fetch({reset: true});
  var newChatView = new NewChatView({el: $(".post"), collection: chatList});
  var newRoomFormView = new RoomFormView({el: $(".roomContainer"), collection: chatList});
});