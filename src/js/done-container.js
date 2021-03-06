var React = require('react');

var TaskList = require('./tasks/task-list');
var TimeContainer = require('./time/time-container');

var util = require('./util');

var addOneToHour = function (hour) {
  if (hour == 23)
    return 0;
  else
    return hour + 1;
};

var addMinuteToDateTime = function (datetime) {
  var minutes = datetime.getMinutes();
  var hours = datetime.getHours();

  if (minutes == 59) {
    datetime.setMinutes(0);
    datetime.setHours(addOneToHour(hours));
  }
  else {
    datetime.setMinutes(minutes + 1);
  }

  return datetime;
};

var timestampToStartTimeString = function (timestamp, roundUp) {
  var timeAsDate = new Date(timestamp);

  // round up to the nearest minute
  if (roundUp)
    timeAsDate = addMinuteToDateTime(timeAsDate);

  var hours = timeAsDate.getHours();
  var minutes = timeAsDate.getMinutes();
  var seconds = timeAsDate.getSeconds();

  // format hours in 12 hour format
  if (hours > 12)
    hours -= 12;
  else if (hours === 0)
    hours = 12;

  // add leading zero if it's a single digit minutes
  var minutesAsString = minutes.toString();
  if (minutesAsString.length == 1)
    minutes = '0' + minutesAsString;

  return hours + ':' + minutes;
};

var startTimeStringToTimeStamp = function (startTime) {
  var pieces = startTime.split(':');
  var hours = parseInt(pieces[0]);
  var minutes = parseInt(pieces[1]);

  var now = new Date();

  now.setMinutes(minutes);
  now.setHours(hours);

  return now.getTime();
};

module.exports = React.createClass({
  startTask: function () {
    this.setState(function (previousState) {
      var nextTask = previousState.tasks[0];

      return {
        current: nextTask,
        timerOn: true
      };
    });
  },
  pauseTask: function () {
    this.setState({
      timerOn: false
    });
  },
  updateCurrentTaskRemainingTime: function (newTime) {
    this.setState(function (previousState) {
      var newCurrent = previousState.current;

      newCurrent.remainingTime = newTime;
      return {current: newCurrent};
    });
  },
  switchMode: function () {
    if (this.state.tasks.length > 1) {
      this.setState(function (previousState) {
        previousState.tasks.shift();
        return {
          current: previousState.tasks[0],
          tasks: previousState.tasks
        };
      });
    }
  },
  updateNewTask: function (value) {
    this.setState(function(previousState) {
      var newTask = previousState.newTask;
      newTask.title = value;
      return {newTask: newTask};
    });
  },
  createNewTaskDraft: function () {
    this.setState(function (previousState) {
      var newTaskStartTime;
      if (previousState.tasks.length > 0) {
        var lastTaskTimeStamp = startTimeStringToTimeStamp(previousState.tasks[previousState.tasks.length - 1].startTime);
        // add task time to last task start time
        newTaskStartTime = timestampToStartTimeString(lastTaskTimeStamp + (util.timeToSeconds(previousState.taskTime)*1000), false);
      }
      else {
        newTaskStartTime = timestampToStartTimeString(Date.now(), false);
      }

      return {
        newTask : {
          title: '',
          startTime: newTaskStartTime
        }
      };
    });
  },
  createNewTask: function () {
    if (this.state.newTask) {
      this.setState(function (previousState) {
        var newState = {};

        var tasks = previousState.tasks;

        // make sure that there is always a current task
        if (tasks.length === 0)
          newState.current = previousState.newTask;

        tasks.push(previousState.newTask);

        newState.newTask = null;
        newState.tasks = tasks;

        return newState;
      });
    }
  },
  getInitialState: function () {
    return {
      tasks: [],
      current: null,
      timerOn: false,
      newTask: null,
      taskTime: {
        minutes: 0,
        seconds: 10
      }
    };
  },
  componentDidMount: function () {
    var initialTime = Date.now();
    var that = this;
    setInterval(function () {
      // only update the time if the timer is not currently going
      if (!that.state.timerOn) {
        var currentTime = Date.now();
        var minuteInSeconds = 60000;
        if (currentTime >= (initialTime + minuteInSeconds)) {
          initialTime = currentTime;

          // update each task start time to a time one minute later
          that.setState(function(previousState) {
            var newState = {};

            var startTime = initialTime;
            newState.tasks = previousState.tasks.map(function(task) {
              task.startTime = timestampToStartTimeString(startTime, true);
              startTime += util.timeToSeconds(previousState.taskTime)*1000;
              return task;
            });

            // change the value on the newTask if there is one
            if (previousState.newTask) {
              var newNewTask = previousState.newTask;
              newNewTask.startTime = timestampToStartTimeString(startTime);
              newState.newTask = newNewTask;
            }

            return newState;
          });
        }
      }
    }, 25000);
  },
  render: function () {
    // only show the timer if there are tasks
    var timeContainer;
    if (this.state.tasks.length > 0)
      timeContainer = <TimeContainer currentTask={ this.state.current } totalTime={ this.state.taskTime } start={ this.startTask } pause={ this.pauseTask } updateCurrentTaskRemainingTime={ this.updateCurrentTaskRemainingTime } timerOn={ this.state.timerOn } switchMode={ this.switchMode }/>;

    return (
      <div className="outer-container">
        <TaskList tasks={ this.state.tasks } newTask={ this.state.newTask } updateNewTask={ this.updateNewTask } createNewTask={ this.createNewTask } createNewTaskDraft={ this.createNewTaskDraft } timerOn={ this.state.timerOn }/>
        { timeContainer }
      </div>
    );
  }
});
