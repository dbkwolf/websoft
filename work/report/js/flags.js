

var canvas = document.getElementById('flag-canvas');
var germanyLink = document.getElementById('germany-link');
var swedenLink = document.getElementById('sweden-link');
var colombiaLink = document.getElementById('colombia-link');

germanyLink.addEventListener("click", function(){
  var line1 = canvas.getContext('2d');
    var line2 = canvas.getContext('2d');
      var line3 = canvas.getContext('2d');
   line1.fillStyle ="#000000";
   line1.fillRect(0,0,canvas.width,canvas.height/3);
   line2.fillStyle ="#DA291C";
   line2.fillRect(0,canvas.height/3,canvas.width,canvas.height/3);
   line3.fillStyle ="#FFCD00";
   line3.fillRect(0,2*canvas.height/3,canvas.width,canvas.height/3);

});

swedenLink.addEventListener("click", function(){
  var background = canvas.getContext('2d');
    var line1 = canvas.getContext('2d');
      var line2 = canvas.getContext('2d');
   background.fillStyle ="#004B87";
   background.fillRect(0,0,canvas.width,canvas.height);
   line1.fillStyle ="#FFCD00";
   line1.fillRect(canvas.height/2,0,canvas.width/10,canvas.height);
   line2.fillStyle ="#FFCD00";
   line2.fillRect(0,canvas.width/4,canvas.width,canvas.height/6);

});

colombiaLink.addEventListener("click", function(){
  var line1 = canvas.getContext('2d');
    var line2 = canvas.getContext('2d');
      var line3 = canvas.getContext('2d');
   line1.fillStyle ="#FFCD00";
   line1.fillRect(0,0,canvas.width,canvas.height/2);
   line2.fillStyle ="#003087";
   line2.fillRect(0,canvas.height/2,canvas.width,canvas.height/4);
   line3.fillStyle ="#C8102E";
   line3.fillRect(0,(3*canvas.height/4),canvas.width,canvas.height/4);

});

function suchDynamics(){
  canvas.classList.toggle("growing");
  setTimeout(function () {
    canvas.classList.toggle("m-fadeOut");
  }, 500);

}
