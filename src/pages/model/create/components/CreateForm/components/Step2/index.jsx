import React from 'react';
import Step2 from '@/components/Forms/model-form/components/Step2';
import { connect } from 'react-redux';

/**
 * At this step, the user can select settings and maps for the new model.
 * Target model info will be pre-filled for the user and
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step2Create = ({ dispatch, data }) => {
  return (
    <Step2
      dispatch={dispatch}
      data={data}
      isEditing = {false}
    />
  );
};

export default connect(({ createModelForm }) => ({
  data: createModelForm.step,
}))(Step2Create);
