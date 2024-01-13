
# tailwind-merge-vue-directive

A Vue.js plugin that adds a "v-tw-merge" directive that you can use in your components to automatically merge tailwind classes that were passed from the parent with classes that exist on the component level (example below).

To achieve the tailwind class merging behavior this package uses [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) under the hood.

## Get started
[What is this for?](#what-is-this-for)  
[How to install](#how-to-install)  
[How to use](#how-to-use)  
[Example](#example)  


## How to install:
<a name="how-to-install"></a>
```
npm install tailwind-merge-vue-directive
```


## How to use in your Vue app:
<a name="how-to-use"></a>
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


## Example
<a name="example"></a>
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

The classes that were passed from `ParentComponent.vue` will override the classes that were specified in `ChildComponent.vue`


## What is this for?
<a name="what-is-this-for"></a>
When using [Tailwind CSS](https://tailwindcss.com/) to style [Vue](https://vuejs.org/) components, you might encounter a situation where you want to change some styles of a component, but only for a specific instance of the component.

For demonstration purposes let's assume we have this component:
```vue
// MyButton.vue
<template>
   <button class="bg-red-600 text-white px-6 py-2 rounded">
      <slot/>
   </button>
</template>
```

Now let's assume we want to use this `MyButton` component in our `App.vue`, but just this time we want the button to be blue instead of red.

Seeminglty, the solution to this problem is quite obvjous.   
We can just to pass a class attribute when using the component.

```vue
// App.vue
<template>
   ...
   <MyButton class="bg-blue-600">My blue button</MyButton>
   ...
</template>
```

Because of how Vue works, the `class` attribute that was defined on the component instance in `App.vue` will be appended to the existing `class` attribute in `MyButton.vue`.

The final rendered HTML will look like this:
```vue
<button class="bg-red-600 text-white px-6 py-2 rounded bg-blue-600">My blue button</button> 
```

It is important to point out that the order of the classes in the `class` attribute does not matter at all.  
CSS rules are applied by specificity, when two selectors have the same specificity score the selector that was declared last "wins".  
You can read more about how the CSS Cascade works [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade).

In the CSS file that Tailwind generates, both of the selectors `.bg-red-600` and `.bg-blue-600` have the exact same specificity score.  
The `.bg-red-600` selector is defined after the `.bg-blue-600` selector simply because tailwind generates the color class names based on alphabetical order.  
This means our rendered button will be have a red background, which is not what we wanted.

In order to solve this problem a package called ["tailwind-merge"](https://github.com/dcastil/tailwind-merge) was created by [Dany Castillo](https://github.com/dcastil).

The tailwind-merge package gives you a function that you can pass all the class names to.  
The function will "merge" conflicting classes while ignoring the specificity score of the selectors and instead giving classes that where defined later precedence.

```typescript
import {twMerge} from 'tailwind-merge'
const classes = twMerge('bg-red-600 bg-blue-600')
console.log(classes) // will output: "bg-blue-600"
```

I have created this package (tailwind-merge-vue-directive) to simplify the process of merging conflicting tailwind classes on Vue components.

After installing the package you can simply use a `v-tw-merge` directive on your components' markup to automatically merge confilicting classes using the `twMerge` function provided by ["tailwind-merge"](https://www.npmjs.com/package/tailwind-merge).