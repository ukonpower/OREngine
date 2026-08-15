import { ReactNode } from "react";

import { TimelineContext } from "../contexts/TimelineContext";
import { useTimelineContext } from "../hooks/useTimelineContext";

// タイムラインの再生状態・ビューポートを配下ツリーへ提供する
export const TimelineProvider: React.FC<{ children?: ReactNode }> = ( props ) => {

	const context = useTimelineContext();

	return <TimelineContext.Provider value={context}>{props.children}</TimelineContext.Provider>;

};
