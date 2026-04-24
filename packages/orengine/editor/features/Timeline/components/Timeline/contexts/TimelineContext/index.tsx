import { createContext } from "react";

import { useTimelineContext } from "../../hooks/useTimelineContext";

export const TimelineContext = createContext<ReturnType<typeof useTimelineContext> | null>( null );
