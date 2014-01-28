var ChatList = Backbone.Collection.extend({
  model: Chat,
  url: 'http://localhost:8080/classes/messages',
  initialize: function() {
    this.on("remove", this.deleteModel);
    this.room;
    this.friends = [];
  },
  comparator: function (a, b){
    var a = new Date(a.get('createdAt'));
    var b = new Date(b.get('createdAt'));
    return b - a;
  },
  deleteModel: function(model) {
    model.trigger("removeView");
  }
});

