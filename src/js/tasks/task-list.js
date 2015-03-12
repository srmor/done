var React = require('react');

var TaskItem = require('./task-item');

module.exports = React.createClass({
  render: function () {
    var tasks = this.props.tasks.map(function (task, index) {
      return (<TaskItem task={ task } key={ index }/>);
    });

    return (<div className="task-list">{ tasks }</div>);
  }
});
