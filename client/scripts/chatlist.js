var ChatList = Backbone.Collection.extend({
  model: Chat,
  url: 'http://localhost:8080/classes/messages',
  parse: function(response) {
    return response.results;
  },
  initialize: function() {
    this.on("remove", this.deleteModel);
    this.room;
    this.friends = [];
  },
  deleteModel: function(model) {
    model.trigger("removeView");
  }
});

