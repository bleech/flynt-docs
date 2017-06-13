---
title: Field Groups
weight: 51
menu:
  main:
    parent: configuration
    weight: 51
---

With Flynt, [Advanced Custom Fields field groups](https://www.advancedcustomfields.com/resources/creating-a-field-group/) are created as JSON configuration files. A field group provides a way to group a collection of related content fields and assign them with a title, location rules, and visual settings.

In this way, it is possible to load fields from multiple components into a single group, and display them together in the WordPress administrator back end.

For example, we could create a field group to display on all pages, in a meta box labeled "Page Options":

```json
{
  "name": "pageOptions",
  "title": "Page Options",
  "fields": [
    "Flynt/Components/BlockQuote/Fields/PageOptions"
  ],
  "location": [
    [
      {
        "param": "post_type",
        "operator": "==",
        "value": "page"
      }
    ]
  ]
}
```

This will display all of the `PageOptions` fields as defined in the `fields.json` file of the `BlockQuote` component:

```json
{
  "pageOptions": [
    {
      "label": "Quote",
      "name": "quote",
      "type": "text",
      "required": 1
    },
    {
      "label": "Citation",
      "name": "citation",
      "type": "text",
      "required": 1
    }
  ]
}
```

These fields will then be visible on all pages inside the WordPress back end:

![Field Group Example](/images/guide/field-group-example.jpg)

## Using Components as Flexible Content Layouts

The [ACF Flexible Content field](https://www.advancedcustomfields.com/resources/flexible-content/) acts as a blank canvas to which the user can add an unlimited number of layouts with full control over the order.

With Flynt, we can define a field group with a flexible content field that contains components as the available layouts. Flynt has two such field groups by default, one for posts ([postComponents.json](https://github.com/flyntwp/flynt-starter-theme/blob/master/config/fieldGroups/postComponents.json)) and one for pages ([pageComponents.json](https://github.com/flyntwp/flynt-starter-theme/blob/master/config/fieldGroups/pageComponents.json)).

To use components as flexible content layouts, we create a field group that contains a `flexible_content` field, then pass the `Layout` of each component into the `layouts` array:

```json
{
  "name": "pageComponents",
  "title": "Page Components",
  "fields": [
    {
      "name": "pageComponents",
      "label": "Page Components",
      "type": "flexible_content",
      "button_label": "Add Component",
      "layouts": [
        "Flynt/Components/BlockImage/Fields/Layout",
        "Flynt/Components/BlockMediaText/Fields/Layout",
        "Flynt/Components/BlockVideoOembed/Fields/Layout",
        "Flynt/Components/BlockWysiwyg/Fields/Layout",
        "Flynt/Components/SliderMedia/Fields/Layout"
      ]
    }
  ],
  "location": [
    [
      {
        "param": "post_type",
        "operator": "==",
        "value": "page"
      }
    ]
  ]
}
```

Inside the `fields.json` file of each component is a corresponding `layout` array, which must define the name and label for the component, plus any of its sub fields. For example, take `Components/BlockWysiwyg/fields.json`:

```json
{
  "layout": {
    "name": "blockWysiwyg",
    "label": "Block: Wysiwyg",
    "sub_fields": [
      {
        "name": "contentHtml",
        "label": "Content",
        "type": "wysiwyg",
        "delay": 1,
        "media_upload": 0,
        "toolbar": "full",
        "required": 1
      }
    ]
  }
}
```
