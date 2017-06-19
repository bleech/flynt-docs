---
title: View Templates
weight: 31
menu:
  main:
    parent: components
    weight: 31
---

The "View Template" can be seen as the "V" in any MVC (["Model-View-Controller"](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)) framework. In Flynt, view templates are written in the templating engine [Twig](http://twig.sensiolabs.org/), and support everything provided additionally by the WordPress plugin [Timber](http://timber.github.io/timber/).

In many standard WordPress themes, logic is often included directly into page templates. With Flynt, a view template must not include such logic. It is only for the presentation of data.

By default, the template file for a component must be named `index.twig`, and must reside inside the component's own directory. Flynt will take this template and output it into HTML in the same location in the `dist` folder of the theme.

```
├── flynt-starter-theme
|  ├──Components
|  |  ├──ExampleComponent/
|  |  |  └── index.twig
```

If you don't like index.twig as a filename, you can change this with the [TimberLoader feature](https://github.com/flyntwp/flynt-starter-theme/blob/master/Features/TimberLoader/functions.php).

All data passed to a component is readily available in the view. This data includes fields configured in the [`content fields`](/guide/components/content-fields/) file of a component, plus data passed with the [`addComponentData` filter](/guide/components/server-side-logic/#flynt-addcomponentdata).

For example, a 'BlockQuote' component could have the following `index.twig`:

```twig
<div is="flynt-block-quote" class="flyntComponent">
  <blockquote>
    <p>{{ quote }}</p>
    <cite>{{ citation }}</cite>
  </blockquote>
</div>
```

In this example, the `quote` variable is defined in `functions.php` with the `addComponentData` filter:

```php
<?php

namespace Flynt\Components\BlockQuote;

add_filter('Flynt/addComponentData?name=BlockQuote', function ($data)
{
    $data['quote'] = 'Hello World!';
    return $data;
});
```

Whereas the `citation` variable is defined in `fields.json` as a user-editable content field:

```json
{
  "layout": {
    "name": "blockQuote",
    "label": "Block Quote",
    "sub_fields": [
      {
        "label": "Citation",
        "name": "citation",
        "type": "text",
        "required": 1
      }
    ]
  }
}
```

It is possible to [customize the template language using Flynt Core](/guide/core/customization/#changing-the-template-language).
