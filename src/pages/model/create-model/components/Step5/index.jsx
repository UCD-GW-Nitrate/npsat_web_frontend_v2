import React from 'react';
import Step5 from '@/pages/model/model-form/components/Step5';
import { connect } from 'react-redux';

/**
 * 
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step5Create = ({ dispatch, id }) => {
  return (
    <Step5
      dispatch={dispatch}
      id={id}
    />
  );
};


export default connect(({ createModelForm }) => ({
  id: createModelForm.results.id,
}))(Step5Create);
