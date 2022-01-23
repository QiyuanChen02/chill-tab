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
	type: PossibleTracks;
	styles: {
		position: [number, number];
		dimensions: [number, number];
		colour: string;
	};
	editable?: boolean;
};

export type EmbedsInfo = {
	id: string;
	type: string;
	styles: {
		position: [number, number];
		dimensions: [number, number];
		colour: null;
	};
	editable?: boolean;
};

export type CanvasInfo = {
	name: string;
	creator: string | null;
	size: [number, number];
	sounds: SoundsInfo[];
	embeds: EmbedsInfo[];
};
