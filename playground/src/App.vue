<template>
	<div class="p-4">
		<div class="p-12 border-2 border-red-500">
			<h1>Hello world</h1>
			<Child class="text-lg" :class="additionalClasses" />
			<button @click="testFn">asadas</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import Child from "./components/Child.vue";
import { ref } from "vue";

const additionalClasses = ref("text-blue-500");

const testFn = () => {
	additionalClasses.value = "text-amber-500";
};
</script>

<style lang="sass" scoped></style>
