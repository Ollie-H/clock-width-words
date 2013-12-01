(function ($, window, document, undefined) {

  'use strict'; 
  
  var qClock = function(){
    
    this.strings = "|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve".split("|");
    this.milestones = "|||||fiveto past|||||tento past|||||quarter past|||||twenty past|||||twentyfive past|||||half past|||||twentyfive to|||||twenty to|||||quarter to|||||tento to|||||fiveto to".split("|");
    
    console.log(this.milestones);

    this.ticker = null;
    
    this.setupInterval();
    this.changeTime();
  }
  
  qClock.prototype.checkTime = function(){
        
    var mins = new Date().getMinutes();
    var hour = new Date().getHours();
    var time = qClock.timeToString(mins, hour);
    qClock.highLightString(time);
     
  }
  
  qClock.prototype.changeTime = function(){
        
    $('.submit').on("click", function(e){
        var val = $('.new-time').val().split(":");
        if(val.length > 1){
          var time = qClock.timeToString(val[1], val[0]);
          qClock.highLightString(time);
          clearInterval(qClock.ticker);
        }
        e.preventDefault();
    });

  }
  
  qClock.prototype.timeToString = function(mins, hour){

    var rem = 0;
    var min = Math.floor(mins/5) * 5;
    
    hour = (hour > 12) ? hour % 12 : hour;
    hour = ((min > 30) ? hour*1+1 : hour);
    hour = (hour > 12) ? hour % 12 : hour;
    
    if(this.milestones[min] != undefined){
      return this.strings[hour] + " " + this.milestones[min];
    }    
    if(mins % 10 == 5){
      rem = mins % 10;
      return this.strings[hour] + " " + this.strings[min] + " " + this.strings[rem];
    }
    
  }
  
  qClock.prototype.highLightString = function(time){
    var htmlClass = "it is " + time;
    $('#qclock').attr("class", htmlClass); 
  }
  
  qClock.prototype.setupInterval = function(){ 
    this.ticker = self.setInterval(this.checkTime, 1000); 
  }
  
  var qClock = new qClock();
  
  
})(jQuery, window, document);