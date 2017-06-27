---
title: "Static Assets"
weight: 36
menu:
  main:
    parent: components
    weight: 36
---

All assets (scripts, styles, and images, and SVGs) of a component should be contained within the individual component folder.

Images and SVGs should be placed into the `assets` folder:

```
ExampleComponent/
├── assets/
|   ├── exampleImage.jpg
|   └── exampleIcon.svg
```

## Compiling Assets

When gulp is running, all files (other than JavaScript and Stylus files) within the Components folder will be directly copied to the `dist` folder.

All stylus files, with the exception of partials, will be piped through [Autoprefixer](https://github.com/postcss/autoprefixer) and then compiled into the `dist` folder as CSS. [Learn more about component styles here](/guide/components/styling/).

Javascript files **with the following file names only** will be compiled to the `dist` folder using [Babel](https://babeljs.io/):

- script.js
- auth.js
- admin.js

[Learn more about component scripts here.](/guide/components/client-side-scripts/)

## Using Static Assets in the View
To use a static asset URL in the view of a component, it is necessary to use the [Flynt Asset util](https://github.com/flyntwp/flynt-starter-theme/blob/master/lib/Utils/Asset.php) within the [`addComponentData` filter](/guide/components/server-side-logic/#flynt-addcomponentdata).

This is because all assets are automatically revisioned by [gulp-rev](https://github.com/sindresorhus/gulp-rev) (for example, `exampleIcon.svg` → `exampleIcon-d41d8cd98f.svg`). With the Asset util, we can reference the rev-manifest and fetch the correct file. For example, in the `functions.php` of a component:

```php
<?php

namespace Flynt\Components\ExampleComponent;

use Flynt\Utils\Asset;

add_filter('Flynt/addComponentData?name=ExampleComponent', function ($data)
{
    $data['downloadIconSrc'] = Asset::requireUrl('Components/ExampleComponent/assets/downloadIcon.svg');
    return $data;
});
```

In the `index.twig` view template, the `downloadIcon` variable can then be used:

```twig
<div is="flynt-example-component" class="flyntComponent">
  <img src="{{ downloadIconSrc }}" alt="">
</div>
```

## Using Static Assets in Styles
To use static assets in style files, the path to the file must be included relative to the root of the theme.  For example:

```
├── flynt-starter-theme
|  ├──Components
|  |  ├── ExampleComponent
|  |  |  ├── assets
|  |  |  |  └── downloadIcon.svg
|  |  |  └── style.styl
```

With the above file tree, `downloadIcon.svg` must be referenced inside `style.styl` as follows:

```stylus
.downloadIcon
  background-image: url('../../Components/ExampleComponent/assets/downloadIcon.svg')
```
