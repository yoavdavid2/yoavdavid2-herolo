import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';

import Prediction from './Prediction';
import { requestFiveDayPrediction, requestWeatherDetails } from '../../weatherAPI';
import '../../styles.css';

class WeatherCard extends React.Component {

  state = { favStat: true, futureData: [], createForecast: false, currentTemp: null};

  async componentDidMount() {
    const current_temp = await requestWeatherDetails(this.props.code);
    const forecast = await requestFiveDayPrediction(this.props.code);
    var create = forecast.Headline ? true : false
    this.setState({
      futureData: forecast,
      createForecast: create,
      currentTemp: current_temp
    });
  }
  
  componentDidUpdate() {
    this.componentDidMount();
  }


  changeFavStat() {
    this.setState({ favStat: !this.state.favStat});
    this.props.callback(this.props.code, this.props.city_name ,this.state.favStat);
  }

  getFutureforecast() {
    if (this.state.futureData.DailyForecasts !== undefined) {
      return (
        <div className="card-div">
          { this.state.futureData.DailyForecasts.map((day, index) => {
            return (
              <Card className="card" key={index}>
                <Prediction data={day} is_from_fav={false}/>
              </Card>
            );
          })} 
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <Card>
          <div id="credentials">
            <Typography variant="h6" className="details_tag">
              {this.props.city_name.split(',')[0] + ", " + this.props.city_name.split(',')[2]}{"\t"}
              {this.state.currentTemp !== null ? this.state.currentTemp[0].Temperature.Metric.Value + "°C": null}
            </Typography>
            <IconButton className="fav-icon" onClick={() => this.changeFavStat()}>
              {!this.state.favStat ? <FavoriteIcon color="primary"/> : <FavoriteBorderIcon color="primary"/>}
            </IconButton>
            <Typography align="center" variant="h5" >{ this.state.createForecast ? this.state.futureData.Headline.Text : null }</Typography>
          </div>
          {this.state.createForecast ? this.getFutureforecast() : <Typography>Loading...</Typography>}
        </Card>          
      </div>
    );
  }
}

export default WeatherCard;