import React, { useEffect, useState } from 'react';
import { Tabs, Divider, Form, Button } from 'antd';
import { connect } from 'react-redux';
import { REGION_MACROS } from '@/services/region';
import { renderRegionFormItem } from '@/pages/model/components/RegionFormItem/createModelForms';
import styles from './index.less';

const { TabPane } = Tabs;

const Step1 = (props) => {
  const [form] = Form.useForm();
  const style = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };
  const { region = REGION_MACROS.CENTRAL_VALLEY, dispatch } = props;
  const [regionFormItem, setFormItem] = useState(null);
  const [tabKey, setTabKey] = useState(region.toString());
  useEffect(() => {
    setFormItem(renderRegionFormItem(tabKey));
  }, [tabKey]);
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
      <Tabs tabPosition="top" centered activeKey={tabKey} onChange={(key) => setTabKey(key)}>
        <TabPane tab="Central Valley" key={REGION_MACROS.CENTRAL_VALLEY.toString()} />
        <TabPane tab="Basin" key={REGION_MACROS.SUB_BASIN.toString()} />
        <TabPane tab="County" key={REGION_MACROS.COUNTY.toString()} />
        <TabPane tab="B118 Basin" key={REGION_MACROS.B118_BASIN.toString()} />
        <TabPane tab="Subregions" key={REGION_MACROS.CVHM_FARM.toString()} />
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

export default connect(({ createModelForm }) => ({
  region: createModelForm.step.step1Type,
}))(Step1);
