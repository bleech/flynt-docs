---
title: "5. Adding Assets to a Component"
weight: 24
menu:
  main:
    parent: Building your first Component
    weight: 24
---

<div class="alert">
  <h3>This tutorial covers:</h3>
  <ul>
    <li><strong><a href="#5-1-adding-styles">5.1 Adding Styles</a></strong></li>
    <li><strong><a href="#5-2-adding-scripts">5.2 Adding Scripts</a></strong></li>
    <li><strong><a href="#5-3-adding-and-registering-dependencies">5.3 Adding and Registering Dependencies</a></strong></li>
    <li><strong><a href="#5-4-adding-static-assets">5.4 Adding Static Assets</a></strong></li>
  </ul>
</div>

## 5.1 Adding Styles
Each component can have a self-contained style file. By default, Flynt supports vanilla CSS files, and the pre-processor [Stylus](http://stylus-lang.com/). In this tutorial we will use Stylus.

**[If you do not like Stylus or vanilla CSS, you can learn how to switch the styling language here.](../../customization/changing-style-language.md)**

To get started, create `Components/SliderPosts/style.styl` and add the styles below:

```stylus
[is='flynt-post-slider']
  *,
  *:before,
  *:after
    box-sizing: border-box

  .slider
    center(1200px)

    &-title
      color: #74afad

    &-image
      display: block
      width: 100%

    &-showing
      color: #558c89
```

Before these styles will show up, we need to enqueue our stylesheet.

Open `Components/SliderPosts/functions.php` and add the following code below the component namespace:

```php
use Flynt\Features\Components\Component;
```

Then, at the bottom, add the code below to enqueue the stylesheet:

```php
add_action('wp_enqueue_scripts', function () {
  Component::enqueueAssets('SliderPosts');
});

```

With `Component::enqueueAssets` we are telling our component to look for any style or script file within the component folder and enqueue it. [You can read more in the Component Feature section](/add-link).

In summary, the `Components/SliderPosts/functions.php` file now looks like the following:

```php
  <?php
  namespace Flynt\Components\SliderPosts;

  use Flynt\Helpers\Component;

  add_filter('Flynt/addComponentData?name=SliderPosts', function ($data) {
    $data['lastEditedText'] = str_replace('$date', $data['lastEditedDate'], $data['lastEditedText']);
    return $data;
  });

  add_action('wp_enqueue_scripts', function () {
    Component::enqueueAssets('SliderPosts');
  });
```

Refresh your page and you will now see our new styles.

That's it! Though there are a few more recommendations to keep in mind:

- Each component is uniquely identified with the `is` attribute. We use this for both styling and scripting, as you will see below. All styles are scoped within this component identifier.
- At the core of the Flynt philosophy is reusability and scalability. As such, we strongly recommend following the [maintainableCSS](http://maintainablecss.com/) guidelines.

## 5.2 Adding Scripts
Just as with our styles, scripts live in our component folder and are completely self contained.

Create `Components/SliderPosts/script.js` and add the following code:

```js
class SliderPosts extends window.HTMLDivElement {
  connectedCallback () {
    console.log('connected')
  }
}

window.customElements.define('flynt-post-slider', SliderPosts, {extends: 'div'})
```

This is our basic recommended JavaScript Custom Element starting template. It is written in ES2015 (ES6), and will be compiled to ES5 using [Babel](https://babeljs.io/).

<p class="source-note">Before continuing we strongly recommended reading <a href="https://developers.google.com/web/fundamentals/getting-started/primers/customelements">Google's Getting Started Primer for Custom Elements</a>. However, we will build upon this template in the coming sections.</p>

If you are not comfortable with Custom Elements or ES2015 (ES6), we do not force you to adopt this for your JavaScript (only strongly recommend it). At a basic level, the component `script.js` file will always be copied into the matching `dist` folder. **You are free to write the JavaScript within it as you wish.**

## 5.3 Adding and Registering Dependencies
In order to turn our images into a slider, we'll use the [Flynt CLI](../../cli/README.md) to add [Slick Carousel](http://kenwheeler.github.io/slick/) to the component.

Open the terminal, navigate to the project folder and run this command to install Slick:

```
flynt add slick-carousel
```

Now we need to import this dependency into our component.

First, we will let Flynt know which scripts and styles from slick need copying into the `build/vendor` folder.

Do this by adding the code below to the top of `Components/SliderPosts/script.js`:

```js
import 'file-loader?name=vendor/slick.js!slick-carousel'
import 'file-loader?name=vendor/slick.css!slick-carousel/slick/slick.css'
```

Now that the files are copied to `dist/vendor` we need to enqueue these assets.

Open `Components/SliderPosts/functions.php` and enqueue the dependencies by modifying the `enqueueAssets` function to match the below:

```php
add_action('wp_enqueue_scripts', function () {
  Component::enqueueAssets('SliderPosts', [
    [
      'name' => 'slick-carousel',
      'path' => 'vendor/slick.js',
      'type' => 'script'
    ],
    [
      'name' => 'slick-carousel',
      'path' => 'vendor/slick.css',
      'type' => 'style'
    ]
  ]);
});
```

Great! All that is left is modify the `connectedCallback` function to initialize the plugin.

Open `Components/SliderPosts/script.js` and update the contents to match the following:

```js
import 'file-loader?name=vendor/slick.js!slick-carousel'
import 'file-loader?name=vendor/slick.css!slick-carousel/slick/slick.css'

class SliderPosts extends window.HTMLDivElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.resolveElements()
    return self
  }

  resolveElements () {
    this.$slider = $('.slider-items', this)
  }

  connectedCallback () {
    this.$slider.slick({
      autoplay: 3000,
      arrows: false,
      dots: true
    })
  }
}

window.customElements.define('flynt-post-slider', SliderPosts, {extends: 'div'})
```

## 5.4 Adding Static Assets
Sometimes we need static assets, such as icons, that do not come directly from the user in the back-end.

To implement this, create an `asset` directory in the SliderPosts component directory. Then, download and add `downloadIcon.svg` ([available here](http://iconmonstr.com/download-11/)) to the new `asset` directory.

```
| flynt-theme
|── Components
    └── SliderPosts
       └── Assets/
          └── downloadIcon.svg
```

When flynt is running, any file (other than JavaScript, Stylus, SASS, and LESS) placed into this folder will be automatically copied to the corresponding folder within `dist`.

In our case, `downloadIcon.svg` will be copied to `dist/Components/SliderPosts/Assets/downloadIcon.svg`.

For caching purposes, all static assets are automatically revisioned by gulp (for example, `downloadIcon.svg` → `downloadIcon-d41d8cd98f.svg`).

As such, to include assets in a component, it is necessary to use the `requireAssetUrl` function. This is a utility function provided by the Asset Util. You can read more about this in the [Util Asset section](/add-link).

Open `Components/SliderPosts/functions.php`. At the top of the file, we need to `use` our `Asset` helper:

```php
<?php
namespace Flynt\Components\SliderPosts;

use Flynt\Utils\Asset;
//...
```

We will then add the image URL to our component data by calling the `requireAssetUrl` function with the path to our image:

```php
 add_filter('Flynt/addComponentData?name=SliderPosts', function ($data) {
   $data['downloadIconUrl'] = Asset::requireAssetUrl('Components/SliderPosts/Assets/downloadIcon.svg');
   ...
   return $data;
 });
```

In summary, the `Components/SliderPosts/functions.php` should now match the code below:

```php
<?php
namespace Flynt\Components\SliderPosts;

use Flynt\Utils\Asset;
use Flynt\Features\Components\Component;

add_filter('Flynt/addComponentData?name=SliderPosts', function ($data) {
  $data['downloadIconUrl'] = Asset::requireAssetUrl('Components/SliderPosts/Assets/downloadIcon.svg');
  $data['lastEditedText'] = str_replace('$date', $data['lastEditedDate'], $data['lastEditedText']);
  return $data;
});

add_action('wp_enqueue_scripts', function () {
  Component::enqueueAssets('SliderPosts', [
    [
      'name' => 'slick-carousel',
      'path' => 'vendor/slick.js',
      'type' => 'script'
    ],
    [
      'name' => 'slick-carousel',
      'path' => 'vendor/slick.css',
      'type' => 'style'
    ]
  ]);
});
```

We now have the icon URL available in our component data. Lets use what we learnt in the previous steps to add this icon to our template, along with some styling for the icon:

In `Components/SliderPosts/index.twig`:

```twig
<div is="flynt-post-slider">
  <div class="slider">
    <h1 class="slider-title">{{ title }}</h1>
    <div class="slider-items">
      {% for post in posts %}
        <div class="slider-item">
          <h2>{{ post.title }}</h2>
          <div class="slider-image-wrapper">
            <a class="slider-icon" href="{{ post.thumbnail.src }}" target="_blank">
              <img src="{{ downloadIconUrl }}" alt="Download">
            </a>
            <img src="{{ post.thumbnail.src  }}" alt="{{ post.title }}">
          </div>
        </div>
      {% endfor %}
    </div>
  </div>
  <div class="slider-meta">
    <p class="slider-showing">{{ postsPerPageText }}</p>
  </div>
</div>
```

In `Components/SliderPosts/style.styl`:

```stylus
[is='flynt-post-slider']
  .slider
    center(1200px)

    &-title
      color: #74afad

    &-image
      display: block
      width: 100%

    &-showing
      color: #558c89

    &-image-wrapper
      position: relative

    &-icon
      bottom: 20px
      display: block
      height: 30px
      position: absolute
      right: 20px
      width: 30px
```

Refresh the front-end and you will see that we are done!

<div class="alert alert-steps">
  <h2>Next Steps</h2>

  <p>This concludes the "Getting Started" series! In the last step we'll recap what we've achieved and recommend where to go from here.</p>

  <p><a href="next-steps.md" class="btn btn-primary">Go to Section 7</a></p>
</div>
