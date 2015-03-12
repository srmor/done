var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (<span className="task-start-time">{ this.props.startTime }</span>);
  }
});
