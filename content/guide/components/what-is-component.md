---
title: What is a Component?
weight: 30
aliases:
  - /guide/components/
menu:
  main:
    parent: components
    weight: 30
---

A component is a self-contained building-block. As such, each component is kept within its own folder which contains everything it requires; the layout, the Advanced Custom Fields field setup, all necessary WordPress filter and hook logic, scripting, styles, and images.

```
  ExampleComponent/
  ├── assets/
  |   ├── exampleImage.jpg
  |   └── exampleIcon.svg
  ├── fields.json
  ├── functions.php
  ├── index.twig
  ├── preview-mobile.jpg
  ├── preview-desktop.jpg
  ├── README.md
  ├── script.js
  ├── style.styl
```

Building components is a sustainable process, meaning every component you develop can be reused within a project, or in another; increasing your head-start with every new Flynt project.

To quickly and easily build new components, we recommend using the [Flynt Yeoman Generator](https://github.com/flyntwp/generator-flynt).

## What is an area?
Since components are self-contained, areas provide a way to stack our building-blocks together. An area is simply a location within a component where it is possible to add other components.

Areas are most often defined inside [page templates](/guide/configuration/page-templates/#configuring-page-templates) and are output using the helper function `area` in the [view template](/guide/components/view-templates/) of a component.

For example, the `DocumentDefault` component renders the `layout` area in `DocumentDefault/index.twig`:

```twig
<!DOCTYPE html>
<html class="flyntComponent {{ body_class }}" lang="{{ site.language }}" dir="{{ dir }}" is="flynt-document-default">
  <head><!--...--></head>
  <body role="document">
    {{ area('layout') }}
    {{ wp_footer }}
  </body>
</html>
```

The `area` helper function is created by the [TimberLoader](https://github.com/flyntwp/flynt-starter-theme/blob/master/Features/TimberLoader/README.md) feature using the `renderComponent` filter provided by [Flynt Core](/guide/core/).

## Organizing Components into Categories

Components are always categorized according to their predominant use case. This helps to clarify the purpose of a component and in quickly identifying an appropriate component to re-use. The name of every component is prefixed with one of the following categories:
- Table
<div class="alert alert-list">
  <ul>
    <li>
      <strong>Accordion</strong><br>
      For collapsable content, e.g. FAQs.
    </li>
    <li>
      <strong>Block</strong><br>
      The fallback for full width components. Use only when there is no better, more specific category.
    </li>
    <li>
      <strong>Calendar</strong><br>
      For a component where the mean feature is a calendar.
    </li>
    <li>
      <strong>ComponentLoader</strong><br>
      For a component used only to load other components into it.
    </li>
    <li>
      <strong>Document</strong><br>
      A HTML document.
    </li>
    <li>
      <strong>Form</strong><br>
      For when entering user data is the main purpose.
    </li>
    <li>
      <strong>Grid</strong><br>
      Its elements will be arranged in a multi-column and multi-row grid.
    </li>
    <li>
      <strong>Hero</strong><br>
      A component that attracts a lot of attention and takes up significant space.
    </li>
    <li>
      <strong>Layout</strong><br>
      Page or post layouts.
    </li>
    <li>
      <strong>List</strong><br>
      Its elements typically have a fixed width, align horizontally and will flow into a new row.
    </li>
    <li>
      <strong>Map</strong><br>
      A graphical map (like a Google Map).
    </li>
    <li>
      <strong>Modal</strong><br>
      It opens like a dialog.
    </li>
    <li>
      <strong>Navigation</strong><br>
      A series of links used as a navigation.
    </li>
    <li>
      <strong>Sidebar</strong><br>
      Typically part of a layout that holds other components.
    </li>
    <li>
      <strong>Slider</strong><br>
      No matter if it slides, fades, or explodes; it displays a series of content.
    </li>
    <li>
      <strong>Table</strong><br>
      For a component that displays tabular data.
    </li>
    <li>
      <strong>Tabs</strong><br>
      Uses horizontally or vertically aligned buttons to change content in a target container.
    </li>
  </ul>
</div>
