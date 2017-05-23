---
title: Quick Start
weight: 70
aliases:
  - /documentation/core/
menu:
  main:
    parent: Core
    weight: 70
---

## What is Flynt Core?

The Flynt Core plugin is the basic building block of the Flynt Framework. Flynt Core offers a small public interface in combination with a few WordPress hooks to achieve the main principles and ideas behind the framework.

## Getting Started

Getting started with the Flynt Core plugin is a simple two step process:

1. Install the Flynt Core plugin into the standard Wordpress folder.
2. Activate the plugin in the Wordpress Administration "Plugins" panel.

That's it!

### First steps

The simplest way of using Flynt Core can be demonstrated with the following *Hello, world* example:

In your theme's `index.php` add:

```php
Flynt\echoHtmlFromConfig([
  'name' => 'HelloWorld'
]);
```

...and to your theme's `functions.php`:

```php
add_filter('Flynt\renderComponent?name=HelloWorld', function () {
  return 'Hello, world!';
});
```

That's it! You have successfully used Flynt Core for the first time.

### Next steps

We can take this a step further by initializing the plugins defaults. This will:
- Implement the intended component structure.
- Load additional component scripts.
- Enable PHP file rendering.

To do so, add the following line of code to your theme's `functions.php`:

```php
Flynt\initDefaults();
```

This will add the following hooks:

```php
add_filter('Flynt/configPath', ['Flynt\Defaults', 'setConfigPath'], 999, 2);
add_filter('Flynt/configFileLoader', ['Flynt\Defaults', 'loadConfigFile'], 999, 3);
add_filter('Flynt/componentPath', ['Flynt\Defaults', 'setComponentPath'], 999, 2);
add_action('Flynt/registerComponent', ['Flynt\Defaults', 'checkComponentFolder']);
add_action('Flynt/registerComponent', ['Flynt\Defaults', 'loadFunctionsFile']);
add_filter('Flynt/renderComponent', ['Flynt\Defaults', 'renderComponent'], 999, 4);
```

In summary, these hooks do the following:
- Load config files from the `./config` directory.
- Parse `.json` config files.
- Set the component path to `./Components`.
- Require components to be registered.
- Load `./Components/{$componentName}/function.php` from every registered component, if the file exists.
- Render `./Components/{$componentName}/index.php` and make view helper function `$data` and `$area` available.
  - `$data` is used to access the component's data in the view template.
  - `$area` is used to include the HTML of an area's components into the components template itself.
