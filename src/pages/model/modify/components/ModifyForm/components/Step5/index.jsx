import React from 'react';
import Step5 from '@/pages/model/model-form/components/Step5';
import { connect } from 'react-redux';

/**
 * 
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step5Modify = ({ dispatch, id }) => {
  return (
    <Step5
      dispatch={dispatch}
      id={id}
      isEditing
    />
  );
};

export default connect(({ copyAndModifyModelForm }) => ({
  id: copyAndModifyModelForm.results.id,
}))(Step5Modify);
