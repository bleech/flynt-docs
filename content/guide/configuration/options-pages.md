---
title: Options Pages
weight: 61
menu:
  main:
    parent: configuration
    weight: 61
---


[Advanced Custom Fields Options pages](https://www.advancedcustomfields.com/add-ons/options-page/) provide a way to create new, extra admin pages in the sidebar of the WordPress back end.

These are useful for creating content fields and settings that only need to be configured once and applied to the whole website. By default, the Flynt Starter Theme supports using two main options pages:

**Global Options:** This options page is for fields that should keep the same value in all languages. If your theme uses the WordPress plugin [WPML](https://wpml.org/), any field defined as a **global option** will always output in the primary language of your theme. This is useful for content such as the brand images, where the user would usually not want to change this content on different pages or or in each language that the site is available in.

**Translatable Options:** This page is for all fields that should be translated for each language the website uses. When combined with the WordPress plugin [WPML](https://wpml.org/), these fields will output their value from the active display language. This is useful for generic content that the user may wish to set once for many components.

Fields added to either of these pages from a feature, component, or post type will display in the WordPress back end under a new sub page that matches the name of the component, feature, or post type where they are registered.

![Flynt Options Pages](images/options-pages.jpg)

## Adding Fields to Options Pages

It is possible to add fields to both of these pages using the `fields.json` file of a component or a feature. [Please take a moment to read through the content fields documentation](/guide/components/content-fields/) if you are unfamiliar with how this works.

To show fields from a component or feature on either of the options pages, the fields must be defined in `fields.json` inside an array with the name of the options page.

To show fields under the **global options** page, register fields inside the `globalOptions` array:

```json
{
  "globalOptions": [
    {
      "name": "gaId",
      "label": "Google Analytics ID",
      "type": "text",
      "maxlength": 20,
      "prepend": "",
      "append": "",
      "placeholder": "XX-XXXXXXXX-X"
    }
  ]
}
```

To show fields under the **translatable options** page, register the fields inside the `translatableOptions` array:

```json
{
  "translatableOptions": [
    {
      "name": "brandLogo",
      "label": "Brand Logo",
      "type": "image",
      "mime_types": "jpg,jpeg,svg"
    }
  ]
}
```

If these fields are defined inside a component, this field data is already available in the [view template](/guide/components/view-templates/).

If these fields are defined inside a feature or post type, or you need to use options of one component inside of another, it is necessary to use the `OptionPages` class provided by the [Acf](https://github.com/flyntwp/flynt-starter-theme/tree/master/Features/Acf) feature. With the `get` function of the `OptionPages` class, it is possible to get either a single option or all options of a sub page.

For example, to get all options from the Google Analytics feature:

```php
<?php

use Flynt\Features\Acf\OptionPages;

$GoogleAnalyticsGlobalFields = OptionPages::get('globalOptions', 'feature', 'GoogleAnalytics');
```

To get only the `gaId` option from the Google Analytics feature:

```php
<?php

use Flynt\Features\Acf\OptionPages;

$GoogleAnalyticsId = OptionPages::get('globalOptions', 'feature', 'GoogleAnalytics', 'gaID');
```

The same can be done to get fields from a component. For example, if a component named `NavigationFooter` had the following `fields.json`

```json
{
  "translatableOptions": [
    {
      "name": "copyrightText",
      "label": "Copyright Text",
      "type": "text"
    },
    {
      "name": "cookiePolicyText",
      "label": "Cookie Policy Text",
      "type": "text"
    }
  ]
}
```

It is possible to retrieve this field data using `OptionPages::get` as follows:

```php
<?php

use Flynt\Features\Acf\OptionPages;

$footerTranslatableFields = OptionPages::get('translatableOptions', 'component', 'NavigationFooter');
```

To get only the `copyrightText` field:

```php
<?php

use Flynt\Features\Acf\OptionPages;

$copyrightText = OptionPages::get('translatableOptions', 'component', 'NavigationFooter', 'copyrightText');
```
