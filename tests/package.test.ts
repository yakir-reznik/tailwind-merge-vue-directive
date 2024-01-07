import { expect, test } from "vitest";
import { config, mount } from "@vue/test-utils";
import { directive } from "../src/entry";

import TestComponent from "./TestComponent.vue";

config.global.directives = {
	twMerge: directive,
};

const hard_coded_classes = "text-sm text-red-500 w-20 inline-block".split(" ");

test("Mount without additonal classes", async () => {
	const el = mount(TestComponent, {
		props: {},
	});

	expect(el.classes()).toStrictEqual(hard_coded_classes);
});

test("Mount with additonal static classes", async () => {
	const el = mount(TestComponent, {
		props: {},
		attrs: {
			class: "text-lg text-blue-500",
		},
	});

	expect(el.classes()).toStrictEqual([
		"w-20",
		"inline-block",
		"text-lg",
		"text-blue-500",
	]);
});
