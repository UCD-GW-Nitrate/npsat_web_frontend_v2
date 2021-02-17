import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';

const { Step } = Steps;

const getCurrentStepAndComponent = (current) => {
  switch (current) {
    case 'Modify Crops':
    case 1:
      return {
        step: 1,
        component: null,
      };

    case 'Modify Info':
      return {
        step: 2,
        component: null,
      };

    case 'Results':
      return {
        step: 3,
        component: null,
      };

    case 'Modify Settings':
    default:
      return {
        step: 0,
        component: null,
      };
  }
};

const mapStepToCurrent = {
  0: 'Modify Settings',
  1: 'Modify Crops',
  2: 'Modify Info',
  3: 'Results',
};

const StepForm = ({ dispatch, current }) => {
  const [stepComponent, setStepComponent] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);
  return (
    <PageHeaderWrapper
      content="Follow the instructions to copy and modify a model. The new model will
     be scheduled to run once it's created."
    >
      <Card bordered={false}>
        <>
          <Steps
            current={currentStep}
            className={styles.steps}
            onChange={(step) => {
              if (dispatch) {
                dispatch({
                  type: 'CopyAndModifyModelForm/saveCurrentStep',
                  payload: mapStepToCurrent[step],
                });
              }
            }}
          >
            <Step title="Modify Settings" disabled={currentStep >= 3} />
            <Step title="Modify Crops" disabled={currentStep < 1 || currentStep >= 3} />
            <Step title="Modify Info" disabled={currentStep < 2 || currentStep >= 3} />
            <Step title="Results" disabled />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ CopyAndModifyModelForm }) => ({
  current: CopyAndModifyModelForm.current,
}))(StepForm);
