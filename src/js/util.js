//takes a time object which has keys minutes and seconds
exports.timeToSeconds = function (time) {
  minutesAsSeconds = time.minutes * 60;
  return minutesAsSeconds + time.seconds;
};
