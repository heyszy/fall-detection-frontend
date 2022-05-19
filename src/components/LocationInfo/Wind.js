import React, { useEffect } from 'react';
import { useModel } from 'umi';
import 'qweather-icons/font/qweather-icons.css';

import Icon from '@ant-design/icons';

const Wind = () => {
  const { weather } = useModel('location');

  const icon = () => <i className="qi-1602" />;

  return (
    <div key="wind">
      <Icon component={icon} style={{ position: 'relative', top: '-2px' }} />
      <span>{`${weather?.now?.windDir || ''} ${weather?.now?.windScale || ''}级`}</span>
    </div>
  );
};

export default Wind;
