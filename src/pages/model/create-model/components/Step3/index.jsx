import { Button, Form, Divider, Input, InputNumber, DatePicker, Select } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import styles from './index.less';

const Step3 = props => {
  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  const { dispatch, user, data = {} } = props;
  const { TextArea } = Input;
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
      payload: { ...values },
    });
    dispatch({
      type: 'createModelForm/saveCurrentStep',
      payload: 'Results',
    });
    dispatch({
      type: 'createModelForm/createModel',
      payload: { ...data, ...user, ...values }
    })
  }

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'createModelForm/saveStepFormData',
        payload: { ...values },
      });
      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Select Crops',
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
          name="model-name"
          label="Model name"
          rules={[
            {
              required: true,
              message: 'Please enter the model name'
            }
          ]}
          initialValue={data.hasOwnProperty('model-name') ? data['model-name'] : undefined}
        >
          <Input placeholder="model name"/>
        </Form.Item>
        <Form.Item
          name="model-desc"
          label="Description"
          initialValue={data.hasOwnProperty('model-desc') ? data['model-desc'] : undefined}
        >
          <TextArea rows={4}/>
        </Form.Item>
        <Form.Item
          name="n_years"
          label="Years to stimulate"
          required={[
            {
              required: true,
              message: 'Please enter numbers of years to stimulate the model'
            }
          ]}
          initialValue={data.hasOwnProperty('n_years') ? data.n_years : undefined}
        >
          <InputNumber min={100} max={500}/>
        </Form.Item>
        <Form.Item
          name="reduction_year"
          label="Reduction year"
          required={[
            {
              required: true,
              message: 'Please enter the reduction year'
            }
          ]}
          initialValue={data.hasOwnProperty('reduction_year') ? data.reduction_year : undefined}
        >
          <DatePicker picker="year"/>
        </Form.Item>
        <Form.Item
          name="water_content"
          label="Water content"
          required={[
            {
              required: true,
              message: 'Please enter the water content'
            }
          ]}
          initialValue={data.hasOwnProperty('water_content') ? data.water_content : 0}
        >
          <InputNumber
            min={0}
            max={100}
            formatter={v => `${v}%`}
          />
        </Form.Item>
        <Form.Item
          name="scenario_name"
          label="Scenario"
          required={[
            {
              required: true,
              message: 'Please choose a scenario'
            }
          ]}
          initialValue={data.hasOwnProperty('scenario_name') ? data.scenario_name : undefined}
        >
          <Select>
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
        <h4>Model name</h4>
        <p>
          Enter a model name, limited 255 characters.
        </p>
        <h4>Model description</h4>
        <p>
          Enter model optional description, no characters limit.
        </p>
        <h4>Years to stimulate</h4>
        <p>
          Enter The number of years to simulate. For the time being this should not be less than 100 and no more than 500.
        </p>
        <h4>Reduction year</h4>
        <p>
          The year to start the reduction.
        </p>
        <h4>Water content</h4>
        <p>
          This is the unsaturated zone mobile water content.
        </p>
        <h4>Scenario</h4>
        <p>
          This is a name that would correspond to steady state model/period.
        </p>
        <h4>Other selections</h4>
        <p>
          Developing...
        </p>
      </div>
    </>
  );
};

export default connect(({ user, createModelForm }) => ({
  user: user.currentUser,
  data: createModelForm.step
}))(Step3);
