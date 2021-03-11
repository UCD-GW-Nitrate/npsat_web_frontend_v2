import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { REGION_MACROS } from '@/services/region';
import { Button, Divider, Form, Tabs, Tooltip } from 'antd';
import { CopyModelB118BasinFormItem as B118BasinFormItem } from '@/pages/model/components/RegionFormItem/B118BasinFormItem';
import { CopyModelBasinFormItem as BasinFormItem } from '@/pages/model/components/RegionFormItem/BasinFormItem';
import { CopyModelCountyFormItem as CountyFormItem } from '@/pages/model/components/RegionFormItem/CountyFormItem';
import { CopyModelFarmFormItem as FarmFormItem } from '@/pages/model/components/RegionFormItem/FarmFormItem';
import { CopyModelTownshipFormItem as TownshipFormItem } from '@/pages/model/components/RegionFormItem/TownshipFormItem';
import CentralValleyFormItem from '@/pages/model/components/RegionFormItem/CentralValleyFormItem';
import styles from './index.less';

const { TabPane } = Tabs;

const renderRegionFormItem = (key) => {
  switch (key) {
    case REGION_MACROS.TOWNSHIPS.toString():
      return <TownshipFormItem />;
    case REGION_MACROS.CVHM_FARM.toString():
      return <FarmFormItem />;
    case REGION_MACROS.COUNTY.toString():
      return <CountyFormItem />;
    case REGION_MACROS.SUB_BASIN.toString():
      return <BasinFormItem />;
    case REGION_MACROS.B118_BASIN.toString():
      return <B118BasinFormItem />;
    case REGION_MACROS.CENTRAL_VALLEY:
    default:
      return <CentralValleyFormItem />;
  }
};

/**
 * At this step, the user can select settings and maps for the new model.
 * Target model info will be pre-filled for the user and
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step1 = (props) => {
  const { targetModel, dispatch } = props;
  const getRegionType = (template) => {
    return template.regions[0].region_type;
  };
  const [form] = Form.useForm();
  const style = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };
  const { region = getRegionType(targetModel) } = props;
  const [regionFormItem, setFormItem] = useState(null);
  const [tabKey, setTabKey] = useState(region.toString());
  useEffect(() => {
    setFormItem(renderRegionFormItem(tabKey));
  }, [tabKey]);
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
      <Tabs tabPosition="top" centered activeKey={tabKey} onChange={(key) => setTabKey(key)}>
        <TabPane tab="Central Valley" key={REGION_MACROS.CENTRAL_VALLEY.toString()} />
        <TabPane tab="Basin" key={REGION_MACROS.SUB_BASIN.toString()} />
        <TabPane tab="County" key={REGION_MACROS.COUNTY.toString()} />
        <TabPane tab="B118 Basin" key={REGION_MACROS.B118_BASIN.toString()} />
        <TabPane tab="CVHM Farm" key={REGION_MACROS.CVHM_FARM.toString()} />
        <TabPane tab="Township" key={REGION_MACROS.TOWNSHIPS.toString()} />
      </Tabs>
      <Form
        form={form}
        {...style}
        className={styles.stepForm}
        onFinish={(values) => onSubmit(parseInt(tabKey, 10), values)}
      >
        {regionFormItem}
        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: style.wrapperCol.span,
              offset: style.labelCol.span,
            },
          }}
        >
          <Button type="primary" htmlType="submit">
            Next
          </Button>
          <Divider type="vertical" />
          <Tooltip title="Reset selections in this step to target model selections.">
            <Button
              danger
              onClick={() => {
                // dispatch is a synced method by redux
                if (dispatch) {
                  dispatch({
                    type: 'copyAndModifyModelForm/loadTemplateAtStep',
                  });
                  form.resetFields([
                    `region-${REGION_MACROS.SUB_BASIN}-choice`,
                    `region-${REGION_MACROS.TOWNSHIPS}-choice`,
                    `region-${REGION_MACROS.CVHM_FARM}-choice`,
                    `region-${REGION_MACROS.COUNTY}-choice`,
                    `region-${REGION_MACROS.B118_BASIN}-choice`,
                  ]);
                  setTabKey(region.toString());
                }
              }}
            >
              Reset
            </Button>
          </Tooltip>
        </Form.Item>
      </Form>
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
