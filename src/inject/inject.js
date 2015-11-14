var actualCode;

var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('src/inject/injected.js'), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
		console.log(xhr)
        actualCode = xhr.responseText
		
		
		console.log("Actual code = \n" + actualCode)

		document.documentElement.setAttribute('onreset', actualCode);
		document.documentElement.dispatchEvent(new CustomEvent('reset'));
		document.documentElement.removeAttribute('onreset');
    }
};
xhr.send();
