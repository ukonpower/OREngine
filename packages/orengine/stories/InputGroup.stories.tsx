import React from 'react';
import { InputGroup } from '../tsx/components/InputGroup';

export const Basic = () => (
  <InputGroup
    title="User Info"
    initialValues={{ name: '', age: 20, active: true }}
    onSubmit={values => alert(JSON.stringify(values))}
  />
);

export default {
  title: 'orengine/InputGroup',
  component: InputGroup,
};
