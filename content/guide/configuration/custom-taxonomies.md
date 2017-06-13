---
title: Custom Taxonomies
weight: 53
menu:
  main:
    parent: configuration
    weight: 53
---

With Flynt's [Custom Taxonomies feature](https://github.com/flyntwp/flynt-starter-theme/tree/master/Features/CustomTaxonomies), custom taxonomies can be created as JSON configuration files.

By default, the configuration files must be placed into the `config/customTaxonomies` directory. This can be modified in `lib/Init.php` where the feature is initialized:

```php
<?php

function initTheme()
{
    add_theme_support('flynt-custom-taxonomies', [
        'dir' => get_template_directory() . '/config/yourTaxonomyFolderOfChoice/'
    ]);
}
```

With the feature initialized, add a JSON file with the [configuration options as specified by Wordpress](https://codex.wordpress.org/Function_Reference/register_taxonomy#Parameters) to the folder defined above. For example:

```json
{
  "label": "Genre",
  "description": "The description for the Genre taxonomy.",
  "show_ui": true,
  "show_admin_column": true,
  "objectType": "post",
  "labels": {
    "name": "Genres",
    "singular_name": "Genre",
    "search_items": "Search Genres",
    "all_items": "All Genres",
    "parent_item": "Parent Genre",
    "parent_item_colon": "Parent Genre:",
    "edit_item": "Edit Genre",
    "update_item": "Update Genre",
    "add_new_item": "Add New Genre",
    "new_item_name": "New Genre Name",
    "menu_name": "Genre"
  },
  "rewrite": {
    "slug": "genre",
    "with_front": false
  }
}
```
