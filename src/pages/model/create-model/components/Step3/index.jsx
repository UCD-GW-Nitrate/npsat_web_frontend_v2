import React, { useState } from 'react';
import { Form, Button, Divider } from 'antd';
import { connect } from 'umi';
import CropCardForm from '@/pages/model/components/CropCardForm';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step3 = (props) => {
  const [form] = Form.useForm();
  const { dispatch, token, data } = props;
  const { getFieldsValue } = form;
  const [selectedCrops, setSelected] = useState(
    data.hasOwnProperty('selectedCrops') ? data.selectedCrops : [],
  );

  const onNext = (values) => {
    dispatch({
      type: 'createModelForm/saveStepFormData',
      payload: { ...values, selectedCrops },
    });
    dispatch({
      type: 'createModelForm/saveCurrentStep',
      payload: 'Model Info',
    });
  };

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'createModelForm/saveStepFormData',
        payload: { ...values, selectedCrops },
      });
      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Select Settings',
      });
    }
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        onFinish={onNext}
        className={styles.stepForm}
      >
        <Form.Item
          name="crop-choice"
          label="Crop(s)"
          required
          rules={[
            {
              validator: () => Promise.resolve(),
            },
          ]}
          initialValue={data['crop-choice']}
        >
          <CropCardForm
            selectedCrops={selectedCrops}
            setSelected={setSelected}
            flowScen={data.load_scenario}
          />
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
        <h4>Select a crop</h4>
        <p>Drag to change the proportion</p>
      </div>
    </>
  );
};

export default connect(({ user, createModelForm }) => ({
  token: user.currentUser.token,
  data: createModelForm.step,
}))(Step3);
