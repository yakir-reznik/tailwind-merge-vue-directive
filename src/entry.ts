import type { DirectiveBinding, App } from "vue";
import { twMerge } from "tailwind-merge";

type ComputeClasses = (
	el: HTMLElement,
	binding: DirectiveBinding,
	vNode: any
) => void;
const computeClasses: ComputeClasses = (el, binding, vNode) => {
	const existingClasses = el.classList.value;
	const inheritedClasses = vNode?.ctx?.attrs as string | undefined;

	// No need to run twMerge if there are no classes
	if (!existingClasses || !inheritedClasses) return;

	// This works because all fallthrough classes are added at the end of the string
	el.classList.value = twMerge(existingClasses, inheritedClasses);
};

export const directive = {
	beforeMount: computeClasses,
	updated: computeClasses,
};

// the actual plugin
export default {
	install: (app: App) => {
		app.directive("twMerge", directive);
	},
};
