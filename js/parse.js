// An example Parse.js Backbone application based on the todo app by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses Parse to persist
// the todo items and provide user authentication and sessions.

$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
 Parse.initialize("MbNHyjpV8RSUfE2xfweYwKpeQAuyBDXXyYy22AKU", "HM1NPfqkGE59wPPGvuK1BRKLHCKsX3cEMP2AdqgD");

  // An example Parse.js Backbone application based on the todo app by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses Parse to persist
// the todo items and provide user authentication and sessions.

  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var Todo = Parse.Object.extend("Todo", {
    // Default attributes for the todo.
    defaults: {
      content: "empty todo...",
      done: false
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  // This is the transient application state, not persisted on Parse
  var AppState = Parse.Object.extend("AppState", {
    defaults: {
      filter: "all"
    }
  });

  // Todo Collection
  // ---------------

  
  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  
  // The Application
  // ---------------

  // The main view that lets a user manage their todo items
  
  var LogInView = Parse.View.extend({
    events: {
      "submit form.login-form": "logIn",
      "onClick #register": "RegisterView"
    },

    el: "#main",
    
    initialize: function() {
      _.bindAll(this, "logIn", "RegisterView");
      this.render();
    },

    logIn: function(e) {
      var self = this;
      var username = this.$("#email").val();
      var password = this.$("#password").val();
      
      Parse.User.logIn(username, password, {
        success: function(user) {
          new ManageTodosView();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".login-form .alert").html("Invalid username or password. Please try again.").show();
          this.$(".login-form button").removeAttr("disabled");
        }
      });

      this.$(".login-form button").attr("disabled", "disabled");

      return false;
    },

    render: function() {
      this.$el.html(_.template($("#login-template").html()));
      this.delegateEvents();
    }
  });
  var RegisterView = Parse.View.extend({
    events: {
      "submit #register-form": "signUp",
    },

    el: "#main",
    
    initialize: function() {
      _.bindAll(this, "signUp", "RegisterView");
      this.render();
    },

    signUp: function(e) {
      var self = this;
      var username = this.$("#email").val();
      var password = this.$("#password").val();
      var password_check = this.$("#password_check").val();

      if(password == password_check){
          Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
            success: function(user) {
              new ManageTodosView();
              self.undelegateEvents();
              delete self;
            },

            error: function(user, error) {
              self.$(".signup-form .error").html(error.message).show();
              this.$(".signup-form button").removeAttr("disabled");
            }
          });
        }

      this.$(".signup-form button").attr("disabled", "disabled");

      return false;
    },

    render: function() {
      this.$el.html(_.template($("#register-template").html()));
      this.delegateEvents();
    }
  });
  
  // The main view for the app
  var AppView = Parse.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#app"),

    initialize: function() {
      this.render();
    },

    render: function() {
      if (Parse.User.current()) {
        new ManageTodosView();
      } else {
        new LogInView();
      }
    }
  });

  var AppRouter = Parse.Router.extend({
    routes: {
      "all": "all",
      "active": "active",
      "completed": "completed"
    },

    initialize: function(options) {
    },

    all: function() {
      state.set({ filter: "all" });
    },

    active: function() {
      state.set({ filter: "active" });
    },

    completed: function() {
      state.set({ filter: "completed" });
    }
  });

  var state = new AppState;

  new AppRouter;
  new AppView;
  Parse.history.start();
});
