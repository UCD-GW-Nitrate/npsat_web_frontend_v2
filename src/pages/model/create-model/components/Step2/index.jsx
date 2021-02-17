import { Button, Form, Divider, Select, Tooltip, InputNumber, DatePicker } from 'antd';
import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useScenarioGroups } from '@/hooks/scenario';
import moment from 'moment';
import styles from './index.less';

const { RangePicker } = DatePicker;

const Step2 = (props) => {
  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  const { dispatch, user, data = {} } = props;
  const {
    flowScenarios: flowScen,
    loadScenarios: loadScen,
    unsatScenarios: unsatScen,
  } = useScenarioGroups();
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
      type: 'createModelForm/saveStepFormData',
      payload: {
        ...values,
      },
    });
    dispatch({
      type: 'createModelForm/saveCurrentStep',
      payload: 'Select Crops',
    });
  };

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'createModelForm/saveStepFormData',
        payload: { ...values },
      });
      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Select Regions',
      });
    }
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        onFinish={onSubmit}
      >
        <Form.Item
          name="flow_scenario"
          label="Flow Scenario"
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
          label="Load Scenario"
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
          name="unsat_scenario"
          label="Unsat Scenario"
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
          name="sim_end_year"
          label="Sim end year"
          required={[
            {
              required: true,
              message: 'Please enter numbers of years to stimulate the model',
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
        <Form.Item
          name="reduction_year"
          label="Reduction period"
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
            data.hasOwnProperty('reduction_year')
              ? data.reduction_year
              : [undefined, undefined]
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
        <Form.Item
          name="water_content"
          label="Water content"
          required={[
            {
              required: true,
              message: 'Please enter the water content',
            },
          ]}
          initialValue={data.hasOwnProperty('water_content') ? data.water_content : 0}
        >
          <InputNumber min={0} max={200} formatter={(v) => `${v}%`} />
        </Form.Item>
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
          <Button type="primary" htmlType="submit">
            Next
          </Button>
          <Button
            onClick={onPrev}
            style={{
              marginLeft: 8,
            }}
          >
            Prev
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
        <h4>Select Scenarios</h4>
        <p>
          Hover on the info circle to see detailed explanation about the scenario. Scenario chosen
          will determine type and number of crops in next step.
        </p>
        <h4>Sim end year</h4>
        <p>Enter simulation end year default to 2100. Selectable range from 2020 to 2500.</p>
        <h4>Reduction period</h4>
        <p>The year to start the reduction and the year to reach the full reduction.</p>
        <h4>Water content</h4>
        <p>This is the unsaturated zone mobile water content, default to 0.</p>
        <h4>Other selections</h4>
        <p>Developing...</p>
      </div>
    </>
  );
};

export default connect(({ user, createModelForm }) => ({
  user: user.currentUser,
  data: createModelForm.step,
}))(Step2);
