---
title: Using Features
weight: 41
menu:
  main:
    parent: Features
    weight: 41
---

All features are located in the `Features` folder and require a `functions.php` file.

There are only two steps to add a feature:

1. Add the feature to the `Features` folder.
2. Open `lib\Init.php`, and enable the feature using `add_theme_support` in the `initTheme` function. For example:
  ```php
  function initTheme() {
    // enable "Timber Loader" feature
    add_theme_support('flynt-timber-loader');
  }
  ```

That's it. In this example, Flynt will now initialize `Features\AdminNotices\functions.php` on the `after_setup_theme` hook. [This hook is called during each page load, after the theme is initialized.](https://codex.wordpress.org/Plugin_API/Action_Reference/after_setup_theme)

It is also possible to pass parameters to features in the `add_theme_support` function. For example:

```php
add_theme_support('flynt-acf', [
  'FieldGroupComposer',
  'OptionPages'
]);
```

<!-- TODO: Add example for accessing these parameters within the feature. -->
