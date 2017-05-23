---
title: Introduction
weight: 30
aliases: 
  - /documentation/components/
menu:
  main:
    parent: Components
    weight: 30
---

A component is a self-contained building-block. Each component has its own scope. As such, each component is kept within its own folder which contains everything it requires; the layout, the back-end field setup, all necessary Wordpress filter and hook logic, scripting, styles, and images.

```
  ExampleComponent/
  ├── assets/
  |   ├── exampleImage.jpg
  |   └── exampleIcon.svg
  ├── fields.json
  ├── functions.php
  ├── index.twig
  ├── README.md
  ├── script.js
  ├── style.styl
```

Building components is a sustainable process, meaning every component you develop can be reused within a project, or in another; increasing your head-start with every new Flynt project.

## Areas
Since components are self-contained, areas provide a way to stack our building-blocks together. An area is simply a location within a component where it is possible to add other components.
