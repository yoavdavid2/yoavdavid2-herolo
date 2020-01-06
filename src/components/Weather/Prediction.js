import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/*This class is the card of the daily forecast (the one that appears in favorites for each city 
and the one that appears five times in the home screen)*/

 class Prediction extends React.Component {

  findDay(date) {
    var day = new Date(date * 1000).toUTCString().split(', ')[0];
    return day;
  }

  render() {
    if (this.props.is_from_fav) {
      var city_name = this.props.name;
      var temp_C = this.props.data.Temperature.Metric.Value;
      var temp_F = this.props.data.Temperature.Imperial.Value;
    } else {
      var day = this.findDay(this.props.data.EpochDate);
      var min_temp = this.props.data.Temperature.Minimum.Value;
      var max_temp = this.props.data.Temperature.Maximum.Value;
    }
    return (
      <div>
        <Grid>
          <Typography align="center" variant="h5">{this.props.is_from_fav ? `${city_name}` : `${day}`}</Typography>
          <br />
          <Typography align="center">{ this.props.is_from_fav ? `${temp_C}°C` : `min - ${min_temp}°C` }</Typography>
          <Typography align="center">{ this.props.is_from_fav ? `${temp_F}­°F` : `max - ${max_temp}°C` }</Typography>
        </Grid>
      </div>
    );
  }
}

export default Prediction;