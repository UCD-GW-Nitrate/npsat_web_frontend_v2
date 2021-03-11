import { Form } from 'antd';
import React from 'react';
import SelectAndMap from '@/pages/model/components/RegionFormItem/MapSelect';
import styles from '../index.less';

/**
 * Base form item extensible for all regions
 * @param data used for parent component Form
 * @param regionType region macros
 * @param formLabel label for form item
 * @param configureData function passing into SelectAndMap
 * @param getData function passing into SelectAndMap
 * @param placeholder string passing into SelectAndMap
 * @returns {JSX.Element}
 * @constructor
 */
const BaseFormItem = ({
  data = {},
  regionType,
  formLabel,
  configureData,
  getData,
  placeholder,
}) => {
  return (
    <Form.Item
      className={styles.stepForm}
      name={`region-${regionType}-choice`}
      label={formLabel}
      rules={[
        {
          required: true,
          message: `Please choose at least one ${formLabel.toLowerCase()} or other region(s)`,
        },
      ]}
      initialValue={
        data.hasOwnProperty(`region-${regionType}-choice`)
          ? data[`region-${regionType}-choice`]
          : []
      }
    >
      <SelectAndMap configureData={configureData} getData={getData} placeholder={placeholder} />
    </Form.Item>
  );
};

export default BaseFormItem;
