var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (<div className="time-left">{ this.props.time.minutes }:{ this.props.time.seconds }</div>);
  }
});
