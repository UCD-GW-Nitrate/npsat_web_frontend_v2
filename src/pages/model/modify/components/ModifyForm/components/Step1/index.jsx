import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

/**
 * At this step, the user can select settings and maps for the new model.
 * Target model info will be pre-filled for the user and
 * @param targetModel
 * @returns {null}
 * @constructor
 */
const Step1 = ({ targetModel, dispatch, data }) => {
  console.log(targetModel);

  return null;
};

export default connect(({ copyAndModifyModelForm }) => ({
  targetModel: copyAndModifyModelForm.targetModel,
  data: copyAndModifyModelForm.step
}))(Step1);
