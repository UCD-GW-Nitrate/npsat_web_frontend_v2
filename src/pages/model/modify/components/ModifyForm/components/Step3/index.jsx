import React from 'react';
import Step3 from '@/pages/model/model-form/components/Step3';
import { connect } from 'react-redux';

/**
 * 
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step3Modify = ({ dispatch, token, data }) => {
  return (
    <Step3
      dispatch={dispatch}
      token={token}
      data={data}
      isEditing
    />
  );
};

export default connect(({ user, copyAndModifyModelForm }) => ({
  token: user.currentUser.token,
  data: copyAndModifyModelForm.step,
}))(Step3Modify);
