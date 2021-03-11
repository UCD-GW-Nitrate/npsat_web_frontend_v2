import React from 'react';
import BaseFormItem from '@/pages/model/components/RegionFormItem/BaseFormItem';
import { getCVHMFarms, REGION_MACROS } from '@/services/region';
import { connect } from 'react-redux';

const FarmFormItem = (props) => {
  const regionType = REGION_MACROS.CVHM_FARM;
  const getData = getCVHMFarms;
  const configureData = (farm) => {
    const data = farm.geometry;
    data.properties.id = farm.id;
    data.properties.name = farm.name;
    return data;
  };
  return (
    <BaseFormItem
      regionType={regionType}
      getData={getData}
      configureData={configureData}
      formLabel="Farm"
      placeholder="Select farm(s)"
      {...props}
    />
  );
};

export const CopyModelFarmFormItem = connect(({ copyAndModifyModelForm }) => ({
  data: copyAndModifyModelForm.step,
}))(FarmFormItem);
