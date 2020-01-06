export const ADD_FAV = 'ADD_FAV'
export const REMOVE_FAV = 'REMOVE_FAV'


export function AddToFav(city_code, city_name) {
  return {
    type: ADD_FAV,
    city_name,
    city_code 
  }
}

export function RemoveFromFav(city_name) {
  return {
    type: REMOVE_FAV,
    city_name
  }
}
