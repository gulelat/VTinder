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
  
  // This is the transient application state, not persisted on Parse
  var AppState = Parse.Object.extend("AppState", {
    defaults: {
      filter: "all"
    }
  });


  var LogInView = Parse.View.extend({
    events: {
      "submit form.login-form": "logIn",
      "click #register": "registerView"
    },

    el: "#main",
    
    initialize: function() {
      _.bindAll(this, "logIn", "registerView");
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

    registerView: function() {
      new RegisterView();
      this.undelegateEvents();
      delete this;
    },

    render: function() {
      this.$el.html(_.template($("#login-template").html()));
      this.delegateEvents();
    }
  });

  var RegisterView = Parse.View.extend({
    events: {
      "click #r": "signUp",
      "click #login": "loginView"
    },

    el: "#main",
    
    initialize: function() {
      _.bindAll(this, "loginView", "signUp");
      this.render();
    },

    signUp: function(e) {
      alert("hey");
      //var self = this;
      //var username = this.$("#email").val();
      //var password = this.$("#password").val();

      var user = new Parse.User();
      user.set("username", this.$("#email").val());
      user.set("password", this.$("#password").val());
      //user.set("email", "email@example.com");

      //var password_check = this.$("#password_check").val();

          user.signUp(null, {
            success: function(user) {
              alert("hey311");
              self.undelegateEvents();
              delete self;
            },

            error: function(user, error, e) {
              alert("hey2222");
              self.$(".signup-form .alert").html(error.message).show();
              this.$(".signup-form button").removeAttr("disabled");
            }
          });

      this.$(".signup-form button").attr("disabled", "disabled");

      return false;
    },

    loginView: function(e) {
      new LogInView();
      this.undelegateEvents();
      delete this;
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
        alert("hey");
        Parse.User.logOut();
        new LogInView();
        this.undelegateEvents();
        delete this;
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