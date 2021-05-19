import { CopyModelFarmFormItem } from '@/pages/model/components/RegionFormItem/SubRegionFormItem';
import { CopyModelB118BasinFormItem } from '@/pages/model/components/RegionFormItem/B118BasinFormItem';
import { CopyModelBasinFormItem } from '@/pages/model/components/RegionFormItem/BasinFormItem';
import { CopyModelTownshipFormItem } from '@/pages/model/components/RegionFormItem/TownshipFormItem';
import { CopyModelCountyFormItem } from '@/pages/model/components/RegionFormItem/CountyFormItem';
import CentralValleyFormItem from '@/pages/model/components/RegionFormItem/CentralValleyFormItem';
import { REGION_MACROS } from '@/services/region';
import React from 'react';
// central export file for all modify and copy region forms

const renderRegionFormItem = (key) => {
  switch (key) {
    case REGION_MACROS.TOWNSHIPS.toString():
      return <CopyModelTownshipFormItem />;
    case REGION_MACROS.CVHM_FARM.toString():
      return <CopyModelFarmFormItem />;
    case REGION_MACROS.COUNTY.toString():
      return <CopyModelCountyFormItem />;
    case REGION_MACROS.SUB_BASIN.toString():
      return <CopyModelBasinFormItem />;
    case REGION_MACROS.B118_BASIN.toString():
      return <CopyModelB118BasinFormItem />;
    case REGION_MACROS.CENTRAL_VALLEY:
    default:
      return <CentralValleyFormItem />;
  }
};

export { CopyModelCountyFormItem as CountyFormItem };
export { CopyModelTownshipFormItem as TownshipFormItem };
export { CopyModelBasinFormItem as BasinFormItem };
export { CopyModelB118BasinFormItem as B118BasinFormItem };
export { CopyModelFarmFormItem as FarmFormItem };
export { CentralValleyFormItem };

export { renderRegionFormItem };
