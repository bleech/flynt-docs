---
title: "Scripts"
weight: 36
menu:
  main:
    parent: "Components"
    weight: 36
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

## Custom Elements

To quote the [Google primer on Custom Elements](https://developers.google.com/web/fundamentals/getting-started/primers/customelements):

> With Custom Elements, web developers can create new HTML tags, beef-up existing HTML tags, or extend the components other developers have authored. The API is the foundation of web components. It brings a web standards-based way to create reusable components using nothing more than vanilla JS/HTML/CSS. The result is less code, modular code, and more reuse in our apps.

We highly recommend reading through the full [Custom Elements primer on Google's Web Fundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/customelements).

By default, to provide sufficient cross-browser support for custom elements, Flynt implements a polyfill within the [DocumentDefault component](/add-link).

### The `is` attribute

In the view template, the `is` attribute is used to declare a component as a custom element. This means we are able to extend native HTML elements ([read more about this here](https://developers.google.com/web/fundamentals/getting-started/primers/customelements#extendhtml)). [We are also able to use this attribute to scope our component styles.](styles.md#scope)

```twig
<div is="flynt-example-component" class="flyntComponent">
  <p>This Example Component has an `is` attribute.</p>
</div>
```

### Custom Elements Template

A basic custom elements script could look like this:

```js
class ExampleComponent extends window.HTMLDivElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.resolveElements()
    return self
  }

  resolveElements () {
    this.$content = $('.exampleComponent-content', this)
  }

  connectedCallback () {
    this.$.on('click', '.exampleComponent-button', this.openContent)
  }

  openContent = (e) => {
    this.$content.addClass('exampleComponent-content-isOpen')
  }
}

window.customElements.define('flynt-example-component', ExampleComponent, {extends: 'div'})
```
