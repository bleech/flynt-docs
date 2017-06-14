---
title: Creating Features
weight: 42
menu:
  main:
    parent: Features
    weight: 42
---

To create Flynt Features quickly and easily, we recommend using the [Flynt Yeoman Generator](https://github.com/flyntwp/generator-flynt).

## Add functions.php

This is the only file a feature requires. The only additional requirement is to add the `Flynt\Features\<YourFeatureName>` namespace:

```php
<?php

namespace Flynt\Features\ExampleFeature;

// Add feature functionality here!
```

## Add a README.md

Features should be easy to reuse and easy to understand. We strongly recommend adding a readme file for each feature you create. Include a short description of what the feature can do, and how to configure any options available.

<!-- TODO: Add/link example README template. -->

## Add Styles, Scripts, and Templates
Features support the addition of styles, scripts, and templates. All file types supported within components (Stylus, CSS, JS, Twig, and PHP files) will also be compiled and built in exactly the same way for features.

## Add ACF Fields
Sometimes, a feature may need to add ACF fields to allow the user to configure the options from the back end. Again, this [works exactly as with components](/guide/components/content-fields/). Add a `fields.json` file to the feature, and then configure the ACF fields:

```
{
  "globalOptions": [
    {
      "name": "googleMapsApiKey",
      "label": "Google Maps Api Key",
      "type": "text",
      "maxlength": 100,
      "required": 1
    }
  ]
}
```

[You can read more on authoring ACF Fields here.](/guide/components/content-fields/)
