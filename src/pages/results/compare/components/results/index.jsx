import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { Anchor, Button, Card, Descriptions, Steps, Tabs, Tooltip } from 'antd';
import React from 'react';
import styles from './style.less';


const BaseComparison = ({ info }) => {
  return (
    <PageHeaderWrapper
      title="Base model comparison"
      subTitle="Compare a custom model with the base model under same scenario"
    >
      <div className={styles.main}>
        <Card>

        </Card>
      </div>
    </PageHeaderWrapper>
  )
};

export default BaseComparison;
