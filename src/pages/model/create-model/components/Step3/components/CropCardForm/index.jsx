import React, { useEffect, useState } from 'react';
import { getCropListLoadType, CROP_MACROS } from '@/services/crop';
import { Select, List, notification, Spin } from 'antd';
import CropCard from '@/pages/model/components/CropCard';
import styles from './index.less';

const { Option } = Select;

const CropCardForm = (props) => {
  const { value = {}, onChange, selectedCrops, setSelected, flowScen } = props;
  const [cropList, setList] = useState([]);
  const [special, setSpecial] = useState('');
  useEffect(() => {
    (async () => {
      const { results: crops } = await getCropListLoadType(flowScen);
      setList(crops);
      crops.forEach((item) => {
        if (item.crop_type === CROP_MACROS.ALL_OTHER_CROP) {
          if (!selectedCrops.includes(`${item.id},${item.name}`)) {
            setSelected([...selectedCrops, `${item.id},${item.name}`]);
          }
          setSpecial(`${item.id},${item.name}`);
        }
      });
    })();
  }, []);
  const onSelect = (v) => {
    if (!v.includes(special)) {
      notification.warning({
        message: `Cannot deselect "${special.split(',')[1]}"`,
        description: `You can set "${special.split(',')[1]}" to default(100%)`,
      });
      setSelected([special, ...v]);
    } else {
      setSelected(v);
    }
  };
  if (cropList.length === 0) {
    return <Spin />
  }
  return (
    <>
      <Select
        value={selectedCrops}
        mode="multiple"
        placeholder="Please select a crop to start"
        onChange={onSelect}
        className={styles.select}
      >
        {cropList.map((crop) => (
          <Option value={`${crop.id},${crop.name}`} key={crop.id}>
            {crop.name}
          </Option>
        ))}
      </Select>
      <div className={styles.cardList}>
        <List
          rowKey="id"
          grid={{
            gutter: 24,
            xxl: 2,
            xl: 2,
            lg: 2,
            md: 2,
            sm: 1,
            xs: 1,
          }}
          dataSource={selectedCrops}
          renderItem={(item) => {
            const [id, name] = item.split(',');
            const prevValues = value.hasOwnProperty(id)
              ? value[id]
              : {
                  load: 100,
                  area: 100,
                  enable: true,
                };
            return (
              <List.Item key={id}>
                <CropCard
                  values={value}
                  onChange={onChange}
                  name={name}
                  required={id === special.split(',')[0]}
                  id={id}
                  initialValues={prevValues}
                />
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
};

export default CropCardForm;
