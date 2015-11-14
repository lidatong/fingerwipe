// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
  
  
//Header override
//Header override from http://stackoverflow.com/a/27936481/582136
chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
				newUserAgent = updateUserAgent(details.requestHeaders[i].value)
				if(newUserAgent) //update to new user agent
					details.requestHeaders[i].value = newUserAgent
				else //Delete user agent entirely
					details.requestHeaders.splice(i,1)
				break;
            }
          }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]);
		
	

	
userAgentParse = function(userAgent){
	var userAgentRegex = /([^ ]*)( \([^\)]*\))? ?/g
	var userAgentComponents = []
	var prevIndex = -1
	while (userAgentRegex.lastIndex != prevIndex) {
		prevIndex = userAgentRegex.lastIndex
		match = userAgentRegex.exec(userAgent)
		userAgentComponents.push(match[0])
		msg = 'Match : ' + match[0] + '\nNext match starts at ' + userAgentRegex.lastIndex;
		console.log(msg);
	}
	return userAgentComponents
}
		
updateUserAgent = function(userAgent){
	console.log("Old user agent: " + userAgent)
	var components = userAgentParse(userAgent)
	var newUA = components[0] + components[1]
	console.log("New user agent: " + newUA)
	//return newUA
	return userAgent
}