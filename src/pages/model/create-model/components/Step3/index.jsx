import { Button, Form, Divider, Input } from 'antd';
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
      span: 5,
    },
    wrapperCol: {
      span: 19,
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
