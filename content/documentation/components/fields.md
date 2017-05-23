---
title: Fields
weight: 34
menu:
  main:
    parent: Components
    weight: 34
---

- Field functionality is provided by ACF plugin. This is required for fields to work.
- Fields are authored in .json
- can use all same options as on acf documentation (link to the docs here)
- theres lots of different field types. the sub pages in this section show how to use key field types

<!-- TODO: Describe this link:
https://www.advancedcustomfields.com/resources/register-fields-via-php/ -->

## Using Flexible Content with ACF Pro

<div class="alert alert-info">
  <p><strong>To use the flexible content field you must have purchased and installed the Advanced Custom Fields Pro plugin. <a href="https://www.advancedcustomfields.com/pro/">You can purchase this on the ACF website here.</a></strong></p>
</div>

**[We strongly recommend that you first learn how the `dynamicSubcomponents` filter works. Read more about this here](dynamic-subcomponents.md)** 

To quote the official ACF documentation:

> The Flexible content field acts as a blank canvas to which you can add an unlimited number of layouts with full control over the order.

[You can read more here](https://www.advancedcustomfields.com/add-ons/flexible-content-field/).

With Flynt, this field is truly powerful when we consider that every component can be registered as a separate flexible content layout. The user will then be free to drag and drop each component on their page to create their own unique layouts. Since every component is self-contained, the final output order on the front-end is irrelevant (in almost all cases).

### Create a Flexible Content template
- how to add to config

### Create Demo Modules
- demo with a few modules

## Using Repeaters with ACF Pro

<div class="alert alert-info">
  <p><strong>To use repeater fields you must have purchased and installed the Advanced Custom Fields Pro plugin. <a href="https://www.advancedcustomfields.com/pro/">You can purchase this on the ACF website here.</a></strong></p>
</div>

The repeater field is a wrapper for a group of sub fields, so that mulitple rows of data of the same format can be easily looped over. [To see the full functionality of the repeater field in detail, read through the official ACF documentation on repeaters](https://www.advancedcustomfields.com/resources/repeater/).

To demonstrate, lets make a new component named `ImageTextList`.

Create `Components/ImageTextList/fields.json` and register a new repeater field:

```json
{
  "fields": [
    {
      "name": "items",
      "label": "Items",
      "type": "repeater",
      "button_label": "Add Item",
      "required": 1
    }
  ]
}
```

Now register two sub-fields for the repeater, `Image` and `Content`:

```json
{
  "fields": [
    {
      "name": "items",
      "label": "Items",
      "type": "repeater",
      "button_label": "Add Item",
      "required": 1,
      "sub_fields": [
        {
          "name": "image",
          "label": "Image",
          "type": "image",
          "mime_types": "jpg,jpeg",
          "required": 1
        },
        {
          "name": "content",
          "label": "Content",
          "type": "textarea",
          "new_lines": "wpautop",
          "required": 1
        }
      ]
    }
  ]
}
```

Add the component to the default `pageComponents` field group and check-out the repeater in the back-end. As you can see, the user is free to add and remove new rows as they wish - each containing an image and a content field.

Create `Components/ImageTextList/index.twig` and enter the following:

```twig
<div is="flynt-image-text-list">
  {% for item in items %}
    <div class="item">
      <img src="{{ item.image.src }}" alt="{{ item.image.alt }}">
      {{ item.content }}
    </div>
  {% endfor %}
</div>
```

Here we can loop through each entry within the repeater, outputting the same layout for each item. That's it! Repeaters provide a great, simple method for the user to add and display similar data again and again.

## Options Pages

<div class="alert alert-info">
  <p><strong>To use options pages you must have purchased and installed the Advanced Custom Fields Pro plugin. <a href="https://www.advancedcustomfields.com/pro/">You can purchase this on the ACF website here.</a></strong></p>
</div>

This section is coming soon!
