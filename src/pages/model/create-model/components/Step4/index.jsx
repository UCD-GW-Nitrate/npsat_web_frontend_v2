import { Button, Form, Divider, Input, InputNumber, DatePicker } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './index.less';

const { RangePicker } = DatePicker;

const Step4 = (props) => {
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
        onFinish={onNext}
      >
        <Form.Item
          name="model-name"
          label="Model name"
          rules={[
            {
              required: true,
              message: 'Please enter the model name',
            },
          ]}
          initialValue={data.hasOwnProperty('model-name') ? data['model-name'] : undefined}
        >
          <Input placeholder="model name" />
        </Form.Item>
        <Form.Item
          name="model-desc"
          label="Description"
          initialValue={data.hasOwnProperty('model-desc') ? data['model-desc'] : undefined}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="n_years"
          label="Sim end year"
          required={[
            {
              required: true,
              message: 'Please enter numbers of years to stimulate the model',
            },
          ]}
          initialValue={data.hasOwnProperty('n_years') ? data.n_years : moment('2100')}
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
          dependencies={['n_years']}
          rules={[
            {
              required: true,
              message: 'Please enter the reduction year',
            },
            ({ getFieldValue }) => ({
              validator: (_, _value) => {
                const sim_end_year = getFieldValue('n_years');
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
          // initialValue={
          //   data.hasOwnProperty('reduction_year')
          //     ? data.reduction_year
          //     : [moment('2020'), moment('2025')]
          // }
        >
          <RangePicker
            picker="year"
            disabledDate={(current) => {
              const end_year = form.getFieldValue('n_years');
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
          <InputNumber min={0} max={100} formatter={(v) => `${v}%`} />
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
        <h4>Model name</h4>
        <p>Enter a model name, limited 255 characters.</p>
        <h4>Model description</h4>
        <p>Enter model optional description, no characters limit.</p>
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
}))(Step4);
