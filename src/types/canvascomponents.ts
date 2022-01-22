import { PossibleTracks } from "../components/naturesounds";

export type SoundsInfo = {
	id: string;
	type: PossibleTracks;
	position: [number, number];
	dimensions: [number, number];
	colour: string;
	editable?: boolean;
};

export type EmbedsInfo = {
	id: string;
	type: string;
	position: [number, number];
	dimensions: [number, number];
	editable?: boolean;
};
