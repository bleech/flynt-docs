---
title: Content Fields
weight: 34
menu:
  main:
    parent: components
    weight: 34
---

The ability to add content fields is provided primarily by the WordPress plugin [Advanced Custom Fields Pro (ACF)](https://www.advancedcustomfields.com/pro/). Using the [ACF Field Group Composer](https://github.com/flyntwp/acf-field-group-composer), Flynt provides the ability to register these fields at the component level within the JSON configuration file `fields.json`, so that content fields can be encapsulated within the component along with everything else:

```
├── flynt-starter-theme
|  ├──Components
|  |  ├── ExampleComponent
|  |  |  └── fields.json
```

Inside `fields.json`, the fields must be registered inside an array with a unique key. For example, here is a single text field registered inside a `contentFields` array:

```json
{
  "contentFields": [
    {
      "name": "exampleTextField",
      "label": "Example Text Field",
      "type": "text"
    }
  ]
}
```

All of the fields inside the `contentFields` array can then be added to a field group, in order to control where these fields should show up in the WordPress administrator back end. By using the `contentFields` key defined in `fields.json` it is possible to pass all of these fields to a field group as so:

```json
{
  "name": "pageFields",
  "title": "Page Fields",
  "fields": [
    "Flynt/Components/ExampleComponent/Fields/ContentFields"
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

[See the field groups page for a detailed explanation of how to use these](/guide/configuration/field-groups).

Advanced Custom Fields comes with many field types by default, all of which can be used with Flynt. The JSON properties available for each field type can be seen in the [official ACF documentation here](https://www.advancedcustomfields.com/resources/register-fields-via-php/#field-settings). 
