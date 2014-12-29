var React = require('react/addons'),
    assert = require('assert'),
    TodoItem = require('../../lib/components/todo-item'),
    TestUtils = React.addons.TestUtils,
    // Since we're not using JSX here, we need to wrap the component in a factory
    // manually. See https://gist.github.com/sebmarkbage/ae327f2eda03bf165261
    TodoItemFactory = React.createFactory(TodoItem);

describe('Todo-item component', function(){

  before('instantiate', function() {

    // Create our component
    this.component = TodoItemFactory({
      done: false,
      name: 'Write Tutorial'
    });

    // We want to render into the <body> tag
    this.container = global.document.getElementsByTagName('body')[0];

  });

  describe('when rendered', function() {

    before('render', function() {

      this.renderedComponent = TestUtils.renderIntoDocument(
        this.component,
        this.container
      );

    });

    describe('the <input> el', function() {

      before('locate rendered component', function() {

        // Searching for <input> tag within rendered React component
        // Throws an exception if not found
        var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
          this.renderedComponent,
          'input'
        );

        this.inputElement = inputComponent.getDOMNode();

      });

      it('should be of type "checkbox"', function() {
        assert(this.inputElement.getAttribute('type') === 'checkbox');
      });

      it('should not be checked', function() {
        assert(this.inputElement.checked === false);
      });

    })
  })

})
