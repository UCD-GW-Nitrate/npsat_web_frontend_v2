import React from 'react';
import Step4 from '@/components/Model/ModelForm/components/Step4';
import { connect } from 'react-redux';

/**
 * 
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step4Modify = ({ dispatch, user, data = {} }) => {
  return (
    <Step4
      dispatch={dispatch}
      user={user}
      data={data}
      isEditing
    />
  );
};

export default connect(({ user, copyAndModifyModelForm }) => ({
  user: user.currentUser,
  data: copyAndModifyModelForm.step,
}))(Step4Modify);
