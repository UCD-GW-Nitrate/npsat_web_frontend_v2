import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import Step1 from './components/Step1';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import styles from './style.less';

const { Step } = Steps;

const getCurrentStepAndComponent = (current) => {
  switch (current) {
    case 'Select Crops':
      return {
        step: 2,
        component: <Step3 />,
      };

    case 'Model Info':
      return {
        step: 3,
        component: <Step4 />,
      };

    case 'Results':
      return {
        step: 4,
        component: <Step5 />,
      };

    case 'Select Regions':
    default:
      return {
        step: 0,
        component: <Step1 />,
      };
  }
};

const StepForm = ({ current }) => {
  const [stepComponent, setStepComponent] = useState(<Step1 />);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);
  return (
    <PageHeaderWrapper
      content="Follow the instructions to create a model. The model will
     be scheduled to run once it's created"
    >
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps} >
            <Step title="Select Regions" />
            <Step title="Select Scenarios" />
            <Step title="Select Crops" />
            <Step title="Enter Model Meta" />
            <Step title="Results" />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ createModelForm }) => ({
  current: createModelForm.current,
}))(StepForm);
