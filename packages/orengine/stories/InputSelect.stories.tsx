import React, { useState } from 'react';
import { InputSelect } from '../tsx/components/Input/InputSelect';

export const Basic = () => {
  const [value, setValue] = useState('A');
  return (
    <InputSelect
      value={value}
      selectList={['A', 'B', 'C']}
      onChange={setValue}
    />
  );
};

export default {
  title: 'orengine/InputSelect',
  component: InputSelect,
};
