import React, { useState } from 'react';
import { InputNumber } from '../tsx/components/Input/InputNumber';

export const Basic = () => {
  const [value, setValue] = useState(0);
  return <InputNumber value={value} onChange={setValue} />;
};

export default {
  title: 'orengine/InputNumber',
  component: InputNumber,
};
