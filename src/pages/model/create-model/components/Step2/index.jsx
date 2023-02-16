import React, { useEffect, useState } from 'react';
import { Tabs, Divider, Form, Button, Switch } from 'antd';
import { connect } from 'react-redux';
import { REGION_MACROS } from '@/services/region';
import { renderRegionFormItem } from '@/pages/model/components/RegionFormItem/createModelForms';
import RangeFormItem from '@/pages/model/components/RangeFormItem';
import { DEPTH_RANGE_CONFIG, SCREEN_LENGTH_RANGE_CONFIG } from '@/services/model';
import styles from './index.less';


const { TabPane } = Tabs;

const Step2 = (props) => {
  const [form] = Form.useForm();
  const {getFieldsValue} = form;
  const style = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };
  const { data, dispatch } = props;
  const { step2Type: region = data.welltype_scenario === 12 ? REGION_MACROS.TOWNSHIPS:REGION_MACROS.CENTRAL_VALLEY, regionFilter = false } = data;
  const [filter, setFilter] = useState(regionFilter);
  const [regionFormItem, setFormItem] = useState(null);
  const [tabKey, setTabKey] = useState(region.toString());

  useEffect(() => {
    setFormItem(renderRegionFormItem(tabKey));
  }, [tabKey]);

  const onSubmit = (type, values) => {
    console.log('step 2 values', values);
    
    console.log('step 2 type', type);
    if (dispatch) {
      dispatch({
        type: 'createModelForm/saveStepFormData',
        payload: {
          step2Type: type,
          ...values,
          regionFilter: filter,
        },
      });
    }
    // dispatch({
    //   type: 'createModelForm/saveCurrentStep',
    //   payload: 'Select Settings',
    // });
    const isBAU = data.hasOwnProperty('is_base') ? data.is_base : false;
    dispatch({
      type: 'createModelForm/saveCurrentStep',
      payload: isBAU ? 'Model Info' : 'Select Crops',
    });
  };

  const onPrev = () => {
    if (dispatch) {
      // const values = getFieldsValue();
      // dispatch({
      //   type: 'createModelForm/saveStepFormData',
      //   payload: { ...values, is_base: isBAU },
      // });
      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Select Settings',
      });
    }
  };

  const onChange = (changedValues, allValues) => {
    console.log("changed values", changedValues);
    console.log('all values', allValues);
    console.log("data: ", data);
    if (dispatch) {
      
        dispatch({
          type: 'createModelForm/saveStepFormData',
          payload: {
            depth_range: [0,801],
            screen_length_range: [0,801],
            ...allValues,
            regionFilter: filter,
            regions: allValues,
          },
        });
        //disable filter once it is switched off
        if(changedValues.advanced_filter === false){
          dispatch({
            type: 'createModelForm/saveStepFormData',
            payload: {
              ...allValues,
              regionFilter: filter,
              depth_range: [0,801],
              screen_length_range: [0,801],
            },
          });
        }
      
    }
  }

  return (
    <>
      <Tabs tabPosition="top" centered activeKey={tabKey} onChange={(key) => setTabKey(key)}>
        <TabPane tab="Central Valley" key={REGION_MACROS.CENTRAL_VALLEY.toString()} disabled={data.welltype_scenario === 12 ? true:false} />
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
              label="Depth (m)"
              name="depth_range"
              initialValue={data.hasOwnProperty('depth_range') ? data.depth_range : [0, 801]}
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
              label="ScreenLen (m)"
              name="screen_length_range"
              initialValue={
                data.hasOwnProperty('screen_length_range') ? data.screen_length_range : [0, 801]
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
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <div className={styles.desc}>
        <h3>Instructions</h3>
        <h4>Select a region or regions:</h4>
        <p>Choose the type of regions.</p>
        <p>Choose region(s) on the map or in the dropdown list.</p>
        <p>Click Next to continue selecting other scenario parameters.</p>
        <p>
          Note: You can only select one type of region (e.g., “B118 Basin”), but within that type, any number
          regions (1 to all) can be selected. The number of wells in the selected region(s) is displayed on top of the
          map. The scenario simulations (including the BAU simulation) will evaluate nitrate concentrations at
          these wells and aggregate those into statistical results.
        </p>
        <p>
          The “Advanced filter” allows for selection of wells within a specific minimum and maximum well depth
          interval, and/or consider streamlines to well screens within a specific minimum and maximum screen
          depth interval. The number of wells to which the criteria apply within the selected region(s). This may
          affect the number of wells selected for the simulation, as shown above the map.
        </p>
        <p>
          “Basin”: select the Sacramento Valley, San Joaquin Valley, and Tulare Lake Basin (also known as the
          Southern San Joaquin Valley) watersheds overlying the Central Valley aquifer system.
        </p>
        <p>
          “County” – select specific counties
        </p>
        <p>
          “B118” – select groundwater sub-basins as defined by California Department of Water Resources’ Bulletin
          118 series.
        </p>
        <p>
          “Subregions” – select groundwater regions as defined by C2VSIM and CVHM (21 water accounting
          regions)
        </p>
        <p>
          “Township” – select specific townships, typically a 36 square mile area.
        </p>
      </div>
    </>
  );
};

export default connect(({ createModelForm }) => ({
  data: createModelForm.step,
}))(Step2);
