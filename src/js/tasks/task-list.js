var React = require('react');

var TaskItem = require('./task-item');
var NewTaskItem = require('./new-task-item');

module.exports = React.createClass({
  render: function () {
    var tasks = this.props.tasks.map(function (task, index) {
      return (<TaskItem task={ task } key={ index }/>);
    });

    var newTask = this.props.newTask ? <NewTaskItem task={ this.props.newTask } updateTask={ this.props.updateNewTask } createNewTask={ this.props.createNewTask }/> : <div className="create-new-task" onClick={ this.props.createNewTaskDraft }>Create New Task</div>;

    return (
      <div className="task-list">
        { tasks }
        { newTask }
      </div>);
  }
});
