var jsdom = require('jsdom');

before('DOM Setup', function() {

  // A super simple DOM ready for React to render into
  global.document = jsdom.jsdom('<html><head></head><body></body></html>');

  // Store this DOM and the window ready for React to access
  this.document = global.document;
  global.window = global.document.parentWindow;
});

after('DOM teardown', function() {
  // We're done, so prevent memory leaks by closing the window
  global.window.close();
});
