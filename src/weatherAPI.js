const apiKey = 'YuQy0e38cZ8zcLOzLsEoQZALx8mFAVZE';
//'lB93giYbYMgzTngoCqgk8x0dSVTucyTF'; 
 
export async function requestWeatherDetails(city_code){
  if (city_code !== null && city_code !== undefined) {
    return fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${city_code}?apikey=${apiKey}`
      ).then((response) => { return response.json() })
    .then((data) => {
      return data;
    })
  }
  return {};
}

export async function requestFiveDayPrediction(city_code) {
  var forecast = null;
  if (city_code !== null && city_code !== undefined) {
    forecast = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city_code}?apikey=${apiKey}&metric=true`
      ).then((response) => { return response.json() })
    .then((data) => {
      return data;
    });
  }
  return forecast;
}

export async function getCitiesList(city_name) {
  var new_data = { };
  if (city_name !== null && city_name !== undefined && city_name !== "") {
    new_data = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city_name}`
    ).then((response) => { return response.json() })
    .then((data) => {
      return data.map((city, index) => {
        return `${city.Key}/${city.LocalizedName}, ${city.AdministrativeArea.LocalizedName}, ${city.Country.LocalizedName}`;
      })
    })
  }
  return new_data;
}