import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import Map from '@/components/Maps/FormMap';

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
const SelectAndMap = ({ value = [], onChange, configureData, getData, placeholder }) => {
  const [countyList, setList] = useState([]);
  const [mapData, setMapData] = useState([]);
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
    }
  };

  const onMapSelect = (selectingMap, selectedMaps) => {
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
        onChange={onListChange}
        // filterOption={(input, option) =>
        //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        // }
        mode="multiple"
      >
        {countyList.map((county) => (
          <Option value={county.id} key={county.id}>
            {county.name}
          </Option>
        ))}
      </Select>
      <Map data={mapData} onChange={onMapSelect} values={value} />
    </>
  ) : (
    <Spin size="large" tip="loading data and map..." />
  );
};

export default SelectAndMap;
