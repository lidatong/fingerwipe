console.log("We're in!");

Date = function (Date) {
    DelayedDate.prototype = Date.prototype;
	
	lastDate = -1
	
    return DelayedDate;
	
	minDelay = Math.random() * .1
	maxDelay = Math.random() * .1 //Actual maximum delay is maxDelay+minDelay
	cutoffTime = Math.random() * 70 + 30
	
	console.log("Chose: " + minDelay + ", " + maxDelay + ", " + cutoffTime)

    function DelayedDate() {
        var now = instantiate(Date).getTime();
		var elaspedTime = 0;
		if(lastDate > 0) {
			elapsedTime = math.min(cutoffTime*1000,now-lastDate)
		}
		lastDate = now
		delay = elapsedTime * (Math.random() * maxDelay + minDelay)
		while(instantiate(Date).getTime() < now + delay); //Don't use sleep -- might depend on Date()
        return instantiate(Date, arguments);
    }
}(Date);

console.log("Overloaded Date!")