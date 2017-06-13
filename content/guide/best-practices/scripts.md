---
title: "Scripts"
weight: 21
menu:
  main:
    parent: Best Practices
    identifier: best-practices-scripts
    weight: 21
---

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
