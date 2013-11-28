var controller = null;
var template = (function() {
  var _cache = [];
  /*
    Change template on hash change
  */
  return {
    /*
      Get template, and do something with it (callback)
    */
    get : function(name, callback) { //have _cache layer
      if(typeof _cache[name] === 'undefined') {
        $.get('views/' + name + '.html', function(data) {
          _cache[name] = data;
          callback(data);
        }, 'html');
      } else {
        callback(_cache[name]);
      }
    },
    /*
      Force the loading of the specified template
    */
    goto : function(name) {
      window.location.hash = "#" + name;
      controller = null; //Destruct past controller
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
    hold : false,
    bind : function(that) {
      $(that).bind('touchend click', function() {
        /*
          after a few ms after a touchend, a click event is triggered
          we only want to run this code for either a touchend or a click
          not both. Code places a 'hold' on the bind funciton for 100ms.
        */
        if(!template.hold) {
          template.hold = true;
          setTimeout(function() { template.hold = false; }, 100);

          var hash = this.getAttribute('href');
          window.location.hash = hash;
          template.goto(hash.replace('#',''));
        }
      });
    }
  };
})();