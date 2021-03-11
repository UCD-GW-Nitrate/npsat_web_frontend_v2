import React from 'react';
import BaseFormItem from '@/pages/model/components/RegionFormItem/BaseFormItem';
import { getBasins, REGION_MACROS } from '@/services/region';
import { connect } from 'react-redux';

const BasinFormItem = (props) => {
  const regionType = REGION_MACROS.SUB_BASIN;
  const getData = getBasins;
  const configureData = (basin) => {
    const data = basin.geometry;
    data.properties.id = basin.id;
    data.properties.name = data.properties.CVHM_Basin;
    return data;
  };
  return (
    <BaseFormItem
      regionType={regionType}
      getData={getData}
      configureData={configureData}
      formLabel="Basin"
      placeholder="Select basin(s)"
      {...props}
    />
  );
};

export const CopyModelBasinFormItem = connect(({ copyAndModifyModelForm }) => ({
  data: copyAndModifyModelForm.step,
}))(BasinFormItem);
