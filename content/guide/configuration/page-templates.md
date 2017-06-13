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

WordPress uses the [template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/) to determine which PHP file to render for a given request.

With Flynt, all template files can be found in the `templates` folder of the theme.

By default, the following standard WordPress templates are included:

- `404.php`
- `archive.php`
- `home.php`
- `index.php`

One custom page template is also included:

- `plugin-inactive.php` - This is displayed when the Flynt plugin is disabled.

## Configuring Page Templates

In a standard WordPress theme, custom logic is usually added directly into each template file. With Flynt, this is not the case. Instead, Flynt uses a JSON object to specify which [components](/guide/components/what-is-component/) should be rendered. This means the template files contain a single PHP function call.

For example, take `templates/index.php`:

```php
<?php

Flynt\echoHtmlFromConfigFile('default.json');
```

Here, we pass the configuration file `default.json` to the [`echoHtmlFromConfigFile`](/guide/core/api/#echo-get-htmlfromconfig) function from the [Flynt Core](/guide/core/) plugin.

All configuration files are found in `config/templates` and define the [components](/guide/components/what-is-component/) and their [areas](/guide/components/what-is-component/#what-is-an-area) which are loaded into the template. 

In essence, these templates build a "Construction Plan", which is created and then rendered by the Flynt Core plugin. [The Core section of the documentation explains in detail how this Construction Plan works](/guide/core/construction-plan/).

As an example for one of these config files, take `config/templates/default.json`.

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

This template contains the `DocumentDefault` component, with one area within it: `layout`. The `layout` area contains the `LayoutSinglePost` component, which in turn has three nested [areas](/guide/components/what-is-component/#what-is-an-area): `mainHeader`, `pageComponents`, and `mainFooter`. In addition, the `pageComponents` area contains the `ComponentLoaderFlexible` component.

To render an area [in the view template of a component](/guide/components/view-templates/), Flynt defines the helper function `area`. In this case, the template files for the DocumentDefault and LayoutSinglePost are as follows:

`Components/DocumentDefault/index.twig`:

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

`Components/LayoutSinglePost/index.twig`:

```twig
<div is="flynt-layout-single-post" class="flyntComponent">
  <section class="pageWrapper">
    <header class="mainHeader">
      {{ area('mainHeader') }}
    </header>
    <main class="mainContent" role="main">
      {{ area('pageComponents') }}
    </main>
    <footer class="mainFooter">
      {{ area('mainFooter') }}
    </footer>
  </section>
</div>
```
