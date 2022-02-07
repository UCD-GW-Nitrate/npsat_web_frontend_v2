import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import Map from '@/components/Maps/FormMap';
import { Row,Col, } from 'antd';
import { connect } from 'react-redux';
import WellNumber from './WellNumber';


const { Option } = Select;

/**
 * Form control component extensible for all type of region.
 * @param value used for passing values by parent form item
 * @param onChange used for passing values by parent form item
 * @param configureData function that configures backend region data so that it contains proper
 * {id, name}
 * @param getData function that gets backend end
 * @param placeholder string used for placeholder in select component
 * @returns {JSX.Element}
 * @constructor
 */
const SelectAndMap = ({ value = [], onChange, configureData, getData, placeholder, regionType, regions, modifiedRegions, targetModelRegions }) => {
  const [countyList, setList] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [selectedArea, setArea] = useState([]);
  useEffect(() => {
    (async () => {
      const { results: mapData } = await getData();
      setList(mapData);
      setMapData(mapData.map((region) => configureData(region)));
    })();
  }, []);
  console.log("regionType:", regionType);
  
  const onListChange = (v) => {

    if (onChange) { 
      onChange(v);
      setArea(v);
    }
  };

  const onListSelect = (v,o) => {
    if (selectedArea.indexOf(v) === -1) {
     setArea([...selectedArea, v]);
    }
    else{
        selectedArea.slice(0,selectedArea.indexOf(v)).concat(
          selectedArea.slice(selectedArea.indexOf(v) + 1)
        );
    }
  };
  

  const onMapSelect = (selectingMap, selectedMaps) => {
    if (selectedArea.indexOf(selectingMap) === -1) {
      setArea([...selectedArea, selectingMap]);
     }
     else{
        setArea([
          ...selectedMaps.slice(0, selectedMaps.indexOf(selectingMap)),
          ...selectedMaps.slice(selectedMaps.indexOf(selectingMap) + 1),
        ]);
     }

    if (onChange) {
      if (selectedMaps.indexOf(selectingMap) === -1) {
        onChange([...selectedMaps, selectingMap]);
      } else {
        onChange([
          ...selectedMaps.slice(0, selectedMaps.indexOf(selectingMap)),
          ...selectedMaps.slice(selectedMaps.indexOf(selectingMap) + 1),
        ]);
      }
    }
  };

  console.log("regions: ", regions);//regions selected in "create model"
  console.log("modifiedRegions: ", modifiedRegions);// regions newly selected in "modify" 
  console.log("target regions: ", targetModelRegions);// regions pre-selected in "modify"

  const selectedRegions = (regions, modifiedRegions, targetModelRegions) => {
    if (modifiedRegions != null){
      console.log("Using modifiedRegions!");
      switch (regionType) {
        case 1: //basin
          return modifiedRegions['region-1-choice'] != null ? modifiedRegions['region-1-choice'] : selectedArea;
        case 2://subRegion
          return modifiedRegions['region-2-choice'] != null ? modifiedRegions['region-2-choice'] : selectedArea;
        case 3://B118
          return modifiedRegions['region-3-choice'] != null ? modifiedRegions['region-3-choice'] : selectedArea;
        case 4://county
          return modifiedRegions['region-4-choice'] != null ? modifiedRegions['region-4-choice'] : selectedArea;
        case 5://Tship
          return modifiedRegions['region-5-choice'] != null ? modifiedRegions['region-5-choice'] : selectedArea;
        default:
          return selectedArea;
      }
    }
    if (targetModelRegions != null){
      console.log("Using targetRegions!");
      var targetRegions = [];
      targetModelRegions.map((v) => {targetRegions.push(v.id)});
      return targetRegions;
    }
    if (regions != null){
      console.log("Using regions!");
      switch (regionType) {
        case 1://basin
          return regions['region-1-choice'] != null ? regions['region-1-choice'] : selectedArea;
        case 2://subRegion
          return regions['region-2-choice'] != null ? regions['region-2-choice'] : selectedArea;
        case 3://B118
          return regions['region-3-choice'] != null ? regions['region-3-choice'] : selectedArea;
        case 4://county
          return regions['region-4-choice'] != null ? regions['region-4-choice'] : selectedArea;
        case 5://Tship
          return regions['region-5-choice'] != null ? regions['region-5-choice'] : selectedArea;
        default:
          return selectedArea;
      }
    }
    return selectedArea;
  }

  const selected_regions = selectedRegions(regions, modifiedRegions, targetModelRegions);


  return countyList.length > 0 && mapData.length > 0 ? (
    <>
      <Select
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        value={value}
        onSelect={onListSelect}
        onChange={onListChange}
        // filterOption={(input, option) =>
        //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        // }
        mode="multiple"
        allowClear={true}
      >
        {countyList.map((county) => (
          <Option value={county.id} key={county.id}>
            {county.name}
          </Option>
        ))}
      </Select>
          <WellNumber countyList={countyList} onChange={selected_regions} regionType={regionType} ></WellNumber>
          <Map data={mapData} onChange={onMapSelect} values={value} />
    </>
  ) : (
    <Spin size="large" tip="loading data and map..." />
  );
};

export default connect(({ createModelForm , copyAndModifyModelForm }) => ({
  regions: createModelForm.step.regions,
  modifiedRegions: copyAndModifyModelForm.step.modifiedRegions,
  targetModelRegions: copyAndModifyModelForm.targetModel.regions,
}))(SelectAndMap);
