import React from 'react';
import { Tag } from 'antd';

/**
 * render tags that display the scentario type
 * @param props
 * @returns {JSX.Element} a customized ant design tag component
 * @see {@link https://ant.design/components/tag ant design tag}
 */
const TagRender = ({value, closable, onClose}) => {
  let color;
  switch (value) {
    default:
    case 'original':
      color = 'volcano';
      break;
    case 'public':
      color = 'geekblue';
      break;
    case 'base':
      color = 'green';
  }
  return (
    <Tag color={color} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {value}
    </Tag>
  );
};

export default TagRender;