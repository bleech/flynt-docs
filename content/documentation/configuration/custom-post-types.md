---
title: Custom Post Types
weight: 51
menu:
  main:
    parent: configuration
    weight: 51
---

With Flynt, custom post types can be created using the [Custom Post Type feature](https://github.com/flyntwp/flynt-starter-theme/tree/master/Features/CustomPostTypes).

With this feature, custom post types are created with JSON configuration files.

## 1. Install the CustomPostType Feature
Download and place the feature into the `Features` folder and initialize it in the `initTheme` function in `lib/Init.php`:

```php
<?php

function initTheme() {
  ...
  add_theme_support('flynt-custom-post-types', [
    'dir' => get_template_directory() . '/config/customPostTypes/',
    'fileName' => 'config.json'
  ]);
  ...
}

```

Here we pass two options:
- `dir` - the folder in which the configuration files are located
- `fileName` - the name of the configuration file that the feature will look for.


## 2. Create a post type
Each custom post type requires a separate folder in the defined `dir`. Within this folder, it will look for a JSON file with the specified `fileName` (`config.json`).

As an example, create `config\customPostTypes\products\config.json`. Within `config.json`, add the [configuration options exactly as specified by WordPress](https://codex.wordpress.org/Function_Reference/register_post_type#Parameters):

```json
{
  "label": "Product",
  "singular_label": "Product",
  "description": "The description of the post type.",
  "public": false,
  "show_ui": true,
  "show_in_nav_menus": false,
  "show_in_rest": false,
  "labels": {
    "menu_name": "Products",
    "all_items": "All products",
    "add_new": "Add new product"
  }
}
```

That's it! The post type is now created.

## 3. Add a README

It is strongly recommended to create a `README.md` file within each custom post type folder, with a short description of what this post type is for.
