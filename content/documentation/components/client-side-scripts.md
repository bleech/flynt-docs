---
title: Client Side Scripts
weight: 33
menu:
  main:
    parent: components
    identifier: component-scripts
    name: Client Side Scripts
    weight: 33
---

To add scripts to a component, create a `script.js` file within the individual component folder. This file will be automatically compiled to the `dist` folder using [Babel](https://babeljs.io/).

In this file, you can write your scripts however you wish. Flynt does not enforce any further requirements on your scripts. However, we strongly recommend using [Custom Elements](https://github.com/webcomponents/custom-elements).

## Add Dependencies

Third party dependencies must be copied to the `dist` folder before they can be [enqueued](functions.md#enqueueing-assets-and-dependencies). This is done within the script of the component, using [Webpack File Loader](https://github.com/webpack-contrib/file-loader).

At the top of the component script, a file can be imported in the following format:

```js
import `file-loader?name=vendor/${fileName.js}!${fileNameInNodeModules.js}'`
```

For example:

```js
import 'file-loader?name=vendor/slick.js!slick-carousel/slick/slick.min'
import 'file-loader?name=vendor/slick.css!csso-loader!slick-carousel/slick/slick.css'
```
