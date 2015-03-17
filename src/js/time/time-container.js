var React = require('react');

var TimeLeft = require('./time-left');
var TimeControl = require('./time-control');

var util = require('../util');

module.exports = React.createClass({
  currentTimer: null,
  startTimer: function () {
    this.props.start();
    var initialTime = Date.now();
    var that = this;
    this.currentTimer = setInterval(function () {
      var currentTime = Date.now();
      var secondsDifference = Math.floor((currentTime - initialTime)/1000);
      initialTime = currentTime;

      if (!that.props.currentTask.remainingTime)
        that.props.currentTask.remainingTime = that.props.totalTime;

      var secondsRemaining = util.timeToSeconds(that.props.currentTask.remainingTime);
      var newSecondsRemaining = secondsRemaining - secondsDifference;

      if (newSecondsRemaining === -1)
        that.props.switchMode();
      else
        that.props.updateCurrentTaskRemainingTime(util.secondsToTime(newSecondsRemaining));
    }, 1000);
  },
  pauseTimer: function () {
    clearInterval(this.currentTimer);
    this.currentTimer = null;
    this.props.pause();
  },
  render: function () {
    var currentTask = this.props.currentTask;
    var totalTime = this.props.totalTime;

    var remainingTime = currentTask.remainingTime || totalTime;

    return (
      <div className="time">
        <TimeLeft remainingTime={ remainingTime  } totalTime={ totalTime }/>
        <TimeControl timerOn={ this.props.timerOn } start={ this.startTimer } pause={ this.pauseTimer }/>
      </div>
    );
  }
});
