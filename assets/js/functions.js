/*jshint esversion: 6 */
var button = document.getElementById("boom");
var pre = document.getElementById("pre");
var countdown = document.getElementById("countdown");
var help = document.getElementById("help");
var secondsElem = document.getElementById("seconds");
var dis = document.getElementById("dis");
var iframe = document.getElementById("iframe");
var body = document.getElementById("body");
var beep = document.getElementById("audio");
var explosion = document.getElementById("explosionaudio");
var explosionScreen = document.getElementById("explosion");

countdown.style.display = "none";
explosionScreen.style.display = "none";
dis.style.display = "none";

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

//var timeObject = new Date();
//       var dateThen = new Date(timeObject.getTime() + 60000);
//
//       function update() {
//         var dateNow = Date.now();
//         var dif = dateThen - dateNow;
//         var seconds = Math.round(dif/1000);
//         if(seconds < 0) {
//           seconds = 0;
//         }
//
//         console.log(seconds);
//         secondsElem.innerHTML = ""+seconds;
//       }

var hide = function(elem) {
  elem.style.display = "none";
};

var handle = function() {
  countdown.style.display = "flex";
  hide(pre);
  var time = new Date();
  var toDate = new Date(time.getTime() + 120000);
  var interval;

  var update = function() {
    var currDate = Date.now();
    var dif = toDate - currDate;
    var seconds = (dif/1000).toFixed(2);

    if(seconds < 0) {
      seconds = 0;
    }

    if(Math.round(seconds) % 3 === 0) {
      if(Math.round(seconds) !== 0) {
        beep.volume = 1/seconds;
        beep.play();
      }
      if(seconds === 0) {
        clearInterval(interval);
        explosion.volume = 1;
        explosion.play();
        countdown.style.display = "none";
        explosionScreen.style.display = "block";
      }
    }

    secondsElem.innerHTML = ""+seconds;
  };

  interval = setInterval(function(){
    update();
  }, 10);
};

button.onclick = function(e){
  countdown.style.display = "none";
  launchIntoFullscreen(document.documentElement);
  setTimeout(function(){handle();}, 20000);
};
