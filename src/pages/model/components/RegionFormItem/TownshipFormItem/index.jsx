import React from 'react';
import BaseFormItem from '@/pages/model/components/RegionFormItem/BaseFormItem';
import { getTownships, REGION_MACROS } from '@/services/region';
import { connect } from 'react-redux';

const TownshipFormItem = (props) => {
  const regionType = REGION_MACROS.TOWNSHIPS;
  const getData = getTownships;
  const configureData = (township) => {
    const data = township.geometry;
    data.properties.id = township.id;
    data.properties.name = township.name;
    return data;
  };
  return (
    <BaseFormItem
      regionType={regionType}
      getData={getData}
      configureData={configureData}
      formLabel="Township"
      placeholder="Select township(s)"
      {...props}
    />
  );
};

export const CopyModelTownshipFormItem = connect(({ copyAndModifyModelForm }) => ({
  data: copyAndModifyModelForm.step,
}))(TownshipFormItem);
