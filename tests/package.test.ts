import { expect, test } from "vitest";
import { config, mount } from "@vue/test-utils";
import { directive } from "../src/entry";

import ParentComponent from "./ParentComponent.vue";

config.global.directives = {
	twMerge: directive,
};

test("mount component", async () => {
	expect(ParentComponent).toBeTruthy();

	const parentEl = mount(ParentComponent, {
		props: {},
	});

	const childEl = parentEl.findComponent({ name: "ChildComponent" });
	expect(childEl.classes()).toStrictEqual(["text-lg", "text-blue-500"]);

	// expect(el.text()).toContain("4 x 2 = 8");
	// expect(wrapper.html()).toMatchSnapshot();

	// await wrapper.get("button").trigger("click");

	// expect(wrapper.text()).toContain("4 x 3 = 12");

	// await wrapper.get("button").trigger("click");

	// expect(wrapper.text()).toContain("4 x 4 = 16");
});
