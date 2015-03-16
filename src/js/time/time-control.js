var React = require('react');

module.exports = React.createClass({
  render: function () {
    var classes = ['fa', 'fa-lg'];
    if (this.props.currentlyPlaying)
      classes.push('fa-pause');
    else
      classes.push('fa-play');

    return (
      <div className="time-control">
        <i className={ classes.join(' ') }></i>
      </div>
    );
  }
});
