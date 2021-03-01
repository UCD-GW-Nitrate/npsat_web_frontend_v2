import React from 'react';
import { Alert, Button, Space } from 'antd';

const ResetAlert = ({ reset }) => <Alert message="Reset selection" type="info"
  onClose={() => reset()} closable closeText="Reset"
/>

export default ResetAlert;
