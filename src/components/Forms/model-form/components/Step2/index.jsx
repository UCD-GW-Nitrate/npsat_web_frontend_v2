import React, { useEffect, useState } from 'react';
import { Tabs, Divider, Form, Button, Switch, Tooltip } from 'antd';
import { REGION_MACROS } from '@/services/region';
import { renderRegionFormItem } from '@/pages/model/components/RegionFormItem/createModelForms';
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
const Step2 = ({ targetModel, dispatch, data, isEditing }) => {
  console.log("target model2:", targetModel);
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
    step2Type: region = targetModel 
      ?? data.welltype_scenario === 12 
      ? REGION_MACROS.TOWNSHIPS
      : REGION_MACROS.CENTRAL_VALLEY,
    regionFilter = targetModel?.regionFilter ?? false,
  } = data;
  const [filter, setFilter] = useState(regionFilter);
  const [regionFormItem, setFormItem] = useState(null);
  const [tabKey, setTabKey] = useState(region.toString());

  useEffect(() => {
    setFormItem(renderRegionFormItem(tabKey));
  }, [tabKey]);

  const onSubmit = (type, values) => {
    if (dispatch) {
      dispatch({
        type: isEditing ? 'copyAndModifyModelForm/saveStepFormData' : 'createModelForm/saveStepFormData',
        payload: {
          step2Type: type,
          ...values,
          regionFilter: filter,
        },
      });
    }
    const isBAU = data.hasOwnProperty('is_base') ? data.is_base : false;

    if (isEditing) {
      console.log("step 2 modify");
      dispatch({
        type: 'copyAndModifyModelForm/saveCurrentStep',
        payload: isBAU ? 'Modify Info' : 'Modify Crops',
      });
    } else {
      console.log("step 2 create");
      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: isBAU ? 'Model Info' : 'Select Crops',
      });
    }
  };

  const onPrev = () => {
    if (dispatch) {
      if (isEditing) {
        dispatch({
          type: 'copyAndModifyModelForm/saveCurrentStep',
          payload: 'Modify Settings',
        });
      } else {
        dispatch({
          type: 'createModelForm/saveCurrentStep',
          payload: 'Select Settings',
        });
      }
    }
  };

  const onChange = (changedValues, allValues) => {
    if (dispatch) {
      if (isEditing) {
        dispatch({
          type: 'copyAndModifyModelForm/saveStepFormData',
          payload: {
            depth_range: [0,801],
            screen_length_range: [0,801],
            ...allValues,
            regionFilter: filter,
            modifiedRegions: allValues,
          },
        });
        // disable filter once it is switched off
        if(changedValues.advanced_filter === false){
          dispatch({
            type: 'copyAndModifyModelForm/saveStepFormData',
            payload: {
              ...allValues,
              regionFilter: filter,
              depth_range: [0,801],
              screen_length_range: [0,801],
            },
          });
        }
      } else {
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
        // disable filter once it is switched off
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
  };

  return (
    <>
      <Tabs tabPosition="top" centered activeKey={tabKey} onChange={(key) => setTabKey(key)}>
        <TabPane tab="Central Valley" key={REGION_MACROS.CENTRAL_VALLEY.toString()} disabled={data.welltype_scenario === 12} />
        <TabPane tab="Basin" key={REGION_MACROS.SUB_BASIN.toString()} disabled={data.welltype_scenario === 12}/>
        <TabPane tab="County" key={REGION_MACROS.COUNTY.toString()} disabled={data.welltype_scenario === 12}/>
        <TabPane tab="B118 Basin" key={REGION_MACROS.B118_BASIN.toString()} disabled={data.welltype_scenario === 12}/>
        <TabPane tab="Subregions" key={REGION_MACROS.CVHM_FARM.toString()} disabled={data.welltype_scenario === 12}/>
        <TabPane tab="Township" key={REGION_MACROS.TOWNSHIPS.toString()} />
      </Tabs>
      <Form
        form={form}
        {...style}
        className={styles.stepForm}
        onFinish={(values) => onSubmit(parseInt(tabKey), values)}
        onValuesChange={(changedValues, allValues) => onChange(changedValues, allValues)}
      >
        {regionFormItem}
        <Form.Item label="Advanced filter" name="advanced_filter" /* Changed */>
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
                      return Promise.reject(new Error('Range min should be less than max'));
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
                      return Promise.reject(new Error('Range min should be less than max'));
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
          {isEditing && <>
            <Divider type="vertical" />
            <Tooltip title="Reset selections in this step to target scenario selections.">
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
          </>}
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
          depth interval. This may affect the number of wells selected for the simulation, as shown above the map.
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

export default Step2;
