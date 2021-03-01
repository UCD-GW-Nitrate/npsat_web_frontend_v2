import React from 'react';
import { Tabs, Divider } from 'antd';
import { connect } from 'react-redux';
import {
  FarmForm,
  CentralValleyForm,
  BasinForm,
  B118BasinForm,
  TownshipForm,
  CountyForm,
} from '@/pages/model/components/RegionForm/createModelForms';
import { REGION_MACROS } from '@/services/region';
import styles from './index.less';

const { TabPane } = Tabs;

const Step1 = (props) => {
  const { dispatch, token, region = REGION_MACROS.CENTRAL_VALLEY } = props;
  const onSubmit = (type, values) => {
    if (dispatch) {
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
  };
  return (
    <>
      <Tabs defaultActiveKey={region.toString()} tabPosition="top" centered>
        <TabPane tab="Central Valley" key={REGION_MACROS.CENTRAL_VALLEY.toString()}>
          <CentralValleyForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="Basin" key={REGION_MACROS.SUB_BASIN.toString()}>
          <BasinForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="County" key={REGION_MACROS.COUNTY.toString()}>
          <CountyForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="B118 Basin" key={REGION_MACROS.B118_BASIN.toString()}>
          <B118BasinForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="CVHM Farm" key={REGION_MACROS.CVHM_FARM.toString()}>
          <FarmForm onSubmit={onSubmit} />
        </TabPane>
        <TabPane tab="Township" key={REGION_MACROS.TOWNSHIPS.toString()}>
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
