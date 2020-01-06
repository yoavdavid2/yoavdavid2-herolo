import { combineReducers } from 'redux';

import { ADD_FAV, REMOVE_FAV } from '../actions';

const initialState = {
  fav_list: [],
};

const changeFavList = (state = initialState, action) => {
  var copy_list = {...state};
  switch (action.type) {
    case ADD_FAV:
      copy_list[action.city_name] = action.city_code;
      return copy_list;
    case REMOVE_FAV:
      delete copy_list[action.city_name];
      return copy_list;
    default:
      return state;

  }
}

export default combineReducers({
  change_fav: changeFavList
});