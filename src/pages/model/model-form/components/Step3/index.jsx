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

const Step3 = ({ dispatch, token, data, isEditing }) => {
  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  const [selectedCrops, setSelected] = useState(
    data.hasOwnProperty('selectedCrops') ? data.selectedCrops : [],
  );

  const onNext = (values) => {
    if (isEditing) {
      dispatch({
        type: 'copyAndModifyModelForm/saveStepFormData',
        payload: { ...values, selectedCrops },
      });
      dispatch({
        type: 'copyAndModifyModelForm/saveCurrentStep',
        payload: 'Modify Info',
      });
    } else {
      dispatch({
        type: 'createModelForm/saveStepFormData',
        payload: { ...values, selectedCrops },
      });
      dispatch({
        type: 'createModelForm/saveCurrentStep',
        payload: 'Model Info',
      });
    }
  };

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      if (isEditing) {
        dispatch({
          type: 'copyAndModifyModelForm/saveStepFormData',
          payload: { ...values, selectedCrops },
        });
        dispatch({
          type: 'copyAndModifyModelForm/saveCurrentStep',
          payload: 'Modify Regions',
        });
      } else {
        dispatch({
          type: 'createModelForm/saveStepFormData',
          payload: { ...values, selectedCrops },
        });
        dispatch({
          type: 'createModelForm/saveCurrentStep',
          payload: 'Select Regions',
        });
      }
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
                    setSelected(data.hasOwnProperty('selectedCrops') ? data.selectedCrops : []);
                    form.resetFields(['crop-choice']);
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
        <h4>Select a crop:</h4>
        <p>
          Drag the slider to change future nitrate loading rates (as fraction of current), or type percentage into
          the textbox.
        </p>
        <p>
          Note: The future nitrate loading is expressed as percent of the current (“business-as-usual” or BAU)
          loading. The current loading is defined by the historic to current nitrate loading scenario selected under
          “Settings”. The BAU scenario continues those loadings indefinitely. The custom scenario will gradually
          adjust to the new nitrate loading levels selected here over the transition period, which was defined in
          “Settings”.
        </p>
        <p>
          Land use type may depend on the loading scenario selected under “Settings” The type “All other crops”
          refers to all land use types that have NOT been selected explicitly here. This allows for easily changing
          the nitrate loading from all land use types that are not specifically defined here by the user.
        </p>
      </div>
    </>
  );
};

export default Step3;
