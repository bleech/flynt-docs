---
title: Construction Plan
weight: 71
menu:
  main:
    parent: core
    weight: 71
---

The "Construction Plan" is a hierarchical plan for how the site will be constructed, which is created and then rendered by the Flynt Core plugin.

## Configuration

The starting point for creating the construction plan is a configuration representing a component. Multiple components can then be nested through the use of [areas](/guide/components/what-is-component/#what-is-an-area).

The available properties are as follows:

| Property | Description |
| :------: | ----------- |
| **name**<br>*(string)* | *(required)* The name of the component |
| **customData**<br>*(array/object)* | Pass custom data to the component. |
| **parentData**<br>*(array/object)* | Replace parent data of a component (only relevant for advanced use cases) |
| **areas**<br>*(array/object of arrays)* | Defines a component's child components grouped into named areas. The key is the area name, the value is an array of components. |

## Building the construction plan

From this configuration, Flynt Core will then build a Construction Plan by recursively following the below steps:

1. **Initialize empty component data.**
   `$config['data']` is set to an empty array. This is the starting point for every creation. As such, you **cannot** pass `data` through the config directly. Use `customData` instead.

2. **Set parent data to either the *parentData* specified in the config, the component's parent's data, or an empty array.**
   The parent data is passed to multiple filters that will be called later in the building process. It is determined either by `parentData` specified in the config or by the actual data from the component's parent. Can be an empty array.

3. **Merge *customData* into component data.**
   In order to add additional data, `customData` can be added through the config. This will be merged with the existing component data.

4. **Apply general filter `Flynt/addComponentData`.**
   In the previous steps the component data was determined by values passed through the config. This filter is applied for every component. Every filter you add here will be applied to every component. This make it the designated place to add default data that you want to access in every component.

5. **Apply component specific filter `Flynt/addComponentData?name={$componentName}`.**
   This filter targets a specific component specified by the `componentName`. It can be used to do some default data manipulation that is needed for rendering the component. Since no data logic should be added to a template (except simple loops or control statements) every preparation, formatting, etc. should be done here. This filter will usually be added in a components *functions.php*.

6. **Apply component specific filter `Flynt/dynamicSubcomponents?name={$componentName}`.**
   This can be used to add sub components (components in an area) to a component.

7. **Do the same for sub components specified in - and dynamically added to - *areas*.**
   The final step for one component is doing the same construction logic for each sub component.

## Rendering the construction plan

The construction plan contains all the information needed to be rendered. This recursive rendering can be summarized in the following steps:

1. **Render construction plan for areas**
   The recursive rendering starts by traversing down the component's areas rendering each component and joining the components' rendering output to one HTML string for each area.

2. **Apply general filter `Flynt/renderComponent`**
   This filter is called for every component. This is the designated place to define general rendering rules e.g. integrating a template engine.

3. **Apply the component specific filter `Flynt/renderComponent?name={$componentName}`**
   This filter can be used to target component specific rendering.
