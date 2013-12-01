var controller = {
  success: function() {
    /*  Load setup template */
    template.load('eventChooser');
  },
  failure : function() {
    var errmsgDiv = document.querySelector("#errmsg");
    if(errmsgDiv.classList.contains('hide')) {
      errmsgDiv.classList.toggle('hide');
    }
    errmsgDiv.innerHTML = "Wrong login credential<br>this is your: " + user.attempts + " attempt";
  }
};