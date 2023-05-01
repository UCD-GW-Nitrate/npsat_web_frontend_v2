import React from 'react';
import Step2 from '@/pages/model/model-form/components/Step2';
import { connect } from 'react-redux';

/**
 * At this step, the user can select settings and maps for the new model.
 * Target model info will be pre-filled for the user and
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step2Modify = ({ dispatch, data, targetModel }) => {
  return (
    <Step2
      dispatch={dispatch}
      data={data}
      targetModel={targetModel}
      isEditing
    />
  );
};

export default connect(({ copyAndModifyModelForm }) => ({
  targetModel: copyAndModifyModelForm.targetModel,
  data: copyAndModifyModelForm.step,
}))(Step2Modify);
