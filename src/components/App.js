import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import WeatherDetails from './Weather/WeatherDetails';
import Favorites from './Favorites';
import '../styles.css';

class App extends React.Component {

  state = { is_favorites: false, err_message: '', favorite_list: { } };

  changeView(is_fav) {
    if (this.state.is_favorites !== is_fav) {
      this.setState({ is_favorites: !this.state.is_favorites });
    }
  }

  changeFav(code, name, is_fav) {
    const copy_fav_list = {...this.state.favorite_list};
    if (is_fav) {
      copy_fav_list[name.split(',')[0]] = parseInt(code, 10);
      this.setState({
        favorite_list: copy_fav_list
      });
    } else {
      delete copy_fav_list[name];
      this.setState({
        favorite_list: copy_fav_list
      })
    }
  }

  render() {
    console.log(this.state.favorite_list);
    return (
      <div id="app-bar-div"> 
        <AppBar position="relative">
          <Toolbar className="tool-bar">
            <Typography variant="h6">
              Herolo Weather Task
            </Typography>
            <div className="buttons-div">
              <Button className="app-bar-buttons" color="default" onClick={() => this.changeView(false)}>Home</Button>
              <Button className="app-bar-buttons fav-button" color="default" onClick={() => this.changeView(true)}>Favorites</Button>
            </div>
          </Toolbar>
        </AppBar>
        <form>
          {this.state.is_favorites ? <Favorites favorite_list={this.state.favorite_list}/> :
            <WeatherDetails callback={(city_code, city_name, is_fav) => this.changeFav(city_code, city_name, is_fav)}/>}
        </form>
      </div>
    );
  }
}

export default App;