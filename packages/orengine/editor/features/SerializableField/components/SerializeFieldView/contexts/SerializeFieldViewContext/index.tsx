import { createContext } from 'react';
import { useSerializeFieldViewContext } from '../../../../hooks/useSerializeFieldViewContext';

export const SerializeFieldViewContext = createContext<ReturnType<typeof useSerializeFieldViewContext> | undefined>(undefined);
