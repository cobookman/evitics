
var template = (function() {
  var cache = [];
  /*
    Change template on hash change
  */
  

  return {
    /*
      Get template, and do something with it (callback) - TODO BUg where this is called 2x
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
      template.closeMenu();
      if(window.location.hash === "#" + name) {
        template.load(name); //force refresh
      } else {
        window.location.hash = "#" + name;
      }
    },
    /* Location to load template */
    load : function(name) {
      template.get(name, function(data) {
        $("#content").html(data);
      });
    },
    site : document.getElementById('site'),
    closeMenu : function() {
      var cl = template.site.classList;
      if (cl.contains('open')) {
        cl.remove('open');
      }
    }
  };
})();