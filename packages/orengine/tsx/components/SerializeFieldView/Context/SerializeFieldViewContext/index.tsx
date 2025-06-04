import { createContext } from 'react';

import { useSerializeFieldViewContext } from '../../Hooks/useSerializeFieldViewContext';

export const SerializeFieldViewContext = createContext<ReturnType<typeof useSerializeFieldViewContext> | undefined>( undefined );
