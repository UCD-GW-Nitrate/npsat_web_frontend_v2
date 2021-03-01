import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { REGION_MACROS } from '@/services/region';
import { Divider, Tabs } from 'antd';
import CentralValleyForm from '@/pages/model/components/RegionForm/CentralValleyForm';
import BasinForm from '@/pages/model/components/RegionForm/BasinForm';
import CountyForm from '@/pages/model/components/RegionForm/CountyForm';
import B118BasinForm from '@/pages/model/components/RegionForm/B118BasinForm';
import FarmForm from '@/pages/model/components/RegionForm/FarmForm';
import TownshipForm from '@/pages/model/components/RegionForm/TownshipForm';
import styles from '@/pages/model/create-model/components/Step1/index.less';

const { TabPane } = Tabs;

/**
 * At this step, the user can select settings and maps for the new model.
 * Target model info will be pre-filled for the user and
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step1 = (props) => {
  const { targetModel, dispatch, data, token } = props;
  const getRegionType = (template) => {
    return template.regions[0].region_type;
  };
  const onSubmit = (type, values) => {

  };
  const { region = getRegionType(targetModel) } = props;
  console.log(region)
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

export default connect(({ user, copyAndModifyModelForm }) => ({
  targetModel: copyAndModifyModelForm.targetModel,
  data: copyAndModifyModelForm.step,
  region: copyAndModifyModelForm.step.step1Type,
  token: user.currentUser.token,
}))(Step1);
