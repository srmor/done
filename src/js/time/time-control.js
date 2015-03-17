var React = require('react');

module.exports = React.createClass({
  handleClick: function (e) {
    if (this.props.timerOn)
      this.props.pause();
    else
      this.props.start();
  },
  render: function () {
    var classes = ['fa', 'fa-lg'];
    if (this.props.timerOn)
      classes.push('fa-pause');
    else
      classes.push('fa-play');

    return (
      <div className="time-control">
        <i className={ classes.join(' ') } onClick={ this.handleClick }></i>
      </div>
    );
  }
});
