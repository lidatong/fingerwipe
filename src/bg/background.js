

// list of chrome releases:
// http://googlechromereleases.blogspot.com/search?updated-max=2015-09-29T17:07:00-07:00&max-results=10&start=30&by-date=false


var userAgentLevel = "nothingChecked";

var chromeVersions = ["Chrome/46.0.2490.80 ", "Chrome/46.0.2490.71 ", "Chrome/45.0.2454.101 ", "Chrome/45.0.2454.98 "];
var macVersions = ["Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) ", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) ", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) ", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) "];

var demolishList = ["I do not consent to this search", "This is a real user agent string", "{{null}}", "{{undefined}}"];


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("LISTENER TRIGGERED!");
    switch (request.agentLevel) {
      case "low":
        if (request.checked) {
          userAgentLevel = "low";
        }
        console.log("Am I checked? ", request.checked);
        sendResponse({
          gotit: "low!"
        });
        break;
      case "moderate":
        if (request.checked) {
          userAgentLevel = "moderate";
        }
        sendResponse({
          gotit: "moderate!"
        });
        break;
      case "high":
        if (request.checked) {
          userAgentLevel = "high";
        }
        sendResponse({
          gotit: "high!"
        });
        break;
      case "demolish":
        if (request.checked) {
          userAgentLevel = "demolish";
        }
        sendResponse({
          gotit: "demolish!"
        });
        break;
    }
    console.log("FINISHING LISTENER");
  });


//Header override
//Header override from http://stackoverflow.com/a/27936481/582136
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    console.log("MODIFYING user AGENT");
    console.log(userAgentLevel);
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {

        newUserAgent = updateUserAgent(details.requestHeaders[i].value, userAgentLevel);
        console.log("here's the new user agent: ", newUserAgent);


        if (newUserAgent) //update to new user agent
          details.requestHeaders[i].value = newUserAgent;
        else //Delete user agent entirely
          details.requestHeaders.splice(i, 1);
        break;
      }
    }
    return {
      requestHeaders: details.requestHeaders
    };
  }, {
    urls: ["<all_urls>"]
  }, ["blocking", "requestHeaders"]);


userAgentParse = function(userAgent) {
  var userAgentRegex = /([^ ]*)( \([^\)]*\))? ?/g;
  var userAgentComponents = [];
  var prevIndex = -1;
  while (userAgentRegex.lastIndex != prevIndex) {
    prevIndex = userAgentRegex.lastIndex;
    match = userAgentRegex.exec(userAgent);
    userAgentComponents.push(match[0]);
    msg = 'Match : ' + match[0] + '\nNext match starts at ' + userAgentRegex.lastIndex;
    console.log(msg);
  }
  return userAgentComponents;
};

updateUserAgent = function(userAgent, userAgentLevel) {
  console.log("Old user agent: " + userAgent);
  var components = userAgentParse(userAgent);
  var newUA;

  var chromeIndex = Math.round((Math.random() * 3));
  var osIndex = Math.round((Math.random() * 3));
  var demolishIndex = Math.round((Math.random() * 3));


  if (userAgentLevel === "low") {
    newUA = components[0] + components[1] + chromeVersions[chromeIndex] + components[3];
  } else if (userAgentLevel === "moderate") {
    newUA = macVersions[osIndex] + components[1] + chromeVersions[chromeIndex] + components[3];
  } else if (userAgentLevel === "high") {
    newUA = macVersions[osIndex] + components[1] + chromeVersions[chromeIndex];
  } else if (userAgentLevel === "demolish") {
    newUA = demolishList[demolishIndex];
  }

  console.log("New user agent: " + newUA);
  //return newUA
  return newUA;
};
