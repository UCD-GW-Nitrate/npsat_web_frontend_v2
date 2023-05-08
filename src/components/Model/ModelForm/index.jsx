import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';

const { Step } = Steps;

const StepForm = ({ dispatch, current, isBAU, getCurrentStepAndComponent, isEditing }) => {
  const [stepComponent, setStepComponent] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  const pageDescription = isEditing ? "Follow the instructions to copy and modify a scenario. The new scenario will be scheduled to run once it's created." 
    : "Follow the instructions to create a scenario. The scenario will be scheduled to run once it's created. Scenario runs may take from a few seconds to a minute.";

  const step1Title = isEditing ? "Modify Settings" : "Select Settings";
  const step2Title = isEditing ? "Modify Regions" : "Select Regions";
  const step3Title = isEditing ? "Modify Crops" : "Select Crops";
  const step4Title = isEditing ? "Modify Info" : "Enter Scenario Meta";
  const step5Title = "Results";

  const mapStepToCurrent = {
    0: step1Title,
    1: step2Title,
    2: step3Title,
    3: step4Title,
    4: step5Title,
  };

  return (
    <PageHeaderWrapper
      content={pageDescription}
    >
      <Card bordered={false}>
        <>
          <Steps
            current={currentStep}
            className={styles.steps}
            onChange={(step) => {
              if (dispatch) {
                dispatch({
                  type: isEditing? 'copyAndModifyModelForm/saveCurrentStep' : 'createModelForm/saveCurrentStep',
                  payload: mapStepToCurrent[step],
                });
              }
            }}
          >
            <Step title={step1Title} disabled={currentStep >= 4} />
            <Step title={step2Title} disabled={currentStep < 1 || currentStep >= 4} />
            <Step title={step3Title} disabled={currentStep < 2 || currentStep >= 4 || isBAU} />
            <Step title={step4Title} disabled={currentStep < 3 || currentStep >= 4} />
            <Step title={step5Title} disabled />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageHeaderWrapper>
  );
};

export default StepForm;
