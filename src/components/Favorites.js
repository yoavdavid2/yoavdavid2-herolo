import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import Prediction from './Weather/Prediction';
import { requestWeatherDetails } from '../weatherAPI';
import '../styles.css';

class Favorites extends React.Component{
  
  state = { fav_data: { } };
//'Tel Aviv': 215854, 'London': 238238, 'Bucharest': 287430
  async componentDidMount() {
    if (!this.isEmpty(this.props.favorite_list)) {
      Object.keys(this.props.favorite_list).map(async (city_code, index) => {
        const copy_fav_data = { ...this.state.fav_data };
        copy_fav_data[`${city_code}`] = await requestWeatherDetails(this.props.favorite_list[city_code]);
        this.setState({
          fav_data: copy_fav_data
        }) ;
      });
    }
  }

  isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }

  async getFavList(city_code) {
    const city_data = await requestWeatherDetails(city_code)
    console.log(city_data);
    return city_data;
  }

  getFavData() {
    console.log(Object.keys(this.state.fav_data).length);
    if (this.state.fav_data && Object.keys(this.state.fav_data).length) {
      return (
        <div className="card-div">
          { Object.keys(this.state.fav_data).forEach((city_name ,index) => {
            return (
              <Card className="card" key={index}>
                <Prediction name={city_name} data={this.state.fav_data[city_name][0]} is_from_fav={true}/>
              </Card>
            );
          })} 
        </div>
      );
    }
    return (
      <div className="card-div">
        <Typography>
          No Favorites Yet
        </Typography>
      </div>
    );
  }

  render() {
    console.log(this.props.favorite_list);
    return (
      <div>
        {this.getFavData()}
      </div>
    );
  }
}

export default Favorites;