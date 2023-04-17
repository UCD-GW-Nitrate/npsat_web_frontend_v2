import GNLMcropAreas from "./CropAreasData/GNLM_AreaPercrop";


const areaPerCrop = (crops = [], regions = [], mapType, load_scenario) => {
    
  // crops: allOtherArea(null) is inteantionally left out for selected crops
  crops.shift();

  let cropsData = [];
  const regionMacros = {
    0: "CentralValley",
    1: "Basins",
    4: "Counties",
    3: "B118",
    2: "Subregions",
    5: "Townships"
  }; 
  const areaPerCrop = {};
  let selectedCropAreas = 0;
  let totalAreas = 0;
    
  // load data of selected regions
  if (load_scenario === 1) { 
    if (mapType === 0) {
      cropsData = GNLMcropAreas[0].Regions[0].CropList;
      totalAreas = GNLMcropAreas[0].Regions[0].TotArea;
    }
    else {
      GNLMcropAreas.forEach((maps) => {
        if (maps.Code === regionMacros[mapType])
          maps.Regions.forEach((region) => {
            if (regions.includes(region.Name)) {
              cropsData = cropsData.concat(region.CropList);
              totalAreas += region.TotArea;
            }
          });
      });
    }
  }
  // else {
  //     cropsData = rests
  // }

  // calculate total area for each selected crops 
  cropsData.forEach((crop) => {
    if (crops.includes(crop.CropId)) {
      if (!areaPerCrop.hasOwnProperty(crop.CropId)) {
        areaPerCrop[crop.CropId] = crop.Area;
        selectedCropAreas += crop.Area;
      }
      else {
        areaPerCrop[crop.CropId] += crop.Area;
        selectedCropAreas += crop.Area;
      }
    }
  });

  areaPerCrop[0] = totalAreas - selectedCropAreas;
    
  return areaPerCrop;

};

export default areaPerCrop;