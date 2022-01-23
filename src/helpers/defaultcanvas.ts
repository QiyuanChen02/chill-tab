import { nanoid } from "nanoid";
import { CanvasInfo } from "../types/canvascomponents";

const defaultCanvas: CanvasInfo = {
	name: "Basic canvas",
	creator: null,
	size: [800, 500],
	sounds: [
		{
			id: nanoid(),
			type: "rain",
			styles: {
				position: [100, 100],
				dimensions: [100, 100],
				colour: "#FF0000",
			},
		},
		{
			id: nanoid(),
			type: "volcano",
			styles: {
				position: [500, 100],
				dimensions: [200, 200],
				colour: "#FFFF00",
			},
		},
	],
	embeds: [
		{
			id: nanoid(),
			type: "spotify",
			styles: {
				position: [500, 400],
				dimensions: [200, 100],
				colour: null,
			},
		},
	],
};

export { defaultCanvas };
