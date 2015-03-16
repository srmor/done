var React = require('react');

var TimeLeft = require('./time-left');
var TimeControl = require('./time-control');

module.exports = React.createClass({
  render: function () {
    var timeStatus = this.props.timeStatus;
    return (
      <div className="time">
        <TimeLeft time={ timeStatus.time }/>
        <TimeControl playing={ timeStatus.currentlyPlaying }/>
      </div>
    );
  }
});
