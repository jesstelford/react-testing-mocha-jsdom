import assert from 'assert';
import React from 'react/addons';
import TodoItem from '../../common/components/todo-item';

const TestUtils = React.addons.TestUtils;

describe('Todo-item component', () => {
  let inputElement;

  before('render and locate element', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <TodoItem done={false} name="Write Tutorial"/>
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    const inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    inputElement = inputComponent.getDOMNode();
  });

  it('<input> should be of type "checkbox"', () => {
    assert(inputElement.getAttribute('type') === 'checkbox');
  });

  it('<input> should not be checked', () => {
    assert(inputElement.checked === false);
  });
});
