import React from 'react';
import BaseFormItem from '@/pages/model/components/RegionFormItem/BaseFormItem';
import { getCVHMFarms, REGION_MACROS } from '@/services/region';
import { connect } from 'react-redux';

const SubRegionFormItem = (props) => {
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
      formLabel="Subregion"
      placeholder="Select subregion(s)"
      {...props}
    />
  );
};

export const CreateModelFarmFormItem = connect(({ createModelForm }) => ({
  data: createModelForm.step,
}))(SubRegionFormItem);

export const CopyModelFarmFormItem = connect(({ copyAndModifyModelForm }) => ({
  data: copyAndModifyModelForm.step,
}))(SubRegionFormItem);
