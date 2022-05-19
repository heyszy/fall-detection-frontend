import { useState, useCallback } from 'react';
import { getCurrentCity, getCurrentWeather } from '@/services/testApi';

export default () => {
  const [city, setCity] = useState({});
  const [weather, setWeather] = useState({});
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = async (pos) => {
    const { coords } = pos;
    const { longitude, latitude } = coords;
    const param = longitude + ',' + latitude;
    let city = await getCurrentCity(param);
    setCity(city);
    let weather = await getCurrentWeather(param);
    setWeather(weather);
  };

  const error = (err) => {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  const getLocationInfo = useCallback(async () => {
    if ('geolocation' in navigator) {
      /* 地理位置服务可用 */
      const { geolocation } = navigator;
      geolocation.getCurrentPosition(success, error, options);
    } else {
      /* 地理位置服务不可用 */
      alert('天气信息不可用');
    }
  }, []);
  return { city, weather, getLocationInfo };
};
