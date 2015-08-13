import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

window.addEventListener('load', () => {
  console.log('JSDom setup completed: document, window and navigator are now on global scope.');
});
