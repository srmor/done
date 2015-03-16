var React = require('react');

var TaskStartTime = require('./task-start-time');

module.exports = React.createClass({
  handleChange: function (e) {
    this.props.updateTask(e.target.value)
  },
  handleKeyPress: function (e) {
    // if the enter key is pressed in the input then create a new task
    if (event.keyCode === 13) {
      this.props.createNewTask();
    }
  },
  componentDidMount: function () {
    React.findDOMNode(this.refs.newTaskDraft).focus();
  },
  render: function () {
    var currentTask = this.props.task;

    return (
      <div className="task-item new-task">
        <TaskStartTime startTime={ currentTask.startTime }/>
        <input type="text" value={ currentTask.title } onChange={ this.handleChange } onKeyPress={ this.handleKeyPress } ref="newTaskDraft"/>
      </div>
    );
  }
});
