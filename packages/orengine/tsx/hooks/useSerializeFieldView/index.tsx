import { useContext } from 'react';
import { SerializeFieldViewContext } from '../../components/SerializeFieldView/Context/SerializeFieldViewContext';

export const useSerializeFieldView = () => {
  const context = useContext(SerializeFieldViewContext);
  if (!context) {
    throw new Error('SerializeFieldViewContext is not defined');
  }
  return context;
};
