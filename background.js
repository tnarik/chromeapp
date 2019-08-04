'use strict';

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});


// Connection from the extension
chrome.runtime.onMessageExternal.addListener(function() {
  chrome.app.window.create("window.html");
});
