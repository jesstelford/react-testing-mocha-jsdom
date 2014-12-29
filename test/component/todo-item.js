var React = require('react/addons'),
    assert = require('assert'),
    TodoItem = require('../../lib/components/todo-item'),
    TestUtils = React.addons.TestUtils,
    // Since we're not using JSX here, we need to wrap the component in a factory
    // manually. See https://gist.github.com/sebmarkbage/ae327f2eda03bf165261
    TodoItemFactory = React.createFactory(TodoItem);

describe('Todo-item component', function(){

  before('render and locate element', function() {

    // Create our component
    var component = TodoItemFactory({
      done: false,
      name: 'Write Tutorial'
    });

    // We want to render into the <body> tag
    var renderTarget = document.getElementsByTagName('body')[0];

    var renderedComponent = React.render(component, renderTarget);

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

})
