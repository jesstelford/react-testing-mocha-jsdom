var assert = require('assert'),
    TodoItem = require('../../common/components/todo-item'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    ReactTestUtils = require('react-addons-test-utils');

describe('Todo-item component', function() {
  before('render and locate element', function() {
    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <TodoItem done={false} name="Write Tutorial"/>
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    this.inputElement = inputComponent;
  });

  it('<input> should be of type "checkbox"', function() {
    assert.equal(this.inputElement.getAttribute('type'), 'checkbox');
  });

  it('<input> should not be checked', function() {
    assert.equal(this.inputElement.checked, false);
  });

  it('<input> should change state when clicked', function() {

    var renderedComponent = ReactTestUtils.renderIntoDocument(
      <TodoItem done={false} name="Write Tutorial"/>
    );

    assert.equal(renderedComponent.state.done, false);
    ReactTestUtils.Simulate.change(renderedComponent.refs.done, {"target": {"checked": true}})
    assert.equal(renderedComponent.state.done, true)
  })
});
