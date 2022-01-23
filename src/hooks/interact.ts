import interact from "interactjs";
import { useEffect } from "react";

function dragMoveListener(event: { target: any; dx: number; dy: number }) {
	const target = event.target;
	// keep the dragged position in the data-x/data-y attributes
	const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
	const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

	// translate the element
	target.style.transform = "translate(" + x + "px, " + y + "px)";

	// update the posiion attributes
	target.setAttribute("data-x", x);
	target.setAttribute("data-y", y);
}

function resizeListener(event: {
	target: any;
	rect: { width: string; height: string };
	deltaRect: { left: number; top: number };
}) {
	const target = event.target;
	let x = parseFloat(target.getAttribute("data-x")) || 0;
	let y = parseFloat(target.getAttribute("data-y")) || 0;

	// update the element's style
	target.style.width = event.rect.width + "px";
	target.style.height = event.rect.height + "px";

	// translate when resizing from top or left edges
	x += event.deltaRect.left;
	y += event.deltaRect.top;

	target.style.transform = "translate(" + x + "px," + y + "px)";

	target.setAttribute("data-x", x);
	target.setAttribute("data-y", y);
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
