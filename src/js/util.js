// takes a time object which has keys minutes and seconds
exports.timeToSeconds = function (time) {
  minutesAsSeconds = time.minutes * 60;
  return minutesAsSeconds + time.seconds;
};

// takes an integer and returns a time object with keys: minutes and seconds
exports.secondsToTime = secondsToTime = function (seconds) {
  var time = {};
  time.seconds = seconds % 60;
  time.minutes = Math.floor(seconds / 60);

  return time;
};