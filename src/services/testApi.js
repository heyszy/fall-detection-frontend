import { request } from 'umi';

export async function getCurrentWeather(location) {
  return request(
    'https://devapi.qweather.com/v7/weather/now?key=6a020f4624704075a4f13747a64d1e5d',
    {
      method: 'GET',
      params: { location },
    },
  );
}

export async function getCurrentCity(location) {
  return request(
    'https://geoapi.qweather.com/v2/city/lookup?key=6a020f4624704075a4f13747a64d1e5d',
    {
      method: 'GET',
      params: { location },
    },
  );
}
