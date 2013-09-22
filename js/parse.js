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

  var MainView = Parse.View.extend({
    events: {
      "click #logout": "logOut",
    },

    el: "#main",

    initialize: function() {
      _.bindAll(this, "logOut");
      this.render();
    },

    logOut: function() {
      alert("hey");
      Parse.User.logOut();
      new LogInView();
      self.undelegateEvents();
      delete self;
    },

    render: function() {
      $("#nav").html(_.template($("#nav-template").html()));
      this.$el.html(_.template($("#main-template").html()));
      $("#footer").html(_.template($("#logout-template").html()));
      this.delegateEvents();
    }

  });
  
  var LogInView = Parse.View.extend({
    events: {
      "click #l": "logIn",
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
          new MainView();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".alert").html("Invalid username or password. Please try again.").show();
          // this.$(".login-form button").removeAttr("disabled");
        }
      });

      // this.$(".login-form button").attr("disabled", "disabled");

      return false;
    },

    registerView: function(e) {
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
      //var self = this;
      var username = this.$("#email").val();
      var password = this.$("#password").val();
      var password_check = this.$("#password_check").val();

      var user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
     

      if(username == ""){
        self.$(".alert").html("Email can not be blank.").show();
        // this.$("#register-form button").removeAttr("disabled");
      } else if(password == "") {
        self.$(".alert").html("You must enter a Password.").show();
        // this.$("#register-form button").removeAttr("disabled");
      } else if(password != password_check){
        self.$(".alert").html("Your passwords do not match.").show();
        // this.$("#register-form button").removeAttr("disabled");
      } else {
        user.signUp(null, {
            success: function(user) {
              new MainView();
              self.undelegateEvents();
              delete self;
            },

            error: function(user, error) {
              self.$(".alert").html(error.message).show();
              this.$("#register-form button").removeAttr("disabled");
            }
          });
      }
      // this.$("#register-form button").attr("disabled", "disabled");

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
        new MainView();
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
