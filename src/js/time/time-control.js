var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (<div className="time-control">{ this.props.currentlyPlaying ? 'pause' : 'play' }</div>);
  }
});
