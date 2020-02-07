window.kangarooJump = function() {
    var numRand = Math.floor(Math.random() * 501);
    var divsize = 50;
    var posx = (Math.random() * window.innerWidth - divsize).toFixed();
    var posy = (Math.random() * window.innerHeight - divsize).toFixed();
    var div = document.getElementById('kangaroo');
    div.style.left = posx + "px";
    div.style.top = posy + "px";
}
