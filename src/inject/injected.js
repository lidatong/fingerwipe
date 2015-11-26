console.log("We're in!");

//Adapted from http://stackoverflow.com/a/8843181/582136
(function() {
	
	var minDelay = Math.random() * .1;
	var maxDelay = Math.random() * .1; //Actual maximum delay is maxDelay+minDelay
	var cutoffTime = Math.random() * 70 + 30;
	
	//console.log("Chose: " + minDelay + ", " + maxDelay + ", " + cutoffTime);
	
	var date = Date;
	
	var lastDate = -1;
	
    DelayedDate.prototype = date.prototype;
	
	var bind = Function.bind;
	var unbind = bind.bind(bind);
	function instantiate(constructor, args) {
		return new (unbind(constructor, null).apply(null, args));
	}
	
    function DelayedDate() {
        var now = new date().getTime();
		var elapsedTime = 0;
		if(lastDate > 0) {
			elapsedTime = Math.min(cutoffTime*1000,now-lastDate);
			//console.log("elapsed: " + elapsedTime)
		}
		var delay = elapsedTime * (Math.random() * maxDelay + minDelay);
		//console.log("Last time: " + lastDate + "; Delay: " + delay);
		lastDate = now;
		while(new date().getTime() < now + delay); //Don't use sleep -- might depend on Date()
		
		//var time;
		//if (arguments.length < 1) time = date.now();
		//else if (arguments.length > 1) time = date.UTC.apply(null, arguments);
		//console.log(time)
        //return new date(time);
		return instantiate(date, arguments)
    }
	
	DelayedDate.now = function() {
		var d = new DelayedDate();
		//console.log(d);
		return d.getTime();
	}
	
    Date = DelayedDate;
})();

console.log("Overloaded Date!");

(function() {
    'use strict';
    var navigator = window.navigator;
    var modifiedNavigator;
    if ('userAgent' in Navigator.prototype) {
        // Chrome 43+ moved all properties from navigator to the prototype,
        // so we have to modify the prototype instead of navigator.
        modifiedNavigator = Navigator.prototype;

    } else {
        // Chrome 42- defined the property on navigator.
        modifiedNavigator = Object.create(navigator);
        Object.defineProperty(window, 'navigator', {
            value: modifiedNavigator,
            configurable: false,
            enumerable: false,
            writable: false
        });
    }
    // Pretend to be Windows XP
    Object.defineProperties(modifiedNavigator, {
        userAgent: {
            value: "userAgentReplace",
            configurable: false,
            enumerable: true,
            writable: false
        },
		plugins: {
            value: Array(),
            configurable: false,
            enumerable: true,
            writable: false
		}
    });

})();
console.log("filler");
console.log("filler");
console.log("filler");
console.log("filler");
console.log("userAgentReplace");
