import React from 'react';
import { connect } from 'umi';
import Step1 from '@/pages/model/modify/components/ModifyForm/components/Step1';
import Step2 from '@/pages/model/modify/components/ModifyForm/components/Step2';
import Step3 from '@/pages/model/modify/components/ModifyForm/components/Step3';
import Step4 from '@/pages/model/modify/components/ModifyForm/components/Step4';
import Step5 from '@/pages/model/modify/components/ModifyForm/components/Step5';
import StepForm from "@/pages/model/model-form";

const getCurrentStepAndComponent = (current) => {
  switch (current) {
    case 'Modify Regions':
      return {
        step: 1,
        component: <Step2 />,
      };

    case 'Modify Crops':
      return {
        step: 2,
        component: <Step3 />,
      };

    case 'Modify Info':
      return {
        step: 3,
        component: <Step4 />,
      };

    case 'Results':
      return {
        step: 4,
        component: <Step5 />,
      };

    case 'Modify Settings':
    default:
      return {
        step: 0,
        component: <Step1 />,
      };
  }
};

const StepFormModify = ({ dispatch, current }) => {
  return (
    <StepForm
      dispatch={dispatch}
      current={current}
      getCurrentStepAndComponent={getCurrentStepAndComponent}
      isEditing
    />
  );
};

export default connect(({ copyAndModifyModelForm }) => ({
  current: copyAndModifyModelForm.current,
}))(StepFormModify);
