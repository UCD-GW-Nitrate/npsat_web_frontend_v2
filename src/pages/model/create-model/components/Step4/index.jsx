import { Button, Form, Divider, Input } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import styles from './index.less';

const Step4 = (props) => {
  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  const { dispatch, user, data = {} } = props;
  const { is_base: isBAU } = data;
  const { TextArea } = Input;
  const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 25,
    },
  };
  const onNext = (values) => {
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
      payload: { ...data, ...user, ...values },
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
        payload: isBAU ? 'Select Settings' : 'Select Crops',
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
        onFinish={onNext}
      >
        <Form.Item
          name="model-name"
          label="Scenario name"
          rules={[
            {
              required: true,
              message: 'Please enter the model name',
            },
          ]}
          initialValue={data.hasOwnProperty('model-name') ? data['model-name'] : undefined}
        >
          <Input placeholder="scenario name" />
        </Form.Item>
        <Form.Item
          name="model-desc"
          label="Description"
          initialValue={data.hasOwnProperty('model-desc') ? data['model-desc'] : undefined}
        >
          <TextArea rows={4} />
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
          <Button
            onClick={onPrev}
            style={{
              marginLeft: 8,
            }}
          >
            Prev
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
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
        <h4>Scenario name</h4>
        <p>Enter a scenario name, limited 255 characters.</p>
        <h4>Scenario description</h4>
        <p>Enter scenario optional description, no characters limit.</p>
      </div>
    </>
  );
};

export default connect(({ user, createModelForm }) => ({
  user: user.currentUser,
  data: createModelForm.step,
}))(Step4);
