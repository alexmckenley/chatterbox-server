var NewChatView = Backbone.View.extend({
  events: {
    "submit #chatForm": "postMessage"
  },
  getURLParameter: function(name) {
    return decodeURI(
      (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
  },
  postMessage: function(event) {
    event.preventDefault();
    var that = this;
    var chat = new Chat();
    chat.save({
      "username": this.getURLParameter('username'),
      "text": $(".newMessage").val(),
      "roomname": that.collection.room
    }, {success: function(resp) {
      that.clearInput();
      that.collection.add(chat);
    }});
  },
  clearInput: function() {
    $(".newMessage").val("");
  }

});