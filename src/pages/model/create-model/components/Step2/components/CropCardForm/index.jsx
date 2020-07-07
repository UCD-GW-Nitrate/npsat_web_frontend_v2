import React, { useEffect, useState } from 'react';
import { getCropList } from '@/services/crop';
import { Select, List } from 'antd';
import CropCard from '@/pages/model/components/CropCard';
import styles from './index.less';

const { Option } = Select;

const CropCardForm = ({ values = {}, onChange }) => {
  const [ cropList, setList ] = useState([]);
  const [ selectedCrops, setSelected ] = useState([]);
  useEffect(() => {
    (async () => {
      const { results: crops } = await getCropList();
      setList(crops);
    })();
  }, []);
  return (
    <>
      <Select
        mode="multiple"
        placeholder="Please select a crop to start"
        onChange={setSelected}
      >
        {cropList.map(crop => (
          <Option value={`${crop.name},${crop.id}`} key={crop.id}>{crop.name}</Option>
        ))}
      </Select>
      <div className={styles.cardList}>
      <List
        rowKey="id"
        grid={{
          gutter: 24,
          lg: 2,
          md: 2,
          sm: 1,
          xs: 1,
        }}
        dataSource={selectedCrops}
        renderItem={item => {
          const [ name, id ] = item.split(',');
          return (
            <List.Item key={id}>
              <CropCard
                values={values}
                onChange={onChange}
                name={name}
                id={id}
              />
            </List.Item>
          );
        }}
      />
      </div>
    </>
  )
}

export default CropCardForm;
