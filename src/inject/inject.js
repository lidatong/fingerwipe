var actualCode;

var xhr = new XMLHttpRequest();

var userAgent;

chrome.runtime.sendMessage({
  agentLevel: "giveme"
}, function(response) {

  console.log(response.gotit);



  xhr.open('GET', chrome.extension.getURL('src/inject/injected.js'), true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      console.log(xhr);
      actualCode = xhr.responseText.replace("userAgentReplace", response.gotit);


      console.log("Actual code = \n" + actualCode);

      document.documentElement.setAttribute('onreset', actualCode);
      document.documentElement.dispatchEvent(new CustomEvent('reset'));
      document.documentElement.removeAttribute('onreset');
    }
  };
  xhr.send();

})
