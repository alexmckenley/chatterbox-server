var RoomFormView = Backbone.View.extend({
  events: {
    "click .toggleRoom": "showForm",
    "submit #roomForm": "filterRoom"
  },
  filterRoom: function (e) {
    e.preventDefault();
    var currRoom = $("input[name='rooms']").val();
    this.collection.room = (currRoom) ? currRoom : undefined;
    this.collection.fetch();
  },
  showForm: function(e) {
    e.preventDefault();
     $(".enterRoom").toggle();
  }

});