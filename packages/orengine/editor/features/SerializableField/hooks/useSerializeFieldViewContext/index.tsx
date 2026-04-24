import * as MXP from 'maxpower';
import { useWatchSerializable } from '../useWatchSerializable';

export const useSerializeFieldViewContext = (props: { target: MXP.Serializable }) => {
  useWatchSerializable(props.target);
  return { target: props.target };
};
