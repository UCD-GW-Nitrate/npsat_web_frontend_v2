import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { REGION_MACROS } from '@/services/region';
import { Divider, Tabs } from 'antd';
import {
  FarmForm,
  CentralValleyForm,
  BasinForm,
  B118BasinForm,
  TownshipForm,
  CountyForm,
} from '@/pages/model/components/RegionForm/copyAndModifyForms';
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
  const { targetModel, dispatch } = props;
  console.log(targetModel);
  const getRegionType = (template) => {
    return template.regions[0].region_type;
  };
  const { region = getRegionType(targetModel) } = props;
  const [tabKey, setTabKey] = useState(region.toString());
  const loadDataFromTargetModel = () => {
    if (dispatch) {
      dispatch({
        type: 'copyAndModifyModelForm/loadTemplateAtStep',
      });
    }
  };
  useEffect(() => {
    loadDataFromTargetModel();
  }, [targetModel]);

  const onSubmit = (type, values) => {
    if (dispatch) {
      dispatch({
        type: 'copyAndModifyModelForm/saveStepFormData',
        payload: {
          step1Type: type,
          ...values,
        },
      });
    }
    dispatch({
      type: 'copyAndModifyModelForm/saveCurrentStep',
      payload: 'Modify Settings',
    });
  };

  return (
    <>
      <Tabs activeKey={tabKey} tabPosition="top" centered onChange={(key) => setTabKey(key)}>
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

export default connect(({ copyAndModifyModelForm }) => ({
  targetModel: copyAndModifyModelForm.targetModel,
  region: copyAndModifyModelForm.step.step1Type,
}))(Step1);
