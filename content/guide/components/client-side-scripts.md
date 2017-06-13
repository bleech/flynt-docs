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

To add scripts to a component, create a `script.js` file within the individual component folder. This file will be automatically compiled to the theme's `dist` folder using [Babel](https://babeljs.io/).

In this file, you can write your scripts however you wish. Flynt does not enforce any further requirements on your scripts. However, we have created a [collection of best practices for client side scripting which we strongly recommend following](/guide/best-practices/scripts).

## Add Third Party Dependencies

Third party dependencies must be copied to the theme's `dist` folder before they can be [enqueued](/guide/components/server-side-logic/#enqueueing-assets-and-dependencies). This is done within the script of the component, using the [Webpack File Loader](https://github.com/webpack-contrib/file-loader).

At the top of the component script, a file can be imported in the following format:

```js
import `file-loader?name=vendor/${fileName.js}!${fileNameInNodeModules.js}'`
```

The Webpack file loader will automatically find all files installed via [npm](https://www.npmjs.org) or [Yarn](https://yarnpkg.com/). For example:

In the terminal, navigate to the flynt theme directory and use Yarn to add [slick-carousel](https://www.npmjs.com/package/slick-carousel):

```
yarn add slick-carousel
```

In the script file, it is then possible to add this dependency:

```js
import 'file-loader?name=vendor/slick.js!slick-carousel/slick/slick.min'
import 'file-loader?name=vendor/slick.css!csso-loader!slick-carousel/slick/slick.css'
```
