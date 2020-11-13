import { Button, Form, Divider, Select, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { SCENARIO_MACROS, getScenarios } from '@/services/scenario';
import styles from './index.less';

const Step2 = (props) => {
  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  const { dispatch, user, data = {} } = props;
  const [flowScen, setFlowScen] = useState([]);
  const [loadScen, setLoadScen] = useState([]);
  const [unsatScen, setUnsatScen] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await getScenarios();
      const tempFlow = [];
      const tempLoad = [];
      const tempUnsat = [];
      results.forEach((scen) => {
        switch (scen.scenario_type) {
          case SCENARIO_MACROS.TYPE_LOAD:
            tempLoad.push(scen);
            break;
          case SCENARIO_MACROS.TYPE_UNSAT:
            tempUnsat.push(scen);
            break;
          default:
          case SCENARIO_MACROS.TYPE_FLOW:
            tempFlow.push(scen);
        }
      });
      setFlowScen(tempFlow);
      setLoadScen(tempLoad);
      setUnsatScen(tempUnsat);
    })();
  }, []);
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
            Submit
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
      </div>
    </>
  );
};

export default connect(({ user, createModelForm }) => ({
  user: user.currentUser,
  data: createModelForm.step,
}))(Step2);
