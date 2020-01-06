import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import '../../styles.css';

class Search extends React.Component {

  state = { cities_list: { } };

  displayOptions() {
    if (Object.keys(this.props.options).length) {
      return this.props.options.map((city) => {
        var key = city.split('/')[0];
        var name = city.split('/')[1];
        return (
          <div key={key} onClick={() => this.props.callback(name)}>
            <Typography>{name}</Typography>
          </div>
        );
      });
    }
    return null;
  }

  render() {
    return (
      <div>
        <Card>
          {this.displayOptions()}
        </Card>     
      </div>
    );
  }
}

export default Search;