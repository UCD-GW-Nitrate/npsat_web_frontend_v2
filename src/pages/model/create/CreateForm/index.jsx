import React from 'react';
import { connect } from 'umi';
import StepForm from "@/pages/model/model-form";
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';

const getCurrentStepAndComponent = (current) => {
  switch (current) {
    case 'Select Regions':
    // case 1:
      return {
        step: 1,
        component: <Step2 />,
      };

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

    case 'Select Settings':
    default:
      return {
        step: 0,
        component: <Step1 />,
      };
  }
};

const StepFormCreate = ({ dispatch, current, isBAU }) => {
  return (
    <StepForm
      dispatch={dispatch}
      current={current}
      isBAU={isBAU}
      getCurrentStepAndComponent={getCurrentStepAndComponent}
      isEditing={false}
    />
  );
};

export default connect(({ createModelForm }) => ({
  current: createModelForm.current,
  isBAU: createModelForm.step.is_base,
}))(StepFormCreate);
