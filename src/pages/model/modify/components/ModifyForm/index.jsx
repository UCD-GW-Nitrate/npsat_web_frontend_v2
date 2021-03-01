import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import Step1 from '@/pages/model/modify/components/ModifyForm/components/Step1';
import styles from './style.less';

const { Step } = Steps;

const getCurrentStepAndComponent = (current) => {
  switch (current) {
    case 'Modify Crops':
      return {
        step: 2,
        component: null,
      };

    case 'Modify Info':
      return {
        step: 3,
        component: null,
      };

    case 'Results':
      return {
        step: 4,
        component: null,
      };

    case 'Modify Settings':
      return {
        step: 1,
        component: null,
      };

    case 'Modify Regions':
    default:
      return {
        step: 0,
        component: <Step1 />,
      };
  }
};

const mapStepToCurrent = {
  0: 'Modify Regions',
  1: 'Modify Settings',
  2: 'Modify Crops',
  3: 'Modify Info',
  4: 'Results',
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
                  type: 'copyAndModifyModelForm/saveCurrentStep',
                  payload: mapStepToCurrent[step],
                });
              }
            }}
          >
            <Step title="Modify Regions" disabled={currentStep >= 4} />
            <Step title="Modify Settings" disabled={currentStep >= 4} />
            <Step title="Modify Crops" disabled={currentStep < 2 || currentStep >= 4} />
            <Step title="Modify Info" disabled={currentStep < 3 || currentStep >= 4} />
            <Step title="Results" disabled />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ copyAndModifyModelForm }) => ({
  current: copyAndModifyModelForm.current,
}))(StepForm);
