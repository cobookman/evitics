var user = {
  attempts : 0,
  username : undefined,
  login : function(successCallback, failCallback) {
    var credentials = {
      username : document.getElementById("username").value,
      password : document.getElementById("password").value
    };
    if(this.loginUser(credentials)) {
      this.username = credentials.username;
      this.attempts = 0;
      this.change2logout();
      successCallback();
    } else {
      ++this.attempts;
      failCallback();
    }
  },
  loginUser : function(credentials) {
    if(credentials.username == "test" && credentials.password == "test") {
      return true;
    } else {
      return false;
    }
  },
  /*  Convert the 'login' button to a 'logout' button*/
  change2logout : function() {
    var loginButtons = document.querySelectorAll('a[href="#login"]');
    for(var i = 0; i < loginButtons.length; ++i) {
      loginButtons[i].setAttribute("href", "#logout");
      loginButtons[i].innerHTML = "Logout";
    }
  },
  logout : function() {
    this.username = undefined;
    this.change2login();
    template.goto('login');
  },
  /*  Convert the 'logout' button to a 'login' button*/
  change2login : function() {
    var logoutButtons = document.querySelectorAll('a[href="#logout"]');
    for(var i = 0; i < logoutButtons.length; ++i) {
      logoutButtons[i].setAttribute("href", "#login");
      logoutButtons[i].innerHTML = "Login";
    }
  },
  isLoggedIn : function() {
    if(typeof this.username !== "undefined" &&
       this.username.length > 1 &&
       this.username !== null) {
      return false;
    } else {
      return true;
    }
  }
};

