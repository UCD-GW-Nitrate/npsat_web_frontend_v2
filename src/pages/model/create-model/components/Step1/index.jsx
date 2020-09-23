import React from 'react';
import { Tabs, Divider } from 'antd';
import { connect } from 'react-redux';
import FarmForm from '@/pages/model/create-model/components/Step1/components/FarmForm';
import styles from './index.less';
import CountyForm from './components/CountyForm';
import CentralValleyForm from './components/CentralValleyForm';

const { TabPane } = Tabs;

const Step1 = (props) => {
  const { dispatch, token, region = 'CV' } = props;
  const onSubmit = (type, values) => {
    if (dispatch) {
      switch (type) {
        // extensible
        case 'CV':
          dispatch({
            type: 'createModelForm/saveStepFormData',
            payload: {
              step1Type: type,
              ...values,
            },
          });
          break;
        case 'farm':
          dispatch({
            type: 'createModelForm/saveStepFormData',
            payload: {
              step1Type: type,
              ...values,
            },
          });
          break;
        default:
        case 'county':
          dispatch({
            type: 'createModelForm/saveStepFormData',
            payload: {
              step1Type: type,
              ...values,
            },
          });
      }

      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Select Crops',
      });
    }
  };
  return (
    <>
      <Tabs defaultActiveKey={region} tabPosition="top" centered>
        <TabPane tab="Central Valley" key="CV">
          <CentralValleyForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="County" key="county">
          <CountyForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="B118 Basin" key="Basin" disabled>
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="CVHM Farm" key="farm">
          <FarmForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="Subbasin" key="sBasin" disabled>
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
        <p>Choose the type of regions.</p>
        <p>Choose region(s) on the map or in the dropdown list.</p>
        <p>Click Next to continue selecting other model parameters.</p>
      </div>
    </>
  );
};

export default connect(({ user, createModelForm }) => ({
  token: user.currentUser.token,
  region: createModelForm.step.step1Type,
}))(Step1);
