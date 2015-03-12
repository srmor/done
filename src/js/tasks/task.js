var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (<div className="task">{ this.props.title }</div>);
  }
});
