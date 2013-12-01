/*
    Mobile Side Menu
*/
window.onload = function(){
  if(typeof user.username === 'undefined') {
    template.goto('login');
  }
};