import React, { useEffect, useState } from 'react';
import { getCropListLoadType, CROP_MACROS } from '@/services/crop';
import { Select, List, notification, Spin } from 'antd';
import CropCard from '@/pages/model/components/CropCard';
import styles from './index.less';
import { connect } from 'react-redux';
import areaPerCrop from '../../CropAreas/areaPerCrop';

const { Option } = Select;

const CropCardForm = (props) => {
  const { value = {}, onChange, selectedCrops, setSelected, flowScen, meta } = props;
  // used to store cropList at this level; used for selector component
  const [cropList, setList] = useState(selectedCrops);
  // used to store special crops(All other crops)
  const [specialId, setSpecial] = useState(1);
  const [specialName, setSpecialName] = useState('');
  // query all crops
  useEffect(() => {
    (async () => {
      const { results: crops } = await getCropListLoadType(flowScen);
      // since there might be a flow scenario change(meaning crop list will be different)
      // we have to make sure crops from different category will not be in the list
      const newSelectedCrops = [];
      selectedCrops.forEach((selectedCrop) => {
        if (crops.find((crop) => `${crop.id}` === selectedCrop.split(',')[0])) {
          newSelectedCrops.push(selectedCrop);
        }
      });
      crops.forEach((item) => {
        if (item.crop_type === CROP_MACROS.ALL_OTHER_CROP) {
          if (!selectedCrops.includes(`${item.id},${item.name}`)) {
            newSelectedCrops.push(`${item.id},${item.name}`);
          }
          setSpecial(item.id);
          setSpecialName(item.name);
        }
      });
      setSelected(newSelectedCrops);
      setList(crops);
    })();
  }, []);

  const formatCrops = (selectedCrops) => {
    var cropsId = [];
    selectedCrops.map((crop) => {
      var id = parseInt(crop.split(",")[0]);
      cropsId.push(id);
    });
    return cropsId;
  };

  const onSelectChange = (v) => {
    if (!v.find((selectedCrop) => parseInt(selectedCrop.split(',')[0], 10) === specialId)) {
      notification.warning({
        message: `Cannot deselect "${specialName}"`,
        description: `You can set "${specialName}" to default(100%)`,
      });
      setSelected([`${specialId},${specialName}`, ...v]);
    } else {
      setSelected(v);
    }
  };
  const onSelect = (selectedValue) => {
    const [id, name] = selectedValue.split(',');
    if (!value.hasOwnProperty(id) && onChange) {
      onChange({
        ...value,
        [id]: {
          load: 100,
          enable: true,
        },
      });
    }
  };
  if (cropList.length === 0) {
    return <Spin />;
  }
  return (
    <>
      <Select
        value={selectedCrops}
        mode="multiple"
        placeholder="Please select a crop to start"
        onChange={onSelectChange}
        onSelect={onSelect}
        className={styles.select}
        showArrow
      >
        {cropList.map((crop) => (
          <Option value={`${crop.id},${crop.name}`} key={crop.id}>
            {crop.name}
          </Option>
        ))}
      </Select>
      <div className={styles.cardList}>
        <List
          rowKey={(record) => record.split(',')[0]}
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
                  enable: true,
                };
            return (
              <List.Item key={id}>
                <CropCard
                  values={value}
                  onChange={onChange}
                  name={name}
                  required={parseInt(id, 10) === specialId}
                  id={id}
                  initialValues={prevValues}
                  cropAreas={areaPerCrop(formatCrops(selectedCrops), meta[`region-${meta.step2Type}-choice`], meta.step2Type, meta.load_scenario)}
                />
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
};

export default connect(({ createModelForm }) => ({
  meta: createModelForm.step,
}))(CropCardForm);

