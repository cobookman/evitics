var temp;
var template = (function() {
  var cache = [];
  /*
    Change template on hash change
  */
  return {
    /*
      Get template, and do something with it (callback)
    */
    get : function(name, callback) { //have cache layer
      if(typeof cache[name] === 'undefined') {
        $.get('views/' + name + '.html', function(data) {
          cache[name] = data;
          callback(data);
        }, 'html');
      } else {
        callback(cache[name]);
      }
    },
    /*
      Force the loading of the specified template
    */
    goto : function(name) {
      window.location.hash = "#" + name;
      if(user.isLoggedIn()) {
        template.load('login');
      } else {
        template.load(name);
      }
    },
    /* Location to load template */
    load : function(name) {
      template.get(name, function(data) {
        $("#template-content").html(data);
        template.closeMenu();
      });
    },
    closeMenu: function() {
      $(".off-canvas-wrap").removeClass("move-right");
    },
    bind : function(that) {
      $(that).bind('touchend click', function() {
       // if(!template.flag) {
          template.flag = true;
          setTimeout(function() { template.flag = false; }, 100);

          var hash = this.getAttribute('href');
          window.location.hash = hash;
          template.goto(hash.replace('#',''));
       // }
      });
    },
    flag : false
  };
})();