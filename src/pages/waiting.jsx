import { Spin } from 'antd';
import React from 'react';

const WaitingSpin = () => (
  <div
    style={{
      'textAlign': 'center'
    }}
  >
    <Spin />
    <p>
      processing...
    </p>
  </div>
)

export default WaitingSpin;
