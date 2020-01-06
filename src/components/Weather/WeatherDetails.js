import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { getCitiesList } from '../../weatherAPI';
import WeatherCard from './WeatherCard';
import Search from './Search';
import '../../styles.css';

class WeatherDetails extends React.Component {

  state = { cityCode: 215854 , cityName: 'Tel Aviv, , Israel', options: [] }; //Tel Aviv code - default location code

  handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.getCityKey(document.getElementById('loc_input').value);
      document.getElementById('loc_input').value = '';
    }
  }

  async setOptions(input) {
    this.setState({
      options: await getCitiesList(input)
    });
  }

  setInputVal(name) {
    document.getElementById('loc_input').value = name;
    this.setState({
      options: []
    });
    this.getCityKey(name);
  }

  async getCityKey(city_name) {
    var cities_list = await getCitiesList(city_name.split(',')[0]);
    for (var city in cities_list) {
      var key = parseInt(cities_list[city].split('/')[0], 10);
      var name = cities_list[city].split('/')[1];
      if (city_name === name) {
        this.setState({
          cityCode: key, 
          cityName: name
        });
      }
    }
  }

  render() {
    return (
      <div>
        <FormControl className="search-bar">
          <TextField
            id="loc_input" 
            label="Search Location"
            autoComplete="off"
            onChange={() => this.setOptions(document.getElementById('loc_input').value)}
            onKeyDown={(e) => this.handleEnter(e)}
          />
          <Search options={this.state.options} callback={(val) => this.setInputVal(val)}/>
        </FormControl>
        <br />
        <WeatherCard className="detailed" code={this.state.cityCode} city_name={this.state.cityName} callback={this.props.callback}/>
      </div>
    );
  }
}

export default WeatherDetails;