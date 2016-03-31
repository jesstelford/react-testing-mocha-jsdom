*This is __Part 2__ of the series* "Modular Isomorphic React JS applications".
*See [Part 1](https://github.com/jesstelford/react-isomorphic-boilerplate) and
[Part 3](https://github.com/jesstelford/react-testing-isomorphic) for more.*

# Unit testing React Components with Mocha + jsdom

**tl;dr**: Jest can be replaced with Mocha + jsdom for unit testing headlessly
in node/io.js, keeping open the option for future tooling changes. Modularity
FTW!

Unit testing [React](https://facebook.github.io/react) is traditionally done
using [Jest](https://facebook.github.io/jest) which dictates the use of the
Jasmine testing framework, and enforces mocking of all `require` calls. For such
an unopinionated rendering engine, this is a very opinionated setup, resulting
in issues such as overly-verbose unmocking of requires, and being tied into
Jasmine's limited framework.

The [Mocha](http://mochajs.org/) testing framework is a simple, fast, and
async-friendly testing framework with its own test runner built in. We can
choose our own Assertion handlers ([Chai](http://chaijs.com/),
[better-assert](https://github.com/tj/better-assert), etc), and mocking
frameworks ([Sinon](http://sinonjs.org/), etc).

[jsdom](https://github.com/tmpvar/jsdom) provides React the required DOM to
render to, implementing a suitable subset of browser's DOM implementations
entirely in node/io.js.

With these three tools combined, unit testing react components becomes easier,
and with less vendor-lock for future changes (we can swap out jsdom for some
other implementation in the future, etc).

## Let's do it

**tl;dr**: [Get the completed
example](https://github.com/jesstelford/react-testing-mocha-jsdom)

We'll be using these libraries:

 * [Node.js](http://nodejs.org)
 * [npm](https://www.npmjs.org)
 * [React](https://www.npmjs.com/package/react) - ^0.12.0
 * [react-tools](https://www.npmjs.com/package/react-tools) - to compile JSX to JS
 * [Mocha](http://mochajs.org/) - testing framework and runner
 * [jsdom](https://github.com/tmpvar/jsdom) - headless DOM for React to use in tests

Our code structure will look like this:

```
├── common
│   └── components  # All our react components
└── test
    └── components  # Unit tests for components
```

### `todo-item.js` React component

We previously built the component `common/components/todo-item.js` in [Part 1](https://github.com/jesstelford/react-isomorphic-boilerplate#server-side-rendering):

```javascript
// file: common/components/todo-item.js
var React = require('react');

module.exports = React.createClass({
  displayName: 'TodoItem',

  getInitialState: function() {
    return { done: this.props.done }
  },

  render: function() {
    return (
      <label>
        <input type="checkbox" defaultChecked={this.state.done} />
        {this.props.name}
      </label>
    );
  }
});
```

### jsdom

Setting up jsdom ^2.0.0 can be acheived in a couple of lines:

```javascript
// file: test/setup.js
var jsdom = require('jsdom');

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
```

We are emulating a browser environment here by setting the global variables
`document` and `window` as created by `jsdom`. This later allows React to render
into the `document`, and utilize functions existing on `window` such as
`onScroll`.

The HTML passed into
[`jsdom.jsdom(...)`](https://github.com/tmpvar/jsdom#for-the-hardcore-jsdomjsdom)
is a very simple document, and can be simplified further to `<body></body>` if
you wish. I have kept the `<!doctype html><html>...</html>` tags to future proof
against a time when `jsdom` can distinguish between HTML5 and older DOM models.

### A Mocha Test

**tl;dr**: Get the completed test file in the example repo at
[test/component/todo-item.js](https://github.com/jesstelford/react-testing-mocha-jsdom/blob/master/test/component/todo-item.js)

Let's begin with scaffolding our tests, to figure out what we are aiming for in
terms of test setup and teardown:

```javascript
// file: test/component/todo-item.js
var assert = require('assert');

describe('Todo-item component', function(){

  it('<input> should be of type "checkbox"', function() {
    assert(this.inputElement.getAttribute('type') === 'checkbox');
  });

});
```

First up, how do we get access to `this.inputElement`? React provides a nice set
of [`TestUtils`](https://facebook.github.io/react/docs/test-utils.html) to allow
searching for such an element, the most useful for us being
[`findRenderedDOMComponentWithTag()`](https://facebook.github.io/react/docs/test-utils.html#findrendereddomcomponentwithtag).

We can do this in one of Mocha's `before` methods, executed before all the
tests:

```javascript
// file: test/component/todo-item.js
var assert = require('assert');

describe('Todo-item component', function(){

  before('render and locate element', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <TodoItem done={false} name="Write Tutorial"/>
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    this.inputElement = inputComponent.getDOMNode();
  });

  it( /* [...] */ )

});
```

Now, we have extracted the DOM Node (`this.inputElement`) from the rendered
React component (`renderedComponent`) using React's `getDOMNode()` method.

`renderIntoDocument` is where jsdom comes in, allowing us to access the `document`
object as if we were in a browser!

All together now, and we end up with a complete test that can be run with
`./node_modules/.bin/mocha --compilers js:babel/register --recursive`
(alternatively can be run as `npm test` in the example repo):

```javascript
// file: test/component/todo-item.js
var React = require('react/addons'),
    assert = require('assert'),
    TodoItem = require('../../common/components/todo-item'),
    TestUtils = React.addons.TestUtils;

describe('Todo-item component', function(){
  before('render and locate element', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <TodoItem done={false} name="Write Tutorial"/>
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    this.inputElement = inputComponent.getDOMNode();
  });

  it('<input> should be of type "checkbox"', function() {
    assert(this.inputElement.getAttribute('type') === 'checkbox');
  });

  it('<input> should not be checked', function() {
    assert(this.inputElement.checked === false);
  });
});
```

## Results

```bash
$ npm test

> react-testing-mocha-jsdom@1.0.0 test /home/teddy/dev/react-mocha-jsdom
> mocha --recursive



  Todo-item component
    ✓ <input> should be of type "checkbox"


  1 passing (25ms)
```
