import { Button, Form, Divider, Select, Tooltip, InputNumber, DatePicker, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useScenarioGroups } from '@/hooks/scenario';
import moment from 'moment';
import styles from './index.less';

const { RangePicker } = DatePicker;

const Step1 = (props) => {
  const [form] = Form.useForm();
  //const { getFieldsValue } = form;
  const { dispatch, user, data = {} } = props;
  const {
    flowScenarios: flowScen,
    loadScenarios: loadScen,
    unsatScenarios: unsatScen,
    welltypeScenarios: welltypeScen,
  } = useScenarioGroups();

  loadScen.sort((a,b) => a.id - b.id);//sort scenarios by id
  welltypeScen.sort((a,b) => a.id - b.id);//sort scenarios by id
  
  const [isBAU, setBAU] = useState(data.hasOwnProperty('is_base') ? data.is_base : false);
  useEffect(() => {
    setBAU(data.hasOwnProperty('is_base') ? data.is_base : false);
  }, [data]);
  const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 25,
    },
  };
  const onSubmit = (values) => {
    dispatch({
      type: 'copyAndModifyModelForm/saveStepFormData',
      payload: {
        ...values,
        is_base: isBAU,
      },
    });
    // dispatch({
    //   type: 'copyAndModifyModelForm/saveCurrentStep',
    //   payload: isBAU ? 'Modify Info' : 'Modify Crops',
    // });
    dispatch({
      type: 'copyAndModifyModelForm/saveCurrentStep',
      payload: 'Modify Regions',
    });
  };

  // const onPrev = () => {
  //   if (dispatch) {
  //     const values = getFieldsValue();
  //     dispatch({
  //       type: 'copyAndModifyModelForm/saveStepFormData',
  //       payload: { ...values, is_base: isBAU },
  //     });
  //     dispatch({
  //       type: 'copyAndModifyModelForm/saveCurrentStep',
  //       payload: 'Select Regions',
  //     });
  //   }
  // };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        //className={styles.stepForm}
        className={'two-rows-label'}
        onFinish={onSubmit}
      >
        <Form.Item
          name="flow_scenario"
          label="Flow scenario"
          rules={[
            {
              required: true,
              message: 'Please select a flow scenario',
            },
          ]}
          initialValue={data.hasOwnProperty('flow_scenario') ? data.flow_scenario : undefined}
        >
          <Select>
            {flowScen.map((scen) => (
              <Select.Option value={scen.id} key={scen.id}>
                <>
                  {scen.name}{' '}
                  {scen.description ? (
                    <Tooltip title={scen.description}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  ) : null}
                </>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="load_scenario"
          label="Load scenario"
          rules={[
            {
              required: true,
              message: 'Please select a load scenario',
            },
          ]}
          initialValue={data.hasOwnProperty('load_scenario') ? data.load_scenario : undefined}
        >
          <Select>
            {loadScen.map((scen) => (
              <Select.Option value={scen.id} key={scen.id}>
                <>
                  {scen.name}{' '}
                  {scen.description ? (
                    <Tooltip title={scen.description}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  ) : null}
                </>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="welltype_scenario"
          label="Well Type scenario"
          rules={[
            {
              required: true,
              message: 'Please select a well type scenario',
            },
          ]}
          initialValue={data.hasOwnProperty('welltype_scenario') ? data.welltype_scenario : undefined}
        >
          <Select>
            {welltypeScen.map((scen) => (
              <Select.Option value={scen.id} key={scen.id}>
                <>
                  {scen.name}{' '}
                  {scen.description ? (
                    <Tooltip title={scen.description}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  ) : null}
                </>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="unsat_scenario"
          label="Unsaturated zone depth scenario"
          rules={[
            {
              required: true,
              message: 'Please select an unsat scenario',
            },
          ]}
          initialValue={data.hasOwnProperty('unsat_scenario') ? data.unsat_scenario : undefined}
        >
          <Select>
            {unsatScen.map((scen) => (
              <Select.Option value={scen.id} key={scen.id}>
                <>
                  {scen.name}{' '}
                  {scen.description ? (
                    <Tooltip title={scen.description}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  ) : null}
                </>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="water_content"
          label="Unsaturated zone effective water content"
          required={[
            {
              required: true,
              message: 'Please enter the water content',
            },
          ]}
          initialValue={data.hasOwnProperty('water_content') ? (parseFloat(data.water_content) * 100).toString() : 0}
        >
          <InputNumber min={0} max={200} formatter={(v) => `${v}%`} />
        </Form.Item>
        <Form.Item
          name="sim_end_year"
          label="Simulation ending year"
          required={[
            {
              required: true,
              message: 'Please enter numbers of years to simulate the scenario',
            },
          ]}
          initialValue={data.hasOwnProperty('sim_end_year') ? data.sim_end_year : moment('2100')}
        >
          <DatePicker
            picker="year"
            disabledDate={(current) =>
              current.isBefore(moment('2020'), 'year') || current.isAfter(moment('2500', 'year'))
            }
          />
        </Form.Item>
        <Form.Item label="Scenario type" required initialValue={isBAU}>
          <Radio.Group
            buttonStyle="solid"
            onChange={(event) => setBAU(event.target.value)}
            defaultValue={isBAU}
            value={isBAU}
          >
            <Radio.Button value={false}>Custom scenario</Radio.Button>
            <Radio.Button value>BAU scenario</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {!isBAU && (
          <>
            <Form.Item
              name="reduction_year"
              label="Transition period"
              dependencies={['sim_end_year']}
              rules={[
                {
                  required: true,
                  message: 'Please enter the reduction year',
                },
                ({ getFieldValue }) => ({
                  validator: (_, _value) => {
                    const sim_end_year = getFieldValue('sim_end_year');
                    if (!_value || _value.length <= 1) {
                      return Promise.resolve();
                    }
                    const [start_year, end_year] = _value;
                    if (end_year.isAfter(sim_end_year, 'year')) {
                      return Promise.reject('Reduction end year must not be after sim end year.');
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
              initialValue={
                data.hasOwnProperty('reduction_year') ? data.reduction_year : [undefined, undefined]
              }
            >
              <RangePicker
                picker="year"
                disabledDate={(current) => {
                  const end_year = form.getFieldValue('sim_end_year').clone();
                  end_year.add(1, 'y');
                  return (
                    current.isBefore(moment(), 'year') || current.isAfter(moment(end_year, 'year'))
                  );
                }}
              />
            </Form.Item>
          </>
        )}
        <Form.Item
          style={{
            marginBottom: 8,
          }}
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
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
                    'flow_scenario',
                    'load_scenario',
                    'welltype_scenario',
                    'unsat_scenario',
                    'water_content',
                    'sim_end_year',
                    'reduction_year',
                  ]);
                }
              }}
            >
              Reset
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Button type="primary" htmlType="submit">
            Next
          </Button>
          {/* <Button
            onClick={onPrev}
            style={{
              marginLeft: 8,
            }}
          >
            Prev
          </Button> */}
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <div className={styles.desc}>
      <h3>Instructions</h3>
        <h4>Select Scenarios:</h4>
        <p>
          Hover on the info circle to see detailed explanation about the scenario. Scenario chosen
          will determine the number of wells and the type and number of crops in subsequent menus.
        </p>
        <h4>Simulation ending year:</h4>
        <p>
          Enter the last year of the scenario simulation run. 
          By default, this will be the year 2100. It can be no later than the year 2500.
        </p>
        <h4>Transition period:</h4>
        <p>
          This is the beginning year and final year of the transition from the current 
          Bussiness-As-Usual(BAU) to the new nitrate loadig scenario. 
          Typically would from a year within the next five years and end in a year 
          about 15 to 25 years from now.
        </p>
        <h4>Unsaturated zone effective water content:</h4>
        <p>
          This refers to the effective water content for the unsaturated zone. 
          The smaller the effective water content, the faster the travel time through the 
          unsaturated zone. When choosing "0%", the travel time through the unsaturated zone is 
          ignored and all nitrate loading is instantaneously applied to the water table. 
          A recommended range for the effective water content is 5% - 10%.
        </p>
        <h4>BAU:</h4>
        <p>
          "Business-As-Usual" refers to the continuation of past and current practices well into the 
          future, without notable changes in nitrate leaching.
        </p>
        <h4>Other selections:</h4>
        <p>Under development</p>
      </div>
    </>
  );
};

export default connect(({ user, copyAndModifyModelForm }) => ({
  user: user.currentUser,
  data: copyAndModifyModelForm.step,
}))(Step1);
