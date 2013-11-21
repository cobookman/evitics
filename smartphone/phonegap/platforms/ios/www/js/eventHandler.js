/*
    Mobile Side Menu
*/
window.onload = function(){
  if(typeof user.username === 'undefined') {
    template.goto('login');
  }
  var slideMenuButton = document.getElementById('slide-menu-button');
  slideMenuButton.onclick = function(e) {
    var site = document.getElementById('site');
    var cl = site.classList;
    if (cl.contains('open')) {
      cl.remove('open');
    } else {
      cl.add('open');
    }
  };
  /*
      Close menu on the clicking of item
  */
  $("#sideNav > *").click(function(ev) { template.closeMenu(); });
};

window.onhashchange = function(ev) {
  if(typeof user.username === 'undefined' && window.location.hash !== "#login") {
    window.location.hash = "#login";
    return;
  }
  var hash = window.location.hash.replace("#", '');
  template.load(hash);
};

