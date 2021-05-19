import { CreateModelFarmFormItem } from '@/pages/model/components/RegionFormItem/SubRegionFormItem';
import { CreateModelB118BasinFormItem } from '@/pages/model/components/RegionFormItem/B118BasinFormItem';
import { CreateModelBasinFormItem } from '@/pages/model/components/RegionFormItem/BasinFormItem';
import { CreateModelTownshipFormItem } from '@/pages/model/components/RegionFormItem/TownshipFormItem';
import { CreateModelCountyFormItem } from '@/pages/model/components/RegionFormItem/CountyFormItem';
import CentralValleyFormItem from '@/pages/model/components/RegionFormItem/CentralValleyFormItem';
import { REGION_MACROS } from '@/services/region';
import React from 'react';
// central export file for all modify and copy region forms

const renderRegionFormItem = (key) => {
  switch (key) {
    case REGION_MACROS.TOWNSHIPS.toString():
      return <CreateModelTownshipFormItem />;
    case REGION_MACROS.CVHM_FARM.toString():
      return <CreateModelFarmFormItem />;
    case REGION_MACROS.COUNTY.toString():
      return <CreateModelCountyFormItem />;
    case REGION_MACROS.SUB_BASIN.toString():
      return <CreateModelBasinFormItem />;
    case REGION_MACROS.B118_BASIN.toString():
      return <CreateModelB118BasinFormItem />;
    case REGION_MACROS.CENTRAL_VALLEY:
    default:
      return <CentralValleyFormItem />;
  }
};

export { CreateModelCountyFormItem as CountyFormItem };
export { CreateModelTownshipFormItem as TownshipFormItem };
export { CreateModelBasinFormItem as BasinFormItem };
export { CreateModelB118BasinFormItem as B118BasinFormItem };
export { CreateModelFarmFormItem as FarmFormItem };
export { CentralValleyFormItem };

export { renderRegionFormItem };
