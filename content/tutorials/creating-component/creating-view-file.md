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

All components **must** be inside the `Components` directory of your theme for Flynt to find them. The location of this directory can be changed with [Flynt Core](/documentation/core/what-is-core/).

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

Your file tree will now look like this:

```
├── flynt-starter-theme
|  ├──Components
|  |  ├── BlockQuote
|  |  |  └── index.twig
```

## Rendering your component
To render our `BlockQuote` component, we need to add it to a page template. The structure of each page within the theme is created using a nested JSON object. The JSON template configuration files are found in `config/templates`. These configuration files define the [components](/documentation/components/what-is-component/) and their [areas](/documentation/components/what-is-component/#what-is-an-area) which are loaded into the template.

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

Make sure that you have started your local server by running `flynt start` in your terminal, then open http://localhost:3000 (your port may be different) to see your `BlockQuote` component on the homepage.

**Congratulations!** You have successfully created your first Flynt component.

<div class="alert alert-steps">
  <h2>Next Step</h2>

  <p>Next we'll take our static component and make it more useful by allowing our user to add the data for our quote in the WordPress back end.</p>

  <p><a href="/tutorials/creating-component/passing-data-view/" class="button button--primary">Learn how to pass data to your view</a></p>
</div>
