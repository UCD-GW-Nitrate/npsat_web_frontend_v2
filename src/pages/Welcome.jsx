import React from 'react';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <div>
    <Card>
      <Alert
        message="Welcome, npsat now is available"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Alert
        message="10 of your scenarios has completed running"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Alert
        message="2 of your scenarios is running"
        type="warning"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Alert
        message="0 of your scenarios fail"
        type="error"
        showIcon
        banner
        style={{
          margin: -12,
        }}
      />
    </Card>
  </div>
);
