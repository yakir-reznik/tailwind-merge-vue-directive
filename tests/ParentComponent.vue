<template>
	<div class="p-4">
		<div class="p-12 border-2 border-red-500">
			<h1>Hello world</h1>
			<ChildComponent class="text-lg text-blue-500" />
		</div>
	</div>
</template>

<script setup lang="ts">
import ChildComponent from "./ChildComponent.vue";
</script>
