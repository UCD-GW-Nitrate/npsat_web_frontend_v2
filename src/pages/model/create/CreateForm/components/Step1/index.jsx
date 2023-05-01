import React from 'react';
import Step1 from "@/pages/model/model-form/components/Step1";
import { connect } from 'react-redux';

const Step1Create = ({ dispatch, user, data = {} }) => {
  return (
    <Step1
      dispatch={dispatch}
      user={user}
      data={data}
      isEditing={false}
    />
  );
};

export default connect(({ user, createModelForm }) => ({
  user: user.currentUser,
  data: createModelForm.step,
}))(Step1Create);
