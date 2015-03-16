var React = require('react');

var TaskList = require('./tasks/task-list');
var TimeContainer = require('./time/time-container');

var DoneContainer = React.createClass({
  render: function () {
    return (
      <div className="outer-container">
        <TaskList tasks={ this.props.tasks }/>
        <TimeContainer timeStatus={ this.props.timeStatus }/>
      </div>
    );
  }
});

var TASKS = [
  {title: 'Eat lunch', startTime: '12:45:03', current: true },
  {title: 'Eat dinner', startTime: '12:45:03', current: false },
  {title: 'Sleep', startTime: '12:45:03', current: false },
  {title: 'Work', startTime: '12:45:03', current: false },
  {title: 'Collaborate', startTime: '12:45:03', current: false }
];

var TIME_STATUS = {
  time: {
    totalTime: {
      minutes: 25,
      seconds: 20
    },
    remainingTime: {
      minutes: 13,
      seconds: 45
    }
  },
  currentlyPlaying: false
};

React.render(<DoneContainer tasks={ TASKS } timeStatus={ TIME_STATUS } />, document.body);
