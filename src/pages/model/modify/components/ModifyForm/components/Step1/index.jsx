import React from 'react';
import Step1 from "@/components/Forms/model-form/components/Step1";
import { connect } from 'react-redux';

const Step1Modify = ({ dispatch, user, data = {} }) => {
  return (
    <Step1
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
}))(Step1Modify);
