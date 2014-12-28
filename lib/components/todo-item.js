var React = require('react');

module.exports = React.createClass({
  displayName: 'TodoItem',

  /**
   * Lifecycle functions
   **/
  getInitialState: function() {
    return { done: this.props.done }
  },

  componentDidMount: function() {
    this.setDone(this.refs.done.getDOMNode().checked);
  },

  render: function() {
    return (
      React.createElement("label", null, 
        React.createElement("input", {ref: "done", type: "checkbox", defaultChecked: this.state.done, onChange: this.onChange}), 
        this.props.name
      )
    );
  },

  /**
   * Event handlers
   **/
  onChange: function(event) {
    this.setDone(event.target.checked);
  },

  /**
   * Utilities
   **/
  setDone: function(done) {
    this.setState({ done: !!done});
  }
});
