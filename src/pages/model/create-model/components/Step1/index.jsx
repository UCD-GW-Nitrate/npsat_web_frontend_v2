import React from 'react';
import { Tabs, Divider } from 'antd';
import { connect } from 'react-redux';
import styles from './index.less';
import CountyForm from './components/CountyForm';
import CentralValleyForm from './components/CentralValleyForm';

const { TabPane } = Tabs;

const Step1 = props => {
  const { dispatch, token } = props;
  const onSubmit = (type, values) => {
    if (dispatch) {
      switch (type) {
        // extensible
        case "CV":
          dispatch({
            type: 'createModelForm/saveStepFormData',
            payload: {
              step1Type: type,
              ...values
            }
          });
          break;
        default:
        case "county":
          dispatch({
            type: 'createModelForm/saveStepFormData',
            payload: {
              step1Type: type,
              ...values
            }
          });
      }

      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Select Crops'
      })
    }
  }
  return (
    <>
      <Tabs defaultActiveKey="0" tabPosition="top" centered>
        <TabPane tab="Central Valley" key="0">
          <CentralValleyForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="County" key="1">
          <CountyForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="B118 Basin" key="2" disabled>
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Cvhm Farm" key="3" disabled>
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Subbasin" key="4" disabled>
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <div className={styles.desc}>
        <h3>Instructions</h3>
        <h4>Select a region or regions</h4>
        <p>
          Choose the type of regions.
        </p>
        <p>
          Choose region(s) on the map or in the dropdown list.
        </p>
        <p>
          Click Next to continue selecting other model parameters.
        </p>
      </div>
    </>
  );
};

export default connect(({ user }) => ({
  token: user.currentUser.token
}))(Step1);
