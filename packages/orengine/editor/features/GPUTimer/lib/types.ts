export interface TimerSample {
	name: string;
	duration: number;
	timestamp: number;
	renderType: string;
}

export interface TimerStatistics {
	name: string;
	renderType: string;
	entityId?: string;
	current: number;
	avg: number;
	max: number;
	min: number;
	samples: number;
	percentage: number;
}

export interface TimerDuration {
	name: string;
	duration: number;
}
