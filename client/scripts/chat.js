var Chat = Backbone.Model.extend({
  url: 'http://localhost:8080/classes/messages',
  defaults: {
    roomname: "main"
  },
  parse: function(response) {
    if (response.text === undefined) {
      response.text = null;
    }
    if (response.username === undefined) {
      response.username = "anonymous";
    }
    if (response.roomname === undefined) {
      response.roomname = null;
    }
    if (_.contains(this.collection.friends, response.username)) {
      response.isFriend = true;
    } else {
      response.isFriend = false;
    }
    return response;
  }
});