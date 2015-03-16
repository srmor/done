var React = require('react');

var timeToSeconds = function (time) {
  minutesAsSeconds = time.minutes * 60;
  return minutesAsSeconds + time.seconds;
};

var formatTimeUnit = function (unit) {
  var unitAsString = unit.toString();

  if (unitAsString.length == 1)
    return '0' + unitAsString;
  else
    return unitAsString;
};

module.exports = React.createClass({
  render: function () {
    var totalTime = this.props.totalTime;
    var remainingTime = this.props.remainingTime;

    var remainingTimeAsSeconds = timeToSeconds(remainingTime);
    var totalTimeAsSeconds = timeToSeconds(totalTime);

    var percentComplete = Math.floor((remainingTimeAsSeconds / totalTimeAsSeconds) * 100);
    var percentLeft = 100 - percentComplete;

    return (
      <div className="time-left">
        <span className="minutes">{ formatTimeUnit(remainingTime.minutes) }</span>
        <span className="colon">:</span>
        <span className="seconds">{ formatTimeUnit(remainingTime.seconds) }</span>
        <div className="percent percent-complete" style={{ right: percentComplete + '%' }}></div>
        <div className="percent percent-left" style={{ left: percentLeft + '%' }}></div>
      </div>
    );
  }
});
