---
title: "Adding Styles and Scripts"
weight: 22
menu:
  main:
    parent: creating-component
    weight: 22
---

To add CSS to a component, you can add a style file either as a plain CSS file (.css), or as a [Stylus](http://stylus-lang.com/) file (.styl). In this tutorial, we will use Stylus.

Create `style.styl` in your `BlockQuote` folder, so that your file tree matches the following:

```
├── flynt-starter-theme
|  ├──Components
|  |  ├── BlockQuote
|  |  |  ├── fields.json
|  |  |  ├── index.twig
|  |  |  └── style.styl
```

Next, lets open `style.styl` and add some basic styling. We'll be using the [recommended Flynt best practices](/tutorials/best-practices/styles/) when it comes to styling our component.

```stylus
.flyntComponent[is='flynt-block-quote']
  *,
  *:before,
  *:after
    box-sizing: border-box

  .blockQuote
    background: #ccc
    padding: 30px
    border-left: 5px solid #558c89
```

Providing you have run `flynt start` in your terminal, Flynt will now compile `Components/BlockQuote/style.styl` into `dist/Components/BlockQuote/style.css`.

## Enqueuing your assets
**There is one crucial step missing.** To load these styles into the front end, you must enqueue these styles using the `functions.php` file of your component. [The functions file can be used for all of your custom server side logic that is specific to your component](documentation/components/server-side-logic/).

First, create `functions.php` inside your BlockQuote component. Your file tree should now look like this:

```
├── flynt-starter-theme
|  ├──Components
|  |  ├── BlockQuote
|  |  |  ├── fields.json
|  |  |  ├── functions.php
|  |  |  ├── index.twig
|  |  |  └── style.styl
```

Inside `functions.php` we will use the [Component feature](/documentation/features/what-is-feature/) inside the [WordPress `wp_enqueue_scripts` action](https://codex.wordpress.org/Plugin_API/Action_Reference/wp_enqueue_scripts) to enqueue our style file.

Add the following code to `Components/BlockQuote/functions.php`.

```php
<?php
namespace Flynt\Components\BlockQuote;

use Flynt\Features\Components\Component;

add_action('wp_enqueue_scripts', function () {
    Component::enqueueAssets('BlockQuote');
});
```

Flynt will now look for `Components/BlockQuote/style.css`, and enqueue the file if it is found.

Refresh the front end of your website and you will now see your styles!

## Adding scripts
To add custom JavaScript logic to your component, create a `script.js` file inside your component, so that your file tree matches the following:

```
├── flynt-starter-theme
|  ├──Components
|  |  ├── BlockQuote
|  |  |  ├── fields.json
|  |  |  ├── functions.php
|  |  |  ├── index.twig
|  |  |  ├── script.js
|  |  |  └── style.styl
```

Inside `script.js` you can add all of the JavaScript logic that you wish. Flynt supports ES2015 (ES6) out of the box, and will compile your script to ES5 using [Babel](https://babeljs.io/).

Open `Components/BlockQuote/script.js` and add the following:

```js
class BlockQuote extends window.HTMLDivElement {
  connectedCallback () {
    console.log('The BlockQuote component has been inserted into the DOM!')
  }
}

window.customElements.define('flynt-block-quote', BlockQuote, {extends: 'div'})
```

To load this script into the front end, you must ensure you have enqueued the assets for this component, [as shown above](/tutorials/creating-component/adding-styles-scripts/#enqueuing-your-assets). Flynt will then look for `Components/BlockQuote/script.js` and enqueue the file if found.

That's it - refresh the front end and check your console!

<div class="alert alert-steps">
  <h2>Tutorial Complete!</h2>

  <p>That's it! You've created a basic component with a view template, dynamic fields, styles, and scripts.</p>

  <h3>Next Steps</h3>

  <ul>
    <li><a href="/documentation/components">Explore the full Component documentation.</a></li>
    <li><a href="/tutorials/best-practices">Learn about our recommended Flynt best practices.</a></li>
    <li><a href="https://github.com/flyntwp/flynt-docs/issues">Leave feedback regarding this tutorial or the documentation on Github.</a></li>
  </ul>
</div>
