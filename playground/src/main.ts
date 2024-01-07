import "./assets/base.css";

import { createApp } from "vue";
import App from "./App.vue";

import type { App as VueApp, DirectiveBinding, VNode } from "vue";
import { twMerge } from "tailwind-merge";
// import p from "tailwind-merge-vue-directive";

const plugin = {
	install: (app: VueApp) => {
		app.directive("twMerge", {
			beforeMount: computeClasses,
			updated: computeClasses,
		});
	},
};

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

const app = createApp(App);
app.use(plugin);
// app.use(p);
app.mount("#app");
