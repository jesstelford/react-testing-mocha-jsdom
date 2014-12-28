var React = require('react/addons'),
    assert = require('assert'),
    TodoItem = require('../../lib/components/todo-item'),
    TestUtils = React.addons.TestUtils,
    // Since we're not using JSX here, we need to wrap the component in a factory
    // manually. See https://gist.github.com/sebmarkbage/ae327f2eda03bf165261
    TodoItemFactory = React.createFactory(TodoItem);

describe('Todo-item component', function(){

  beforeEach('render element', function() {

    // Create our component
    this.component = TodoItemFactory({
      done: false,
      name: 'Write Tutorial'
    });

    // Render the component into the <body> tag
    this.container = this.document.getElementsByTagName('body')[0];
    this.renderedComponent = TestUtils.renderIntoDocument(
      this.component,
      this.container
    );

  });

  describe('when rendered', function() {

    describe('the <input> el', function() {

      beforeEach('locate rendered component', function() {

        // Searching for <input> tag within rendered React component
        // Throws an exception if not found
        this.inputElement = TestUtils.findRenderedDOMComponentWithTag(
          this.renderedComponent,
          'input'
        );

      });

      it('should be of type "checkbox"', function() {
        assert(this.inputElement.getDOMNode().getAttribute('type') === 'checkbox');
      });

    })
  })

})
