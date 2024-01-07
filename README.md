
# tailwind-merge-vue-directive

  

A Vue.js plugin that adds a "v-tw-merge" directive that you can use in your components to automatically merge tailwind classes that were passed from the parent with classes that exist on the component level (example below).

To achieve the tailwind class merging behavior this package uses [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) under the hood.

## Example
```vue
// ParentComponent.vue
<template>
   <div>
      ...
      <ChildComponent class="text-amber-500" />
      ...
   </div>
</template>
```
```vue
// ChildComponent.vue
<template>
   <div  class="text-2xl text-red-500" v-tw-merge>
      Lorem ipsum dolor sit amet consectetur adipisicing elit
   </div>
</template>
```
ChildComponent.vue will be rendered as:
```vue
<div  class="text-2xl text-amber-500">
   Lorem ipsum dolor sit amet consectetur adipisicing elit
</div>
```

The classes that were passed from *ParentComponent.vue* will override the classes that were specified in *ChildComponent.vue*

## How to install:
```
npm install tailwind-merge-vue-directive
```

## How to use in your Vue app:

  

Register the plugin:
```ts
// main.ts (or main.js)
import  {  createApp  }  from  "vue";
import App from  "./App.vue";

// import the tailwind-merge-vue-directive package
import twMergeDirective from  "tailwind-merge-vue-directive";

const app =  createApp(App);
app.use(twMergeDirective);// register the plugin
app.mount("#app");
```

Use the directive on your Vue components:
```vue
// SomeComponent.vue
<template>
   <div class="h-20 w-20 bg-red-500" v-tw-merge/>
</template>
```
Or:
```vue
// SomeComponent.vue
<template>
   <div class="h-20 w-20 bg-red-500" v-twMerge/>
</template>
```