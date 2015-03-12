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
  {title: 'Eat lunch', startTime: '12:45:03'},
  {title: 'Eat dinner', startTime: '12:45:03'},
  {title: 'Sleep', startTime: '12:45:03'},
  {title: 'Work', startTime: '12:45:03'},
  {title: 'Collaborate', startTime: '12:45:03'},
];

var TIME_STATUS = {
  timeLeft: '15:25:23',
  currentlyPlaying: false
};

React.render(<DoneContainer tasks={ TASKS } timeStatus={ TIME_STATUS } />, document.body);
