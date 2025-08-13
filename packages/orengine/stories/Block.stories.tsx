import React from 'react';
import { Block } from '../tsx/components/Block';

export const Basic = () => (
  <Block label="Example Block">
    <div style={{ padding: '8px', background: '#eee' }}>Content</div>
  </Block>
);

export const Accordion = () => (
  <Block label="Accordion Block" accordion>
    <div style={{ padding: '8px' }}>Hidden Content</div>
  </Block>
);

export default {
  title: 'orengine/Block',
  component: Block,
};
