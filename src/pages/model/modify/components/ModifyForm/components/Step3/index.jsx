import React, { useState } from 'react';
import { Form, Button, Divider, Tooltip } from 'antd';
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
      type: 'copyAndModifyModelForm/saveStepFormData',
      payload: { ...values, selectedCrops },
    });
    dispatch({
      type: 'copyAndModifyModelForm/saveCurrentStep',
      payload: 'Modify Info',
    });
  };

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'copyAndModifyModelForm/saveStepFormData',
        payload: { ...values, selectedCrops },
      });
      dispatch({
        type: 'copyAndModifyModelForm/saveCurrentStep',
        payload: 'Modify Regions',
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
            meta={data}
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
                  setSelected(data.hasOwnProperty('selectedCrops') ? data.selectedCrops : []);
                  form.resetFields(['crop-choice']);
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
        <h4>Select a crop</h4>
        <p>Drag to change the proportion</p>
      </div>
    </>
  );
};

export default connect(({ user, copyAndModifyModelForm }) => ({
  token: user.currentUser.token,
  data: copyAndModifyModelForm.step,
}))(Step3);
