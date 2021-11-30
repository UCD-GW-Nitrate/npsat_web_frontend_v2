import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import Map from '@/components/Maps/FormMap';
import { Row,Col, } from 'antd';
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
const SelectAndMap = ({ value = [], onChange, configureData, getData, placeholder, regionType }) => {
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
         selectedArea.slice(0,selectedArea.indexOf(selectingMap)).concat(
           selectedArea.slice(selectedArea.indexOf(selectingMap) + 1)
         );
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
          <WellNumber countyList={countyList} onChange={selectedArea} regionType={regionType}></WellNumber>
          <Map data={mapData} onChange={onMapSelect} values={value} />
    </>
  ) : (
    <Spin size="large" tip="loading data and map..." />
  );
};

export default SelectAndMap;
