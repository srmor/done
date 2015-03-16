var React = require('react');

var timeToSeconds = function (time) {
  minutesAsSeconds = time.minutes * 60;
  return minutesAsSeconds + time.seconds;
};

module.exports = React.createClass({
  render: function () {
    var totalTime = this.props.time.totalTime;
    var remainingTime = this.props.time.remainingTime;

    var remainingTimeAsSeconds = timeToSeconds(remainingTime);
    var totalTimeAsSeconds = timeToSeconds(totalTime);

    var percentComplete = Math.floor((remainingTimeAsSeconds / totalTimeAsSeconds) * 100);
    console.log(percentComplete);
    var percentLeft = 100 - percentComplete;

    return (
      <div className="time-left">
        <span className="minutes">{ remainingTime.minutes }</span>
        <span className="colon">:</span>
        <span className="seconds">{ remainingTime.seconds }</span>
        <div className="percent percent-complete" style={{ right: percentComplete + '%' }}></div>
        <div className="percent percent-left" style={{ left: percentLeft + '%' }}></div>
      </div>
    );
  }
});
