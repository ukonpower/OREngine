import { createContext } from "react";

import { useTimelineContext } from "../../Hooks/useTimelineContext";

export const TimelineContext = createContext<ReturnType<typeof useTimelineContext> | null>( null );
