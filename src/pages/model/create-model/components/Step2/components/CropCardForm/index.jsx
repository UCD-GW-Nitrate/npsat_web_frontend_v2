import React, { useEffect, useState } from 'react';
import { getCropList } from '@/services/crop';
import { Select, List, notification } from 'antd';
import CropCard from '@/pages/model/components/CropCard';
import styles from './index.less';

const { Option } = Select;

const CropCardForm = (props) => {
  const { value = {}, onChange, selectedCrops, setSelected } = props;
  const [ cropList, setList ] = useState([]);
  const [ special, setSpecial ] = useState('');
  useEffect(() => {
    (async () => {
      const { results: crops } = await getCropList();
      setList(crops);
      crops.forEach(item => {
        if (item.caml_code === 0) {
          setSelected([...selectedCrops, `${item.id},${item.name}`])
          setSpecial(`${item.id},${item.name}`)
        }
      })
    })();
  }, []);
  const onSelect = v => {
    if (!v.includes(special)) {
      notification.warning({
        message: `Cannot deselect "${special.split(",")[1]}"`,
        description: `You can set "${special.split(",")[1]}" to default`
      })
      setSelected([special, ...v]);
    } else {
      setSelected(v);
    }
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
        {cropList.map(crop => (
          <Option value={`${crop.id},${crop.name}`} key={crop.id}>{crop.name}</Option>
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
          const [ id, name ] = item.split(",");
          const prevValues = value.hasOwnProperty(id) ? value[id] : {
            load: 100,
            area: 100,
            enable: false
          };
          return (
            <List.Item key={id}>
              <CropCard
                values={value}
                onChange={onChange}
                name={name}
                required={id === special.split(",")[0]}
                id={id}
                initialValues={prevValues}
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
