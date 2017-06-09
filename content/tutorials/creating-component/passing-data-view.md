---
title: "Passing Data to your View"
weight: 21
aliases:
  - /tutorials/creating-component/passing-data/
  - /tutorials/creating-component/passing-data-to-your-view/
menu:
  main:
    parent: creating-component
    weight: 21
---

Now we'll take our static component and make it more useful by allowing our back end user to add the data for our quote dynamically.

Flynt leverages the WordPress plugin [Advanced Custom Fields (ACF)](https://advancedcustomfields.com) so that we can quickly and easily add fields for each component to WordPress edit screens.

## Creating a field group

Because Flynt uses ACF, we can create groups of content fields and assign each group [location rules](https://www.advancedcustomfields.com/resources/creating-a-field-group/#location) for where they should show up in the WordPress administrator back end. We do this using JSON configuration files, all of which can be found in `config/fieldGroups`.

Before we create the individual content fields for our component, we will begin by preparing our field group. Since we want to make our component available on all pages, we will add our `BlockQuote` component to the `pageComponents.json` field group in `config/fieldGroups/pageComponents.json`.

Replace the contents of `pageComponents.json` with the following:

```
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
        "Flynt/Components/BlockQuote/Fields/Layout"
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
Here, we define the essential properties of the field group: The name, the title (visible in the WordPress back end), and the location rules for where these fields should show up. We also create a [Flexible Content](https://www.advancedcustomfields.com/resources/flexible-content/) field, so that the user will be able to add our component to any page multiple times and in any order.

Inside the `layouts` of our flexible content field, we tell Flynt to look for the `layout` array inside the fields file of our `BlockQuote` component:

```json
{
  ...
  "layouts": [
    "Flynt/Components/BlockQuote/Fields/Layout"
  ]
}
```

Now we need to create these fields and update our view template.

## Creating a Fields File

Inside each component, fields are defined in a JSON configuration file named `fields.json`. In this file, we now need to create an array of fields with the key "layout".

Begin by creating `fields.json` inside your 'BlockQuote' component folder so that your theme folder looks like this:

```
├── flynt-starter-theme
|  ├──Components
|  |  ├── BlockQuote
|  |  |  ├── fields.json
|  |  |  └── index.twig
```

Inside `fields.json` add the following:

```json
{
  "layout": {
    "name": "blockQuote",
    "label": "Block Quote",
    "sub_fields": []
  }
}
```

Here we provide Flynt with some basic information about our component. We have defined the `layout` array with a unique `name` property, set a display `label` (the visible label in the WordPress back end), and prepared an empty `sub_fields` array, where we will place our individual content fields.

We will now define two text fields inside the `sub_fields` array - one for the quote text, and one for the citation:

```json
{
  "layout": {
    "name": "blockQuote",
    "label": "Block Quote",
    "sub_fields": [
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
}
```

To output the data that the user enters into these fields, we need to replace the text in the view template with each field's `name` property as defined in `fields.json`. Update `Components/BlockQuote/index.twig` to match the following:

```twig
<div is="flynt-block-quote" class="flyntComponent">
    <blockquote class="blockQuote">
        <p>{{ quote }}</p>
        <cite>{{ citation }}</cite>
    </blockquote>
</div>
```

Refresh your page and you'll see... nothing! That's because we haven't added any data to the WordPress back end yet.

Navigate to the WordPress back end of your installation and create a new page called "Quotes". Use the "Add Component" and select the "Block Quote" component to add it to the page:

![Add the Blockquote component to the page](images/tutorials/creating-component/add-component.jpg)

You can now add content to the fields we defined inside the fields configuration file:

![Add Field Data to the BlockQuote component](images/tutorials/creating-component/add-field-data.jpg)

Publish the page and point your browser to http://localhost:3000/quotes to see your component with the data pulled in from the back end!

<div class="alert alert-steps">
  <h2>Adding Styles and Scripts</h2>

  <p>Next we will enhance the component a step further with custom styles and scripts.</p>

  <p><a href="/tutorials/creating-component/adding-styles-scripts/" class="button button--primary">Continue to the next step</a></p>
</div>
