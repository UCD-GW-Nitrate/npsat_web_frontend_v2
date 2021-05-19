import React from 'react';
import BaseFormItem from '@/pages/model/components/RegionFormItem/BaseFormItem';
import { getCounties, REGION_MACROS } from '@/services/region';
import { connect } from 'react-redux';

const CountyFormItem = (props) => {
  const regionType = REGION_MACROS.COUNTY;
  const getData = getCounties;
  const configureData = (county) => {
    const data = county.geometry;
    data.properties.id = county.id;
    return data;
  };
  return (
    <BaseFormItem
      regionType={regionType}
      getData={getData}
      configureData={configureData}
      formLabel="County"
      placeholder="Select county(s)"
      {...props}
    />
  );
};

export const CreateModelCountyFormItem = connect(({ createModelForm }) => ({
  data: createModelForm.step,
}))(CountyFormItem);

export const CopyModelCountyFormItem = connect(({ copyAndModifyModelForm }) => ({
  data: copyAndModifyModelForm.step,
}))(CountyFormItem);
