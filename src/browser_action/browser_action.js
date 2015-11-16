// Thanks to:
// https://developer.chrome.com/extensions/messaging
// http://stackoverflow.com/questions/11996053/detect-a-button-click-in-the-browser-action-form-of-a-google-chrome-extension
// http://stackoverflow.com/questions/11552125/how-to-add-event-listener-for-checkbox-in-chrome-extensions-popup


console.log("loaded browser action script!");
// chrome.runtime.sendMessage({
//   agentLevel: "low"
// }, function(response) {
//   console.log(response.gotit);
// });

// console.log("finished sending message");

// $('')

// $('input[type="checkbox"]').on('change', function() {
//   console.log("here!");
//     $('input[name="' + this.name + '"]').not(this).prop('checked', false);
// });



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('low').addEventListener('change', lowHandler);
  document.getElementById('moderate').addEventListener('change', moderateHandler);
  document.getElementById('high').addEventListener('change', highHandler);
  document.getElementById('demolish').addEventListener('change', demolishHandler);
})

function lowHandler(e) {
  chrome.runtime.sendMessage({
    agentLevel: "low",
    checked: document.getElementById('low').checked
  }, function(response) {
    console.log(response.gotit);
  });
}


function moderateHandler(e) {
  chrome.runtime.sendMessage({
    agentLevel: "moderate",
    checked: document.getElementById('moderate').checked
  }, function(response) {
    console.log(response.gotit);
  });
}


function highHandler(e) {
  chrome.runtime.sendMessage({
    agentLevel: "high",
    checked: document.getElementById('high').checked
  }, function(response) {
    console.log(response.gotit);
  });
}


function demolishHandler(e) {
  chrome.runtime.sendMessage({
    agentLevel: "demolish",
    checked: document.getElementById('demolish').checked
  }, function(response) {
    console.log(response.gotit);
  });
}
