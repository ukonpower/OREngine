import React, { useState } from 'react';
import { Vector } from '../tsx/components/Vector';

export const Basic = () => {
  const [value, setValue] = useState([0, 0, 0]);
  return <Vector value={value} onChange={setValue} />;
};

export default {
  title: 'orengine/Vector',
  component: Vector,
};
