var ChatList = Backbone.Collection.extend({
  model: Chat,
  url: "https://api.parse.com/1/classes/chatterbox?order=-createdAt",
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

