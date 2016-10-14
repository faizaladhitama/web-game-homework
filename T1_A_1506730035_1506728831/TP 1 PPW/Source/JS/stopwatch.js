/*Sumber Kode:
https://gist.github.com/electricg/4372563
Copyright (c) 2010-2015 Giulia Alfonsi <electric.g@gmail.com>
Kode diambil sebagian dari website tersebut
*/
var timer = function() {
    
    var start = 0;
    var savedTime = 0;
    var timerOn = false;
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



/*Sumber Kode:
https://gist.github.com/electricg/4372563
Copyright (c) 2010-2015 Giulia Alfonsi <electric.g@gmail.com>
Kode diambil sebagian dari website tersebut
*/
var timer = new timer();
var $time;
var stopwatch;

var digitTime = function(angka, digit) {
    var stringWaktu = "00" + angka;
    return stringWaktu.substr(stringWaktu.length-digit);
}

var timeToString = function (time) {
    var h = m = s = ms = totalSec = 0;
    var newTime = "";
    totalSec = time/1000;
    ms = time%1000;
    s = Math.floor(totalSec%60);
    m = Math.floor((totalSec%3600)/60);
    newTime = digitTime(m, 2) + ':' + digitTime(s, 2) + ':' + digitTime(ms, 2);
    return newTime;
}

var showTime = function() {
    $time = document.getElementById("time");
    timeUpdate();
}

var timeUpdate = function() {
    $time.innerHTML = timeToString(timer.time());
}

var startTimer = function() {
    stopwatch = setInterval("timeUpdate()", 0.1);
    timer.start();
}

var stopTimer =function() {
    clearInterval(stopwatch);
    timer.stop();
    timeUpdate();
}

var pauseTimer = function(){
    timer.save();
    clearInterval(stopwatch);
    return timer.getSavedTime();
}

var savedToString = function(time){
    return timeToString(time);
}

/*Sumber Kode:
https://gist.github.com/electricg/4372563
Copyright (c) 2010-2015 Giulia Alfonsi <electric.g@gmail.com>
Kode diambil sebagian dari website tersebut
*/