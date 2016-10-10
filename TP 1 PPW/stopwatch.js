var timer = function() {
    
    var start = 0;
    var savedTime = 0;
    var timerOn = false;
    var saveTimer = false;
    var saveCounter = 0;
    var now = function() {
        var date = new Date();
        return (date).getTime(); 
    }; 

    this.start = function() {
        start = start ? start : now();
        timerOn = true;
        saveCounter=0;
    };

    this.stop = function() {
       timerOn = false;
       savedTime = start = 0;
    };

    this.save = function(){
        saveCounter +=1;
        if(timerOn && saveCounter==1){
            savedTime = savedTime + now()-start;
            start = 0;
        }
    }

    this.time = function() {
        return savedTime+(start?now()-start:0);
    };

    this.getSavedTime = function(){
        return savedTime;
    }
};

var myTimer = new timer();
var $time;
var clocktimer;

function digitTime(angka, digit) {
    var stringWaktu = "0000" + angka;
    return stringWaktu.substr(stringWaktu.length-digit);
}

function formatTime(time) {
    var h = m = s = ms = totalSec = 0;
    var newTime = '';
    totalSec = time/1000;
    ms = time%1000;
    m = Math.floor(totalSec/60);
    s = Math.floor(totalSec%60);
    newTime = digitTime(m, 2) + ':' + digitTime(s, 2) + ':' + digitTime(ms, 2);
    return newTime;
}

function showTime() {
    $time = document.getElementById('time');
    timeUpdate();
}

function timeUpdate() {
    $time.innerHTML = formatTime(myTimer.time());
}

function startTimer() {
    clocktimer = setInterval("timeUpdate()", 0.1);
    myTimer.start();
}

function stopTimer() {
    clearInterval(clocktimer);
    myTimer.stop();
    timeUpdate();
}

function pauseTimer(){
    myTimer.save();
    clearInterval(clocktimer);
    return myTimer.getSavedTime();
}

function savedToString(time){
    return formatTime(time);
}