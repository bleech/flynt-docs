---
title: Server Side Logic
weight: 35
menu:
  main:
    parent: components
    weight: 35
---

Flynt implements the [Wordpress functions.php concept](https://codex.wordpress.org/Functions_File_Explained) at component level. Each component can have a `functions.php` file. This file serves two main purposes:

- Enqueue assets and dependencies.
- Add additional data to the component before it is rendered.

As with styles and scripts, keeping this logic separated at a component level ensures the component is quick to understand and simple to reuse.

## Namespace

The `functions.php` file must always begin by defining the component namespace. This is `Flynt\Components`, followed by the component name.

```php
<?php

namespace Flynt\Components\ExampleComponentName;
```

## Enqueueing Assets and Dependencies
The main `style.css` and `script.js` files of a component can be enqueued using the [Flynt `Component` feature](https://github.com/bleech/wp-starter-theme/tree/master/Features/Components) within the `wp_enqueue_scripts` action.

```php
<?php

namespace Flynt\Components\ExampleComponentName;

use Flynt\Features\Components\Component;

add_action('wp_enqueue_scripts', function ()
{
    Component::enqueueAssets('ExampleComponentName');
});
```

This will enqueue `Components/ExampleComponentName/style.css` and `Components/ExampleComponentName/script.js`.

It is also possible to pass script and style dependencies to `enqueueAssets`.

```php
<?php

namespace Flynt\Components\ExampleComponentName;

use Flynt\Features\Components\Component;

add_action('wp_enqueue_scripts', function ()
{
    Component::enqueueAssets('ExampleComponentName', [
      [
          'name' => 'normalize',
          'path' => 'vendor/normalize.css',
          'type' => 'style'
      ],
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

This will look for `dist/vendor/slick.js` and `dist/vendor/slick.css` and enqueue the files if found. **Never add files manually to the `dist` folder.** To compile dependencies into the `dist/vendor` folder, see the [section on copying vendor files here](/scripts.md#add-dependencies).

## Using Filters
The two main filters you will use inside `functions.php` are `Flynt/addComponentData` and `Flynt/dynamicSubcomponents`.

### `Flynt/addComponentData`
This filter can be used to add to or modify your component's data before it is passed to the view and rendered. This can be used, for example, to fetch and pass posts from a custom post type:

```php
<?php

namespace Flynt\Components\ListLatestProducts;

use Timber\Timber;

add_filter('Flynt/addComponentData?name=ListLatestProducts', function ($data)
{
  $data['products'] = Timber::get_posts([
      'post_type' => 'product',
      'posts_per_page' => '5'
  ]);
  return $data;
});
```

This data is then available in the view template for `ListLatestProducts`.

```twig
<div is="flynt-list-latest-products" class="flyntComponent">
  <ul class="productList">
    {% for product in products  %}
      <li class="productList-item">
        <h3>{{ product.title }}</h3>
      </li>
    {% endfor %}
  </ul>
</div>
```

### `Flynt/dynamicSubcomponents`
With this filter, it is possible to dynamically add additional areas and components within your parent component. To learn how to use this in detail, [go to the section on dynamicSubcomponents](/dynamic-subcomponents.md).

## Using Features and Utils

Flynt comes with a range of features and utility functions. To use any of them within a component, you must only `use` the feature or utility at the top of the `functions.php` file, below the component namespace.

Features are always namespaced with `Flynt\Features`.

```php
<?php

namespace Flynt\Components\ExampleComponentName;

use Flynt\Features\Components\Component;
```

Utils are always namespaced with `Flynt\Util`.

```php
<?php

namespace Flynt\Components\ExampleComponentName;

use Flynt\Utils\Log;

add_filter('Flynt/addComponentData?name=ExampleComponentName', function ($data)
{
  Log::console($data); // console.log $data to the console.
  return $data;
});
```
