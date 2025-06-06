import React, { useState } from 'react';
import { InputBoolean } from '../tsx/components/Input/InputCheckBox';

export const Basic = () => {
  const [checked, setChecked] = useState(true);
  return <InputBoolean checked={checked} onChange={setChecked} />;
};

export default {
  title: 'orengine/InputBoolean',
  component: InputBoolean,
};
