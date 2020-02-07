window.kangarooJump = function() {

    var numRand = Math.floor(Math.random() * 501);
    var divsize = 50;
    var posx = (Math.random() * window.innerWidth - divsize).toFixed();
    var posy = (Math.random() * window.innerHeight - divsize).toFixed();
    var kangaroo = document.getElementById('kangaroo');
    kangaroo.style.left = posx + "px";
    kangaroo.style.top = posy + "px";

    var shout = document.getElementById('shout');
    var aux = parseInt(posx) + 64;
    var auxy = parseInt(posy) - 32
    shout.style.left = aux+'px' ;
    shout.style.top = auxy +'px';

    var shout = document.getElementById('fart');
    var aux = parseInt(posx) -5;
    var auxy = parseInt(posy) + 20;
    shout.style.left = aux+'px' ;
    shout.style.top = auxy +'px';

}

function onTimerElapsed() {
   var kangarooing = document.getElementById('kangarooing');
   kangarooing.style.display = kangarooing.style.display === 'none' ? 'block' : 'none';
}

function fart(){
  document.getElementById('fart').style.visibility = "visible";
   setTimeout(function(){ document.getElementById('fart').style.visibility = "hidden"; }, 3000);
   var fartSound = new sound('media/0241.mp3');
   fartSound.play();
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
