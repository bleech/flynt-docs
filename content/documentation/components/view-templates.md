---
title: View Templates
weight: 38
menu:
  main:
    parent: Components
    weight: 38
---

- TODO: add definition for view template that doesn't suck
- flynt takes the view -> compiles to html and outputs
- this is the V in MVC.
- maybe put the index.twig example at the top of here, not at the bottom

The rendered view of a component is the "view template". View templates are written in [Twig](http://twig.sensiolabs.org/), and support everything provided additionally by [Timber](http://timber.github.io/timber/).

The template file for a component must be named `index.twig`.

All data passed to a component is readily available in the view. This data includes fields configured in the [`fields.json` file](fields/README.md) of the component, plus data passed with the [`addComponentData` filter](functions.md#flynt-addcomponentdata).

For example, take a component named `exampleComponent`.

In `functions.php`:

```php
<?php

namespace Flynt\Components\ExampleComponent;

add_filter('Flynt/addComponentData?name=ExampleComponent', function ($data)
{
  $data['helloWorld'] = 'Hello World!';
  return $data;
});
```

This data is now available in `index.twig`:

```twig
<div is='flynt-example-component' class='flyntComponent'>
  <h1>{{ helloWorld }}</h1>
</div>
```

If Twig is not your preferred template language, it is possible to customize this with Flynt Core. [You can read how to change the template language here.](../core/customization/changing-template-language.md)

<!-- - TODO: Talk about partials -->
