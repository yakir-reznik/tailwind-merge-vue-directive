/**
 * This directive will automatically use twMerge
 * to merge a components classes with fallthrough inherited classes
 *
 * Exmaple:
 * --- ChildComponent.vue ---------------------------------------------
 * <div class="bg-red-300 text-lg" v-tw-merge />
 * ---------------------------------------------------------
 *
 * --- ParentComponent.vue ---------------------------------------------
 * <ChildComponent class="bg-amber-300" />
 * Final classes will be: 'bg-amber-300 text-lg'
 * ---------------------------------------------------------
 *
 */

import type { App } from "vue";
import { twMerge } from "tailwind-merge";

export default {
	install: (app: App) => {
		app.directive("twMerge", {
			beforeMount: computeClasses,
			updated: computeClasses,
		});
	},
};

type ComputeClasses = (el: HTMLElement) => void;
const computeClasses: ComputeClasses = (el) => {
	const classes = el.classList.value;

	// No need to run twMerge if there are no classes
	if (!classes) return;

	// This works because all fallthrough classes are added at the end of the string
	el.classList.value = twMerge(classes);
};
