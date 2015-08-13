import React from 'react';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { done: props.done };
  }

  /**
   * Lifecycle functions
   **/
  componentDidMount() {
    this.setDone(this.refs.done.getDOMNode().checked);
  }

  render() {
    return (
      <label>
        <input ref="done" type="checkbox" defaultChecked={this.state.done} onChange={this.onChange} />
        {this.props.name}
      </label>
    );
  }

  /**
   * Event handlers
   **/
  onChange(event) {
    this.setDone(event.target.checked);
  }

  /**
   * Utilities
   **/
  setDone(done) {
    this.setState({ done: !!done});
  }
}
