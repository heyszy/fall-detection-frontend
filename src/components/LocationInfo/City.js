import React from 'react';
import { useModel } from 'umi';
import 'qweather-icons/font/qweather-icons.css';

import { EnvironmentOutlined } from '@ant-design/icons';

const City = () => {
  const { city } = useModel('location');

  const icon = () => <i className="qi-301" style={{ fontSize: '1em' }}></i>;

  return (
    <div key="city">
      <EnvironmentOutlined />
      <span>{city.location ? city.location[0].name : ''}</span>
    </div>
  );
};

export default City;
