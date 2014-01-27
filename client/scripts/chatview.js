var ChatView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "removeView", this.remove, this);
  },
  events: {
    "click .username": "addFriend"
  },
  template: _.template(
  "<div class ='chat' data-room='<%- roomname %>'>" +
    "<a href='#' class='username' data-user='<%- username %>'><%- username %>: </a>" +
    "<span class='text <% if (isFriend) { %> <%= 'friend' %> <% } %>'><%- text %></span>" +
    "<span class='createdAt'><%= createdAt %></span>" +
    "<span class='roomname'>(<%- roomname %>)</span>" +
  "</div> "),
  render: function() {
    this.$el.append(this.template(this.model.attributes));
    return this.$el;
  },
  addFriend: function(e) {
    e.preventDefault();
    var user = this.model.get("username");
    if (!_.contains(this.model.collection.friends, user)) {
      this.model.collection.friends.push(user);
      $(".friendList").append($("<li>" + user + "</li>"));
    }
    // $("a[data-user='" + user + "']").parent().find(".text").css("font-weight", "bold");
  }
});

