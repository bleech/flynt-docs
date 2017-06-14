---
title: Server Side Logic
weight: 35
menu:
  main:
    parent: components
    weight: 35
---

Flynt implements the [Wordpress functions.php concept](https://codex.wordpress.org/Functions_File_Explained) at component level. Each component can have a `functions.php` file. This file serves two main purposes:

- Enqueue the assets and dependencies of a component.
- Add custom logic (classes, hooks, filters) to a component.
- Add additional data to a component.

As with styles and scripts, keeping this logic separated at a component level ensures the component is quick to understand and easy to reuse.

## Namespace

The `functions.php` file must always begin by defining the component namespace. This is `Flynt\Components`, followed by the component name.

```php
<?php

namespace Flynt\Components\ExampleComponentName;
```

## Enqueueing Assets and Dependencies
The main `style.css` and `script.js` files of a component can be enqueued using the [Flynt Components feature](https://github.com/flyntwp/flynt-starter-theme/blob/master/Features/Components) within the `wp_enqueue_scripts` action.

```php
<?php

namespace Flynt\Components\ExampleComponentName;

use Flynt\Features\Components\Component;

add_action('wp_enqueue_scripts', function ()
{
    Component::enqueueAssets('ExampleComponentName');
});
```

This will enqueue `Components/ExampleComponentName/style.css` and `Components/ExampleComponentName/script.js`, if they are found.

It is also possible to pass script and style dependencies to `enqueueAssets`. For example:

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

This will look for `flynt-starter-theme/dist/vendor/slick.js` and `flynt-starter-theme/dist/vendor/slick.css` and enqueue the files if found.

**Never add files manually to the `dist` folder of the theme.** To compile dependencies into the `dist/vendor` folder of the theme, see the [section on copying vendor files here](/guide/components/client-side-scripts/#add-third-party-dependencies).

## Add and Modify Component Data with Filters
[Filters are provided by WordPress](https://codex.wordpress.org/Plugin_API) to allow a plugin to 'hook into' the rest of WordPress and call functions at specific times. [Flynt Core](/guide/core/) defines two filters most often used inside `functions.php` for the purpose of adding component data and [areas](/guide/components/what-is-component#what-is-an-area). These are `Flynt/addComponentData` and `Flynt/dynamicSubcomponents`.

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
This filter allows a component to dynamically create new areas with components within them. Components can be added to the new area with exactly the same configuration options as with [Flynt page templates](/guide/configuration/page-templates). For example:

```php
<?php
add_filter('Flynt/dynamicSubcomponents?name=ParentComponent', function ($areas)
{
    $areas['newAreaName'] = [
        [
            'name' => 'ChildComponentName',
            'customData' => [
              'exampleData' => 1
            ]
        ],
        [
            'name' => 'AnotherComponentName'
        ]
    ];
    return $areas;
});
```

It is also possible to access the `$data` and `$parentData` of the component that the filter is applied to. This is useful if, for example, you need to dynamically load components of an ACF flexible content field group:

```php
<?php
add_filter('Flynt/dynamicSubcomponents?name=FlexibleContent', function ($areas, $data, $parentData) {
    $fieldGroup = $data['fieldGroup'];
    if (array_key_exists($fieldGroup, $parentData['post']->fields) && $parentData['post']->fields[$fieldGroup] !== false
    ) {
        $areas['flexibleContent'] = array_map(function ($field) use ($parentData) {
            return [
                'name' => ucfirst($field['acf_fc_layout']),
                'customData' => $field,
                'parentData' => $parentData // overwrite parent data of child components
            ];
        }, $parentData['post']->fields[$data['fieldGroup']]);
    }
    return $areas;
}, 10, 3);
```

## Using Features and Utils

Flynt comes with a range of features and utility functions. To use any of them within a component, you must `use` the feature or utility at the top of the `functions.php` file, below the component namespace.

Features are always namespaced with `Flynt\Features`.

```php
<?php

namespace Flynt\Components\ExampleComponentName;

use Flynt\Features\Components\Component;
```

[Learn more about using features in the Features section](/guide/features/using-features/).

Utils are always namespaced with `Flynt\Util`.

```php
<?php

namespace Flynt\Components\ExampleComponentName;

use Flynt\Utils\Log;

add_filter('Flynt/addComponentData?name=ExampleComponentName', function ($data)
{
    Log::console($data); // console.log $data to the JavaScript console.
    return $data;
});
```

[Learn more about using utils in the Utils section](/guide/utils/using-utils/).
