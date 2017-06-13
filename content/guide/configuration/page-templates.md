---
title: Page Templates
weight: 50
aliases:
  - /guide/configuration/
menu:
  main:
    parent: configuration
    weight: 50
---

All template files can be found under the theme root, in the `templates` directory.

By default, the following standard WordPress templates are included. These templates follow the normal [WordPress Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/), and work in exactly the same way:

- `404.php`
- `archive.php`
- `home.php`
- `index.php`
- `page.php`
- `single.php`

By default, the following custom page template is also included:
- `plugin-inactive.php` - This is displayed when the Flynt plugin is disabled.

## Configuring Page Templates

The structure of each page within the theme is created using a nested JSON object. Each PHP template within the `templates` directory takes a simple JSON configuration file, and using the Flynt Core plugin, parses and renders this into HTML.

For example, take `templates/page.php`:

```php
<?php

Flynt\echoHtmlFromConfigFile('default.json');
```

The JSON template configuration files are found in `config/templates`. These configuration files define the [components](/guide/components/what-is-component) and their [areas](/guide/components/what-is-component/#what-is-an-area) which are loaded into the template.

Take `config/templates/default.json` as an example. This template contains the `DocumentDefault` component, with one area within it: `layout`. The `layout` area contains the `LayoutSinglePost` component, which in turn has three nested [areas](/guide/components/what-is-component/#what-is-an-area): `mainHeader`, `pageComponents`, and `mainFooter`. In addition, the `pageComponents` area contains the `ComponentLoaderFlexible` component.

```json
{
  "name": "DocumentDefault",
  "areas": {
    "layout": [
      {
        "name": "LayoutSinglePost",
        "areas": {
          "mainHeader": [],
          "pageComponents": [
            {
              "name": "ComponentLoaderFlexible",
              "customData": {
                "fieldGroup": "pageComponents"
              }
            }
          ],
          "mainFooter": []
        }
      }
    ]
  }
}
```

The `layout` area is then rendered in the `Components/DocumentDefault/index.twig` template:

```twig
<!DOCTYPE html>
<html class="flyntComponent {{ body_class }}" lang="{{ site.language }}" dir="{{ dir }}" is="flynt-document-default">
  <head><!--...--></head>
  <body role="document">
    {{ area('layout') }}
    {{ wp_footer }}
  </body>
</html>
```
