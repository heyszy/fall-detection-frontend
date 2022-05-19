import React, { useEffect } from 'react';
import { useModel } from 'umi';
import 'qweather-icons/font/qweather-icons.css';

import Icon from '@ant-design/icons';

const Weather = () => {
  const { weather, getLocationInfo } = useModel('location');
  useEffect(async () => {
    await getLocationInfo();
  }, []);

  const icon = () => <i className={`qi-${weather?.now?.icon}`} />;

  return (
    <div key="weather">
      <Icon component={icon} style={{ position: 'relative', top: '-2px' }} />
      <span>{`${weather?.now?.text || ''} ${weather?.now?.temp || ''}℃`}</span>
    </div>
  );
};

export default Weather;
