import interact from "interactjs";
import { useEffect } from "react";

function dragMoveListener(event: { target: any; dx: number; dy: number }) {
	const target = event.target;
	const marginTop = target.style.marginTop; //needs the state
	const marginLeft = target.style.marginLeft;
	const x =
		parseFloat(marginLeft.substring(0, marginTop.length - 2)) + event.dx;
	const y =
		parseFloat(marginTop.substring(0, marginTop.length - 2)) + event.dy;

	// update the position attributes
	target.style.marginLeft = x + "px";
	target.style.marginTop = y + "px";
}

function resizeListener(event: {
	target: any;
	rect: { width: string; height: string };
	deltaRect: { left: number; top: number };
}) {
	const target = event.target;

	const marginTop = target.style.marginTop;
	const marginLeft = target.style.marginLeft;

	let x = parseFloat(marginLeft.substring(0, marginTop.length - 2));
	let y = parseFloat(marginTop.substring(0, marginTop.length - 2));

	// update the element's style
	target.style.width = event.rect.width + "px";
	target.style.height = event.rect.height + "px";

	// translate when resizing from top or left edges
	x += event.deltaRect.left;
	y += event.deltaRect.top;

	// update the position attributes
	target.style.marginLeft = x + "px";
	target.style.marginTop = y + "px";
}

const dragSettings = {
	// enable inertial throwing
	inertia: true,
	// keep the element within the area of it's parent
	modifiers: [
		interact.modifiers.restrictRect({
			restriction: "parent",
			endOnly: true,
		}),
	],

	// enable autoScroll
	autoScroll: true,

	listeners: {
		move: dragMoveListener,
	},
};

const resizeSettings = {
	edges: { left: true, right: true, bottom: true, top: true },

	inertia: true,

	listeners: {
		move: resizeListener,
	},

	modifiers: [
		// keep the edges inside the parent
		interact.modifiers.restrictEdges({
			outer: "parent",
		}),

		// minimum size
		interact.modifiers.restrictSize({
			min: { width: 100, height: 50 },
		}),
	],
};

//Makes all code draggable
export function useInteract(editable: boolean) {
	useEffect(() => {
		if (editable) {
			interact(".resize-drag")
				.draggable(dragSettings)
				.resizable(resizeSettings);
		}

		return () => interact(".resize-drag").unset();
	}, [editable]);
}
