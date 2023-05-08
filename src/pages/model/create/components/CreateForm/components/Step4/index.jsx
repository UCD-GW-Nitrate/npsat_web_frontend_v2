import React from 'react';
import Step4 from '@/components/Model/ModelForm/components/Step4';
import { connect } from 'react-redux';

/**
 * 
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Step4Create = ({ dispatch, user, data = {} }) => {
  return (
    <Step4
      dispatch={dispatch}
      user={user}
      data={data}
      isEditing = {false}
    />
  );
};


export default connect(({ user, createModelForm }) => ({
  user: user.currentUser,
  data: createModelForm.step,
}))(Step4Create);
