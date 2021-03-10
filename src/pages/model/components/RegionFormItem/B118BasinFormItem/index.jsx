import React from 'react';
import BaseFormItem from '@/pages/model/components/RegionFormItem/BaseFormItem';
import { getB118Basin, REGION_MACROS } from '@/services/region';

const B118BasinFormItem = (props) => {
  const regionType = REGION_MACROS.B118_BASIN;
  const getData = getB118Basin;
  const configureData = (basin) => {
    const data = basin.geometry;
    data.properties.id = basin.id;
    data.properties.name = basin.name;
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

export default B118BasinFormItem;
