var user = {
  attempts : 0,
  username : undefined,
  login : function() {
    var credentials = {
      username : document.getElementById("username").value,
      password : document.getElementById("password").value
    };
    if(loginUser(credentials)) {
      isLoggedIn();
    } else {
      notLoggedIn();
    }
    return;

    /// HELPER FUNCTIONS ///
    function loginUser(credentials) {
      if(credentials.username == "test" && credentials.password == "test") {
        return true;
      } else {
        return false;
      }
    }

    function isLoggedIn() {
      user.attempts = 0;
      user.username = credentials.username;

      /*  Convert 'login' to 'logout' */
      var loginButtons = document.querySelectorAll('a[href="#login"]');
      for(var i = 0; i < loginButtons.length; ++i) {
        loginButtons[i].outerHTML = '<a href="#logout">Logout</a>';
      }

      /*  Load setup template */
      template.load('setup');
    }
    
    function notLoggedIn() {
      ++user.attempts;
      var errmsgDiv = document.querySelector("#content > article > form > div.errmsg");
      errmsgDiv.innerHTML = "Wrong login credential<br>this is your: " + user.attempts + " attempt";
    }
  },
  logout : function() {
    user.username = undefined;
    /* Change 'logout' to 'login' */
    var logoutButtons = document.querySelectorAll('a[href="#logout"]');
      for(var i = 0; i < logoutButtons.length; ++i) {
        logoutButtons[i].outerHTML = '<a href="#login">Login</a>';
    }
    /* Load Logout template */
    template.load('login');
  }
};

