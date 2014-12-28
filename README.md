# Unit testing React Components with Mocha + jsdom

**tl;dr**: Jest can be replaced with Mocha + jsdom for unit testing headlessly
in node/io.js, allowing future tooling changes.

Unit testing [React]() is traditionally done using [Jest]() which dictates the
use of the Jasmine testing framework, and enforces mocking of all `require`
calls. For such an unopinionated rendering engine, this is a very opinionated
setup, resulting in issues such as overly-verbose unmocking of requires, and
being tied into Jasmine's limited framework.

The [Mocha]() testing framework is a simple, fast, and async-friendly testing
framework with its own test runner built in. We can choose our own Assertion
handlers ([Chai](), [Assertive](), etc), and mocking frameworks ([Sinon](),
etc).

[jsdom]() provides React the required DOM to render to, implementing a suitable
subset of browser's DOM implementations entirely in node/io.js.

With these three tools combined, unit testing react components becomes easier,
and with less vendor-lock for future changes (we can swap out jsdom for some
other implementation in the future, etc).

## Let's do it

**tl;dr** [Get the completed
example](https://github.com/jesstelford/react-testing-mocha-jsdom)

We'll be using these libraries:

 * [Node.js](http://nodejs.org)
 * [npm](https://www.npmjs.org)
 * [React](https://www.npmjs.com/package/react) ^0.12.0
 * [react-tools](https://www.npmjs.com/package/react-tools) - to compile JSX to JS
 * [Mocha](http://mochajs.org/) - testing framework and runner
 * [jsdom](https://github.com/tmpvar/jsdom) - headless DOM for React to use in tests

Our code structure will look like this:

```
├── common
│   └── components  # All our react components
├── lib
│   └── components  # Our jsx-compiled components
└── test            # Unit tests for components
```
