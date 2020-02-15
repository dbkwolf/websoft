var kangaroo = document.getElementById('kangaroo');

var myKangaroo = {
  type: 'Marsupial', // Default value of properties
  posx: 100, //not sure how to bind these to the position of the kangaroo img
  posy: 100,
  displayType: function() { // Method which will display type of Animal
    console.log(this.type);
  },
  jump: function() {

    var divsize = 50;
    var posx = (Math.random() * window.innerWidth - divsize).toFixed();
    var posy = (Math.random() * window.innerHeight - divsize).toFixed();
    kangaroo.style.left = posx + "px";
    kangaroo.style.top = posy + "px";

    var shout = document.getElementById('shout');
    var shoutOffsetX = parseInt(posx) + 64;
    var shoutOffsetY = parseInt(posy) - 32
    shout.style.left = shoutOffsetX + 'px';
    shout.style.top = shoutOffsetY + 'px';

    var fart = document.getElementById('fart');
    var fartOffsetX = parseInt(posx) - 5;
    var fartOffsetY = parseInt(posy) + 20;
    fart.style.left = fartOffsetX + 'px';
    fart.style.top = fartOffsetY + 'px';
  },

  fart: function() {
    document.getElementById('fart').style.visibility = "visible";
    setTimeout(function() {
      document.getElementById('fart').style.visibility = "hidden";
    }, 3000);
    var fartSound = new sound('media/0241.mp3');
    fartSound.play();
  }
}


window.clickOnKangaroo = function() {
  myKangaroo.jump();
}

function onTimerElapsed() {
  var kangarooing = document.getElementById('kangarooing');
  if (kangarooing != null) {
    kangarooing.style.display = kangarooing.style.display === 'none' ? 'block' : 'none';
  }

}

function startleKangaroo() {
  myKangaroo.fart();
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
  }
}