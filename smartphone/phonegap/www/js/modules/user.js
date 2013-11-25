var user = {
  attempts : 0,
  username : undefined,
  login : function(success, fail) {
    var credentials = {
      username : document.getElementById("username").value,
      password : document.getElementById("password").value
    };
    if(loginUser(credentials)) {
      user.username = credentials.username;
      user.attempts = 0;
      change2logout();
      success();
    } else {
      ++user.attempts;
      fail();
    }
    return;

    function loginUser(credentials) {
      if(credentials.username == "test" && credentials.password == "test") {
        return true;
      } else {
        return false;
      }
    }

    function change2logout() {
      /*  Convert 'login' to 'logout' */
      var loginButtons = document.querySelectorAll('a[href="#login"]');
      for(var i = 0; i < loginButtons.length; ++i) {
        loginButtons[i].setAttribute("href", "#logout");
        loginButtons[i].text = "Logout";
      }
    }
  },
  logout : function() {
    user.username = undefined;
    change2login();
    template.goto('login');

    function change2login() {
      /* Convert 'logout' to 'login' */
      var logoutButtons = document.querySelectorAll('a[href="#logout"]');
      for(var i = 0; i < logoutButtons.length; ++i) {
        logoutButtons[i].setAttribute("href", "#login");
        logoutButtons[i].text = "Login";
      }
    }
  },
  isLoggedIn : function() {
    if(typeof user.username !== "undefined" &&
       user.username.length > 1 &&
       user.username !== null) {
      return false;
    } else {
      return true;
    }
  }
};

