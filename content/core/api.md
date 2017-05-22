---
title: API
weight: 73
menu:
  main:
    parent: Core
    identifier: core-api
    weight: 73
---

## Flynt (namespace)

This is the main namespace of the plugin. In your theme you should only need to call the functions contained in the namespace. The following public functions are available:

### initDefaults
```php
function initDefaults()
```
Initializes a set of defaults used for regular setups.

### registerComponent
```php
function registerComponent(string $componentName, string $componentPath = null)
```
Registers a component for later use. If no `$componentPath` is specified, the default will be taken.

```php
function registerComponents(array $components = [])
```
Registers an array of components for later use. The array can consist of component names only (as values), or with the component name as key and component path as value.

### (echo|get)HtmlFromConfig
```php
function echoHtmlFromConfig(array $config)
```
```php
function getHtmlFromConfig(array $config)
```
Return and optionally echo the HTML generated from processing a given configuration array.

### (echo|get)HtmlFromConfigFile
```php
function echoHtmlFromConfigFile(string $fileName)
```
```php
function getHtmlFromConfigFile(string $fileName)
```
Return and optionally echo the HTML generated from processing a given configuration file.

## ComponentManager (class)

Singleton used internally to manage registered components.

### getInstance (static)
Get the singleton of the ComponentManager.
```php
public static function getInstance()
```

### registerComponent
Register a component for later use.
```php
public function registerComponent(string $componentName, string $componentPath = null)
```

### getComponentFilePath
Get the path to a component specific file.
```php
public function getComponentFilePath(string $componentName, string $fileName = 'index.php')
```

### getAll
Get all registered Components.
```php
public function getAll()
```

### removeAll
Remove all registered Components.
```php
public function removeAll()
```

## BuildConstructionPlan (class)

Used internally to create a complete construction plan from a minimal config.

### fromConfig (static)

Build the construction plan from a config array.

```php
public static function fromConfig (array $config)
```

### fromConfigFile (static)

Build the construction plan from a config file. Uses filters `Flynt/configPath` and
`Flynt/configFileLoader` to determine file path and loading logic.

```php
public static function fromConfigFile (string $configFileName)
```

## Render (class)

Used internally to render a construction plan.

### fromConstructionPlan (static)

Render HTML from a given construction plan.

```php
public static function fromConstructionPlan (array $constructionPlan)
```

## WordPress Filters

### Flynt/componentPath
Modify the path of a component.

Arguments for callable:
<dl>
  <dt>$componentPath</dt>
  <dd>the path of the component</dd>

  <dt>$componentName</dt>
  <dd>the name of the component</dd>
</dl>

Default:
```php
add_filter('Flynt/componentPath', ['Flynt\Defaults', 'setComponentPath'], 999, 2);
```
```php
namespace Flynt;
class Defaults {
  public static function setComponentPath($componentPath, $componentName) {
    if (is_null($componentPath)) {
      $componentPath = self::getComponentsDirectory() . '/' . $componentName;
    }
    return $componentPath;
  }
}
```
### Flynt/configPath
Modify the path of the config files that can be specified in `(echo|get)HtmlFromConfigFile`

Arguments for callable:
<dl>
  <dt>$configPath</dt>
  <dd>the path of the config file</dd>

  <dt>$configFileName</dt>
  <dd>the name of the config file</dd>
</dl>

Default:
```php
add_filter('Flynt/configPath', ['Flynt\Defaults', 'setConfigPath'], 999, 2);
```
```php
namespace Flynt;
class Defaults {
  public static function setConfigPath($configPath, $configFileName) {
    if (is_null($configPath)) {
      $configPath = get_template_directory() . '/' . self::CONFIG_DIR . '/' . $configFileName;
    }
    return $configPath;
  }
}
```
### Flynt/configFileLoader
Modify the logic of loading a config file. Default loads `json` files. Can be used to load other formats like `yaml`.

Arguments for callable:
<dl>
  <dt>$config</dt>
  <dd>the loaded config. `null` by default</dd>

  <dt>$configName</dt>
  <dd>the path of the config file</dd>

  <dt>$configPath</dt>
  <dd>the name of the config file</dd>
</dl>

Default:
```php
add_filter('Flynt/configFileLoader', ['Flynt\Defaults', 'loadConfigFile'], 999, 3);
```
```php
namespace Flynt;
class Defaults {
  public static function loadConfigFile($config, $configName, $configPath) {
    if (is_null($config)) {
      $config = json_decode(file_get_contents($configPath), true);
    }
    return $config;
  }
}
```
### Flynt/initComponentConfig
Modify the config unsed to build the construction plan.

Component specific filter: `Flynt/initComponentConfig?name={$config['name']}`
### Flynt/addComponentData
Final point to modify the data of a component. Called after the data filters and adding custom data. This is the default place to do data manipulation and preparation before passing it to the render function.

Component specific filter: `Flynt/addComponentData?name={$config['name']}`

Arguments for callable:
<dl>
  <dt>$data</dt>
  <dd>the component's data that will be used for rendering</dd>

  <dt>$parentData</dt>
  <dd>the component's parent's data</dd>

  <dt>$config</dt>
  <dd>entire config of the component</dd>
</dl>

Example:
```php
add_filter('Flynt/addComponentData?name=PageHeader', function ($data, $parentData) {
  if (!empty($parentData['post_thumbnail']) && array_key_exists('url', $parentData['post_thumbnail'])) {
    $data['image'] = $parentData['post_thumbnail']['url'];
  }
  return $data;
}, 10, 2);
```
### Flynt/dynamicSubcomponents?name={$config['name']}
Modify the component's areas. Can be used to dynamically add sub components based on data comming from the data filter.

Arguments for callable:
<dl>
  <dt>$areas</dt>
  <dd>the rendered HTML</dd>

  <dt>$componentData</dt>
  <dd>the component's data</dd>

  <dt>$parentData</dt>
  <dd>the component's parent's data</dd>
</dl>

Example:

```php
add_filter('Flynt/dynamicSubcomponents?name=FlexibleContent', function ($areas, $data, $parentData) {
  $fieldGroup = $data['fieldGroup'];
  if (array_key_exists($fieldGroup, $parentData) && $parentData[$fieldGroup] !== false) {
    $areas['flexibleContent'] = array_map(function ($field) use ($parentData) {
      return [
        'name' => ucfirst($field['acf_fc_layout']),
        'customData' => $field,
        'parentData' => $parentData // overwrite parent data of child components
      ];
    }, $parentData[$data['fieldGroup']]);
  }
  return $areas;
}, 10, 3);
```

### Flynt/renderComponent
Specify the way how components or a single component should be rendered.

Component specific filter: `Flynt/renderComponent?name={$componentName}`

Arguments for callable:
<dl>
  <dt>$output</dt>
  <dd>the rendered HTML</dd>

  <dt>$componentName</dt>
  <dd>the name of the component</dd>

  <dt>$componentData</dt>
  <dd>the component's data</dd>

  <dt>$areaHtml</dt>
  <dd>the rendered HTML of the component's areas</dd>
</dl>

Default:
```php
add_filter('Flynt/renderComponent', ['Flynt\Defaults', 'renderComponent'], 999, 4);
```
```php
namespace Flynt;
class Defaults {
  public static function renderComponent($output, $componentName, $componentData, $areaHtml) {
    if (is_null($output)) {
      $componentManager = ComponentManager::getInstance();
      $filePath = $componentManager->getComponentFilePath($componentName);
      $output = self::renderFile($componentData, $areaHtml, $filePath);
    }
    return $output;
  }
}
```

## Actions

### Flynt/registerComponent
Exectuted when any or a specific component is registered. Can be used to load additional files.

Component specific action: `Flynt/registerComponent?name={$config['name']}`

Arguments for callable:
<dl>
  <dt>$componentPath</dt>
  <dd>the path of the component</dd>

  <dt>$componentName*</dt>
  <dd>the name of the component (*not available in component specific action)</dd>
</dl>

Defaults:
```php
add_action('Flynt/registerComponent', ['Flynt\Defaults', 'checkComponentFolder']);
add_action('Flynt/registerComponent', ['Flynt\Defaults', 'loadFunctionsFile']);
```
```php
namespace Flynt;
class Defaults {
  public static function checkComponentFolder($componentPath) {
    if (!is_dir($componentPath)) {
      trigger_error("Register Component: Folder {$componentPath} not found!", E_USER_WARNING);
    }
  }
  public static function loadFunctionsFile($componentPath) {
    $filePath = $componentPath . '/functions.php';
    if (file_exists($filePath)) {
      require_once $filePath;
    }
  }
}
```
