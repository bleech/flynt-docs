---
title: "Creating the View File"
weight: 20
aliases:
  - /tutorials/
  - /tutorials/creating-component/
  - /tutorials/creating-a-component/
menu:
  main:
    parent: creating-component
    weight: 20
---

In this tutorial, we will walk you through the basic process of creating a simple static component, making it dynamic by passing data into the view, and then enhancing the component with styles and scripts.

All components **must** be inside the `Components` directory of your theme for Flynt to find them. The location of this directory can be changed with [Flynt Core](/documentation/core/api/#flynt-componentpath).

<div class="alert alert-info">This tutorial assumes you have setup a new Flynt project with the Flynt CLI. See the <a href="/documentation/getting-started/setting-up-flynt/">Setting up Flynt</a> page for help with this.</div>

## Creating the view file
To start, we'll create an example `BlockQuote` component. The most basic component only needs a single markup (view) file using the templating engine [Twig](https://twig.sensiolabs.org/).

Create a folder in the `Components` directory named `BlockQuote` and add a file named `index.twig`. For now, add the following plain HTML to `index.twig`:

```html
<div is="flynt-block-quote" class="flyntComponent">
    <blockquote class="blockQuote">
        <p>Mistakes are always forgivable, if one has the courage to admit them.</p>
        <cite>Bruce Lee</cite>
    </blockquote>
</div>
```

Here, the `is` attribute and classes are part of the [Flynt best practices](/tutorials/best-practices/styles). We'll come back to this in more detail later when it comes to adding styles and scripts to our component.

Your theme folder will now look like this:

```
├── flynt-starter-theme
|  ├──Components
|  |  ├── BlockQuote
|  |  |  └── index.twig
```

## Rendering your component
To render our `BlockQuote` component, we need to add it to a page template.

All template files can be found in the theme folder, in the `templates` directory. Each PHP template within the `templates` directory takes a simple JSON configuration file, and using the Flynt Core plugin, parses and renders this into HTML.

For example, take `templates/page.php`:

```php
<?php

Flynt\echoHtmlFromConfigFile('default.json');
```

The JSON template configuration files are found in `config/templates`. These configuration files define the [components](/documentation/components/what-is-component) and their [areas](/documentation/components/what-is-component/#what-is-an-area) which are loaded into the template.

For now, we will add the `BlockQuote` component to the `default.json` template.

Open `config/templates/default.json` and add the `BlockQuote` component to the `pageComponents` array:

```json
{
  "name": "DocumentDefault",
  "areas": {
    "layout": [
      {
        "name": "LayoutMultiplePosts",
        "areas": {
          "mainHeader": [],
          "pageComponents": [
            {
              "name": "BlockQuote"
            }
          ],
          "mainFooter": []
        }
      }
    ]
  }
}
```

[You can read more about how page templates work here](/documentation/configuration/page-templates/#configuring-page-templates).

Make sure that you have started your local server by running `flynt start` in your terminal, then open http://localhost:3000 (your port may be different) to see your `BlockQuote` component on the homepage.

The `flynt start` command is provided by the [Flynt CLI](https://github.com/flyntwp/flynt-cli), and will take care of compiling the theme and starting up a local server, as well as watching our theme files for further changes.

**Congratulations!** You have successfully created your first Flynt component.

<div class="alert alert-steps">
  <h2>Next Step</h2>

  <p>Next we'll take our static component and make it more useful by allowing our user to add the data for our quote in the WordPress back end.</p>

  <p><a href="/tutorials/creating-component/passing-data-view/" class="button button--primary">Learn how to pass data to your view</a></p>
</div>
