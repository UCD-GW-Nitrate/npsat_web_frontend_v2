import React, { useEffect, useState } from 'react';
import { Tabs, Divider, Form, Button, Switch } from 'antd';
import { connect } from 'react-redux';
import { REGION_MACROS } from '@/services/region';
import { renderRegionFormItem } from '@/pages/model/components/RegionFormItem/createModelForms';
import RangeFormItem from '@/pages/model/components/RangeFormItem';
import { DEPTH_RANGE_CONFIG, SCREEN_LENGTH_RANGE_CONFIG } from '@/services/model';
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
  const { data, dispatch } = props;
  const { step1Type: region = REGION_MACROS.CENTRAL_VALLEY, regionFilter = false } = data;
  const [filter, setFilter] = useState(regionFilter);
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
          regionFilter: filter,
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
        <Form.Item label="Advanced filter" name="advanced_filter">
          <Switch
            checkedChildren="on"
            unCheckedChildren="off"
            checked={filter}
            onClick={(checked) => setFilter(checked)}
          />
        </Form.Item>
        {filter ? (
          <>
            <Form.Item
              label="Depth range"
              name="depth_range"
              initialValue={data.hasOwnProperty('depth_range') ? data.depth_range : [0, 800]}
              rules={[
                {
                  validator: (_, value) => {
                    if (value[0] >= value[1]) {
                      return Promise.reject('Range min should be less than max');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <RangeFormItem rangeConfig={DEPTH_RANGE_CONFIG} />
            </Form.Item>
            <Form.Item
              label="ScreenLen range"
              name="screen_length_range"
              initialValue={
                data.hasOwnProperty('screen_length_range') ? data.screen_length_range : [0, 800]
              }
              rules={[
                {
                  validator: (_, value) => {
                    if (value[0] >= value[1]) {
                      return Promise.reject('Range min should be less than max');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <RangeFormItem rangeConfig={SCREEN_LENGTH_RANGE_CONFIG} />
            </Form.Item>
          </>
        ) : null}
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
  data: createModelForm.step,
}))(Step1);
