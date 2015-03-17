var React = require('react');

var TaskStartTime = require('./task-start-time');
var Task = require('./task');

module.exports = React.createClass({
  render: function () {
    var currentTask = this.props.task;

    return (
      <div className="task-item">
        <TaskStartTime startTime={ currentTask.startTime }/>
        <Task title={ currentTask.title }/>
      </div>
    );
  }
});
