import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { REGION_MACROS } from '@/services/region';
import { Button, Divider, Form, Switch, Tabs, Tooltip } from 'antd';
import { renderRegionFormItem } from '@/pages/model/components/RegionFormItem/copyAndModifyForms';
import RangeFormItem from '@/pages/model/components/RangeFormItem';
import { DEPTH_RANGE_CONFIG, SCREEN_LENGTH_RANGE_CONFIG } from '@/services/model';
import styles from './index.less';

const { TabPane } = Tabs;

/**
 * At this step, the user can select settings and maps for the new model.
 * Target model info will be pre-filled for the user and
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step2 = (props) => {
  const { targetModel, dispatch, data } = props;
  console.log("targetModel: ", targetModel);
  console.log("data: ", data);
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
  const {
    step2Type: region = Type(targetModel),
    regionFilter = targetModel.regionFilter,
  } = data;
  const [filter, setFilter] = useState(regionFilter);
  const [regionFormItem, setFormItem] = useState(null);
  const [tabKey, setTabKey] = useState(data.welltype_scenario === 12 ? REGION_MACROS.TOWNSHIPS.toString():region.toString());
  useEffect(() => {
    setFormItem(renderRegionFormItem(tabKey));
  }, [tabKey]);
  const onSubmit = (type, values) => {
    if (dispatch) {
      dispatch({
        type: 'copyAndModifyModelForm/saveStepFormData',
        payload: {
          step2Type: type,
          ...values,
          regionFilter: filter,
        },
      });
    }
    // dispatch({
    //   type: 'copyAndModifyModelForm/saveCurrentStep',
    //   payload: 'Modify Settings',
    // });
    const isBAU = data.hasOwnProperty('is_base') ? data.is_base : false;
    dispatch({
      type: 'copyAndModifyModelForm/saveCurrentStep',
      payload: isBAU ? 'Modify Info' : 'Modify Crops',
    });
  };

  const onPrev = () => {
    if (dispatch) {
      //const values = getFieldsValue();
      // dispatch({
      //   type: 'createModelForm/saveStepFormData',
      //   payload: { ...values, is_base: isBAU },
      // });
      dispatch({
        type: 'copyAndModifyModelForm/saveCurrentStep',
        payload: 'Modify Settings',
      });
    }
  };

  const onChange = (changedValues, allValues) => {
    console.log("changed values", changedValues);
    console.log('all values', allValues);
    if (dispatch) {
      
        dispatch({
          type: 'copyAndModifyModelForm/saveStepFormData',
          payload: {
            depth_range: [0,3001],
            screen_length_range: [0,1501],
            ...allValues,
            regionFilter: filter,
            modifiedRegions: allValues,
          },
        });
        //disable filter once it is switched off
        if(changedValues.advanced_filter === false){
          dispatch({
            type: 'copyAndModifyModelForm/saveStepFormData',
            payload: {
              ...allValues,
              regionFilter: filter,
              depth_range: [0,3001],
              screen_length_range: [0,1501],
            },
          });
        }
    }
  }

  return (
    <>
      <Tabs tabPosition="top" centered activeKey={tabKey} onChange={(key) => setTabKey(key)}>
        <TabPane tab="Central Valley" key={REGION_MACROS.CENTRAL_VALLEY.toString()} disabled={data.welltype_scenario === 12 ? true:false}/>
        <TabPane tab="Basin" key={REGION_MACROS.SUB_BASIN.toString()} disabled={data.welltype_scenario === 12 ? true:false}/>
        <TabPane tab="County" key={REGION_MACROS.COUNTY.toString()} disabled={data.welltype_scenario === 12 ? true:false}/>
        <TabPane tab="B118 Basin" key={REGION_MACROS.B118_BASIN.toString()} disabled={data.welltype_scenario === 12 ? true:false}/>
        <TabPane tab="Subregions" key={REGION_MACROS.CVHM_FARM.toString()} disabled={data.welltype_scenario === 12 ? true:false}/>
        <TabPane tab="Township" key={REGION_MACROS.TOWNSHIPS.toString()} />
      </Tabs>
      <Form
        form={form}
        {...style}
        className={styles.stepForm}
        onFinish={(values) => onSubmit(parseInt(tabKey, 10), values)}
        onValuesChange={(changedValues, allValues) => onChange(changedValues, allValues)}
      >
        {regionFormItem}
        <Form.Item label="Advanced filter">
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
              label="Depth (ft)"
              name="depth_range"
              initialValue={data.hasOwnProperty('depth_range') ? data.depth_range : [0, 800]}
              rules={[
                {
                  validator: (_, value) => {
                    if (value[0] >= value[1]) {
                      console.log(value);
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
              label="ScreenLen (ft)"
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
          <Button
            onClick={onPrev}
            style={{
              marginLeft: 8,
            }}
          >
            Prev
          </Button>
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
                    'depth_range',
                    'screen_length_range',
                  ]);
                  setTabKey(region.toString());
                  setFilter(regionFilter);
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
  data: copyAndModifyModelForm.step,
}))(Step2);
