var React = require('react');

var TimeLeft = require('./time-left');
var TimeControl = require('./time-control');

module.exports = React.createClass({
  render: function () {
    var currentTask = this.props.currentTask;
    var totalTime = this.props.totalTime;

    var remainingTime = currentTask ? currentTask.remainingTime : totalTime;

    return (
      <div className="time">
        <TimeLeft remainingTime={ remainingTime  } totalTime={ totalTime }/>
        <TimeControl playing={ currentTask ? true : false }/>
      </div>
    );
  }
});
