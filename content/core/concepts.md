---
title: Concepts
weight: 71
menu:
  main:
    parent: Core
    identifier: core-concepts
    weight: 71
---

## Main principles

The main functionality of the Flynt Core can be seen as a HTML generator. Given a minimal configuration the Flynt Core plugin first creates a "Construction Plan" and then renders it.

<!-- TODO: Should then either explain the construction plan or link to the section where its explained, or they could think 'what the heck is the construction plan'...?  -->

### Config

The starting point for the entire process is a configuration representing a component. Multiple components can then be nested through the use of **areas**.

The available properties are as follows:

| Property | Description |
| :------: | ----------- |
| **name**<br>*(string)* | *(required)* name of the component |
| **dataFilter**<br>*(string)* | a Wordpress filter that will be called to retrieve the component's data |
| **dataFilterArgs**<br>*(array)* | arguments to pass to the *dataFilter* |
| **customData**<br>*(array/object)* | pass custom data to the component. When used with *dataFilter* on the same component, it will the data will be merged. When used alone it will replace the components data. |
| **parentData**<br>*(array/object)* | replace parent data of a component (only relevant for advanced use cases) |
| **areas**<br>*(array/object of arrays)* | defines a component's child components grouped into named areas. The key is the area name, the value is an array of components. |

### Build the construction plan

From this configuration file, Flynt Core will then build a Construction Plan by recursively following the below steps:

1. **Initialize empty component data.**  
   `$config['data']` is set to an empty array. This is the starting point for every creation. As such, you **cannot** pass `data` through the config directly. Use `customData` instead.

2. **Set parent data to either the *parentData* specified in the config, the component's parent's data, or an empty array.**  
   The parent data is passed to multiple filters that will be called later in the building process. It is determined either by `parentData` specified in the config or by the actual data from the component's parent. Can be an empty array.

3. **Apply *dataFilter* with *dataFilterArgs* to component data.**  
   The first situation where data can be assigned to the component itself. A filter with the name passed to `dataFilter` will be applied with the initially empty component data and the `dataFilterArgs`. This can be an arbitrary name but we advice to namespace / prefix it with e.g. `Flynt/DataFiltes/`.

4. **Merge *customData* into component data.**  
   In order to add additional data or replace certain data retrieved by the `dataFilter`, `customData` can be added through the config. This will be merged with the existing component data.

5. **Apply general filter `Flynt/addComponentData`.**  
   In the previous steps the component data was determined by values passed through the config. This filter is applied for every component. Every filter you add here will be applied to every component. This make it the designated place to add default data that you want to access in every component.

6. **Apply component specific filter `Flynt/addComponentData?name={$componentName}`.**  
   This filter targets a specific component specified by the `componentName`. It can be used to do some default data manipulation that is needed for rendering the component. Since no data logic should be added to a template (except simple loops or control statements) every preparation, formating, etc. should be done here. This filter will usually be added in a components *function.php*.

7. **Apply component specific filter `Flynt/dynamicSubcomponents?name={$componentName}`.**  
   This can be used to add sub components (components in an area) to a component. It is useful for adding a sub component based on data that comes from a data filter.

8. **Do the same for subcomponent specified in - and dynamically added to - *areas*.**  
   The final step for one component is doing the same construction logic for each of the component's area's sub components.

### Render construction plan

The construction plan contains all the information needed to be rendered. This recursive rendering can be summarized in the following steps:

1. **Render construction plan for areas**  
   The recursive rendering starts by traversing down the component's areas rendering each component and joining the components' rendering output to one HTML string for each area.

2. **Apply general filter `Flynt/renderComponent`**  
   This filter is called for every component. This is the designated place to define general rendering rules like e.g. integrating a template engine.

3. **Apply the component specific filter `Flynt/renderComponent?name={$componentName}`**  
   This filter can be used to target component specific rendering.
