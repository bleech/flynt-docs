---
title: What is the Core Plugin?
weight: 70
aliases:
  - /guide/core/
menu:
  main:
    parent: core
    weight: 70
---

The [Flynt Core WordPress plugin](https://github.com/flyntwp/flynt-core) is the main building block of the Flynt Framework. It provides a small public interface, combined with several WordPress hooks, to achieve the main principles of the framework.

This plugin essentially functions as a HTML generator with two key steps:

1. Given a minimal configuration, the Flynt Core plugin creates a hierarchical plan for how the site will be constructed ([the Construction Plan](/guide/core/construction-plan)).
2. [The Construction Plan](/guide/core/construction-plan) is parsed and rendered into HTML.

Each configuration passed to the plugin represents a single [component](/guide/components/). This configuration can also contain additional, nested component configurations, which are contained within [areas](/guide/components/what-is-component/#what-is-an-area).

## Install

<!-- TODO: install via WordPress instructions -->

To install via composer, run:

```bash
composer require flyntwp/flynt-core
```

Activate the plugin in the WordPress back end and you're good to go.

## Usage

### Hello World
To see the simplest way of using Flynt Core, add the following code to your theme's `functions.php`:

```php
$componentManager = Flynt\ComponentManager::getInstance();
$componentManager->registerComponent('HelloWorld');

add_filter('Flynt/renderComponent?name=HelloWorld', function () {
    return 'Hello, world!';
});
```
This defines a new component ('HelloWorld'), which when rendered, will output the text 'Hello, world!'.

To render the component, add the following code to your theme's `index.php`:

```php
Flynt\echoHtmlFromConfig([
    'name' => 'HelloWorld'
]);
```

### Initialize Default Settings

We recommend initializing the plugin's default settings. Do this by adding the following line of code to your theme's `functions.php`:

```php
Flynt\initDefaults();
```

This will:

- Implement the component structure.
- Load component scripts.
- Enable PHP file rendering.

This also adds the following hooks:

```php
// Set the config path to './config'.
add_filter('Flynt/configPath', ['Flynt\Defaults', 'setConfigPath'], 999, 2);

// Parse `.json` config files.
add_filter('Flynt/configFileLoader', ['Flynt\Defaults', 'loadConfigFile'], 999, 3);

// Set the component path to `./Components`.
add_filter('Flynt/componentPath', ['Flynt\Defaults', 'setComponentPath'], 999, 2);

// Load ./Components/{$componentName}/functions.php from every registered component.
add_action('Flynt/registerComponent', ['Flynt\Defaults', 'loadFunctionsFile']);

// Render `./Components/{$componentName}/index.php` and make view helper functions `$data` and `$area` available (see explanation below).
add_filter('Flynt/renderComponent', ['Flynt\Defaults', 'renderComponent'], 999, 4);
```

With the `Flynt/renderComponent` filter added above you can now use the following helper functions in your template files:

- `$data` is used to access the component's data in the view template.
- `$area` is used to include the HTML of an area's components into the components template itself.
