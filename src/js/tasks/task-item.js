var React = require('react');

var TaskStartTime = require('./task-start-time');
var Task = require('./task');

module.exports = React.createClass({
  render: function () {
    var currentTask = this.props.task;

    var classes = ['task-item'];
    if (currentTask.current)
      classes.push('current');

    return (
      <div className={ classes.join(' ') }>
        <TaskStartTime startTime={ currentTask.startTime }/>
        <Task title={ currentTask.title }/>
      </div>
    );
  }
});
