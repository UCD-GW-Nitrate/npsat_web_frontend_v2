import React from 'react';
import { Tabs, Divider } from 'antd';
import { connect } from 'react-redux';
import FarmForm from '@/pages/model/components/RegionForm/FarmForm';
import BasinForm from '@/pages/model/components/RegionForm/BasinForm';
import TownshipForm from '@/pages/model/components/RegionForm/TownshipForm';
import B118BasinForm from '@/pages/model/components/RegionForm/B118BasinForm';
import styles from '../../../components/RegionForm/index.less';
import CountyForm from '../../../components/RegionForm/CountyForm';
import CentralValleyForm from '../../../components/RegionForm/CentralValleyForm';

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
        default:
        case 'county':
        case 'farm':
        case 'basin':
        case 'sBasin':
        case 'township':
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
        payload: 'Select Settings',
      });
    }
  };
  return (
    <>
      <Tabs defaultActiveKey={region} tabPosition="top" centered>
        <TabPane tab="Central Valley" key="CV">
          <CentralValleyForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="Basin" key="sBasin">
          <BasinForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="County" key="county">
          <CountyForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="B118 Basin" key="Basin">
          <B118BasinForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="CVHM Farm" key="farm">
          <FarmForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="Township" key="town">
          <TownshipForm onSubmit={onSubmit} />
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
        <p>You can only select one type of region to create a model.</p>
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
