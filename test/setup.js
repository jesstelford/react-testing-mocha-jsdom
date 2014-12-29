var jsdom = require('jsdom');

before('DOM Setup', function() {

  // A super simple DOM ready for React to render into
  // Store this DOM and the window ready for React to access
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = global.document.parentWindow;
});

after('DOM teardown', function() {
  // We're done, so prevent memory leaks by closing the window
  global.window.close();
});
