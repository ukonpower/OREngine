import React, { useState } from 'react';
import { InputText } from '../tsx/components/Input/InputText';

export const Basic = () => {
  const [value, setValue] = useState('Hello');
  return <InputText value={value} onChange={setValue} />;
};

export default {
  title: 'orengine/InputText',
  component: InputText,
};

