export type PossibleTracks =
	| "rain"
	| "birds"
	| "thunder"
	| "volcano"
	| "wind"
	| "beach";

//May be used in the future for styles
// export type ComponentStyles = {

// }

export type SoundsInfo = {
	id: string;
	metadata: {
		type: PossibleTracks;
	};
	styles: {
		colour: string;
		position: [number, number];
		dimensions: [number, number];
	};
	editable?: boolean;
};

export type EmbedsInfo = {
	id: string;
	metadata: {
		type: string;
	};
	styles: {
		colour: null;
		position: [number, number];
		dimensions: [number, number];
	};
};

export type CanvasInfo = {
	name: string;
	creator: string | null;
	size: [number, number];
	sounds: SoundsInfo[];
	embeds: EmbedsInfo[];
};
