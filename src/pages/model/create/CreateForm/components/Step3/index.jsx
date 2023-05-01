import React from 'react';
import Step3 from '@/pages/model/model-form/components/Step3';
import { connect } from 'react-redux';

/**
 * 
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step3Create = ({ dispatch, token, data }) => {
  return (
    <Step3
      dispatch={dispatch}
      token={token}
      data={data}
      isEditing = {false}
    />
  );
};


export default connect(({ user, createModelForm }) => ({
  token: user.currentUser.token,
  data: createModelForm.step,
}))(Step3Create);
