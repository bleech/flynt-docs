---
title: Hooking into Features
weight: 43
menu:
  main:
    parent: Features
    weight: 43
---

You may wish to run additional logic after a feature is registered. This is possible with the `Flynt\registerFeature` hook.

After each feature is registered, the `Flynt\registerFeature` action is fired:

```php
<?php

add_action('registerFeature', function ($feature, $options, $dir) {
  // Do something after each feature is registered.
}, 10, 3);
```
It is also possible to target a specific feature:

```php
<?php

add_action('registerFeature?name=CustomPostTypes', function ($feature, $options, $dir) {
  // Do something when the custom post type feature is registered.
}, 10, 3);
```
