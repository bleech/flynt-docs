---
title: "Static Assets"
weight: 36
menu:
  main:
    parent: components
    weight: 36
---

All assets (scripts, styles, and images, and SVGs) of a component should be contained within the individual component folder.

Images and SVGs should be placed into the `assets` folder:

```
  ExampleComponent/
  ├── assets/
  |   ├── exampleImage.jpg
  |   └── exampleIcon.svg
```

## Compiling Assets

When gulp is running, excluding Javascript and Stylus files, all other files within the Components folder will be directly copied to the `dist` folder.

All stylus files, with the exception of partials, will be piped through [Autoprefixer](https://github.com/postcss/autoprefixer) and then compiled into the `dist` folder as CSS. [Learn more about component styles here](styles.md).

Javascript files **with the following file names only** will be compiled to the `dist` folder using [Babel](https://babeljs.io/):

- script.js
- auth.js
- admin.js

[Learn more about component scripts here.](/documentation/components/scripts/)

- assets live at component level
- same as components/readme.md section
- how to use utils/asset or link to it.
- using assets in CSS
- how to include static images (needs to be tested in flynt we dunno how that works best)
- how to include svgs
- how to use background images
