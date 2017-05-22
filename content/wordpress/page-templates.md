---
title: Page Templates
weight: 52
menu:
  main:
    parent: WordPress
    weight: 52
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

Each PHP template within the `templates` directory works in exactly the same way. The template takes a simple JSON configuration file, and using the Flynt Core plugin, parses and renders this into HTML.

By default, the JSON template configuration files are in `config/templates`.

These configuration files contain an overview of which areas and components are loaded into the template.

Take `config/templates/default.json` as an example. This template calls the `MainLayout` component and registers one area: `mainTemplate`. Within `mainTemplate`, three additional areas are defined: `mainHeader`, `pageComponents`, and `mainFooter`.

```json
{
  "name": "MainLayout",
  "areas": {
    "mainTemplate": [
      {
        "name": "MainTemplate",
        "areas": {
          "mainHeader": [
            {
              "name": "MainNavigation",
              "customData": {
                "menuSlug": "main_navigation"
              }
            }
          ],
          "pageComponents": [
            {
              "name": "FlexibleContent",
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
