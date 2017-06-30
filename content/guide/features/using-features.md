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

1\. Add the feature folder to the `Features` folder of the theme.

2\. Open `lib/Init.php`, and enable the feature using `add_theme_support` in the `initTheme` function. The feature name must be passed in [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) with the `flynt` prefix. For example, to enable the [Custom Post Types feature](https://github.com/flyntwp/flynt-starter-theme/tree/master/Features/CustomPostTypes):

```php
<?php

function initTheme()
{
    // enable "Custom Post Types" feature
    add_theme_support('flynt-custom-post-types');
}
add_action('after_setup_theme', __NAMESPACE__ . '\\initTheme');
```

That's it. Flynt will now initialize `Features\CustomPostTypes\functions.php` on the `after_setup_theme` hook. [This hook is called during each page load, after the theme is initialized.](https://codex.wordpress.org/Plugin_API/Action_Reference/after_setup_theme)

It is also possible to pass parameters to features. Parameters are passed as an array in the second argument of the `add_theme_support` function. For example:

```php
<?php

function initTheme()
{
    add_theme_support('flynt-custom-post-types', [
        'dir' => get_template_directory() . '/config/customPostTypes/',
        'fileName' => 'config.json'
    ]);
}
add_action('after_setup_theme', __NAMESPACE__ . '\\initTheme');
```

To see which parameters a feature supports, take a look at the feature's `README.md` file.

<!-- TODO: Add example for accessing these parameters within the feature. -->
