import { Form } from 'antd';
import React from 'react';
import SelectAndMap from '@/pages/model/components/RegionFormItem/MapSelect';

/**
 * Base form item extensible for all regions
 * @param data used for parent component Form
 * @param regionType region macros
 * @param formLabel label for form item
 * @returns {JSX.Element}
 * @constructor
 */
const BaseFormItem = ({ data = {}, regionType, formLabel }) => {
  return (
      <Form.Item
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
        <SelectAndMap />
      </Form.Item>
  );
};

export default BaseFormItem;
