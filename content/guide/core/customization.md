---
title: Customization
weight: 72
menu:
  main:
    parent: core
    weight: 72
---


## Changing the Styling Language

Flynt Theme supports Stylus and vanilla CSS by default, but we don't enforce this. You can easily switch your styling flavor with Gulp.

Unfortunately, by changing from Stylus, you will lose the media query helper **[Rupture](https://github.com/jescalan/rupture)**.

### Switching to Sass
As an example, this section will demonstrate how to use Sass, instead of Stylus.

1\. Install [gulp-sass](https://www.npmjs.com/package/gulp-sass) with [Yarn](https://yarnpkg.com/en/):

```bash
yarn add gulp-sass
```

2\. Create `gulpfile.js/tasks/sass.js` and add the following code:

```js
const autoprefixer = require('autoprefixer-stylus')
const browserSync = require('browser-sync')
const changed = require('gulp-changed')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const handleErrors = require('../utils/handleErrors')
const path = require('path')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')

module.exports = function (config) {
  const isProduction = process.env.NODE_ENV === 'production'
  gulp.task('sass', function () {
    return gulp.src(config.sass)
    .pipe(changed(config.dest))
    .pipe(gulpIf(!isProduction, sourcemaps.init()))
    .pipe(sass({
      compress: isProduction,
      use: [
        autoprefixer()
      ],
      import: [
        path.resolve(__dirname, '../../Components/_variables.sass'),
        path.resolve(__dirname, '../../node_modules/jeet/scss/index.scss')
      ]
    }))
    .on('error', handleErrors)
    .pipe(gulpIf(!isProduction, sourcemaps.write(config.sourcemaps)))
    .pipe(gulp.dest(config.dest))
    .on('error', handleErrors)
    .pipe(browserSync.stream())
  })
}
```

3\. In `gulpfile.js/config.js`, add a `sass` configuration to `module.exports`:

```js
module.exports = {
  sass: [
    './{Components,Features}/**/*.sass',
    '!./{Components,Features}/**/_*.sass',
    './{Components,Features}/**/*.scss',
    '!./{Components,Features}/**/_*.scss'
  ],
  //...
}
```

4\. In `gulpfile.js/watch.js`, add these files to be watched for changes:

```js
module.exports = function (config) {
  gulp.task('watch:files', function () {
    watchAndDelete(config.watch.sass, function () { gulp.start('sass') }, config.dest)
    //...
  })
  //...
}
```

That's it! This will provide basic Sass support, along with [Jeet Sass](http://jeet.gs/).

## Changing the Template Language

Whilst the theme uses [Twig](https://twig.sensiolabs.org) as the default template language, this is not strictly enforced.

### PHP Templates
To use plain PHP, simply create `index.php`, rather than `index.twig`.

The data passed to a component is still available using the `$data` function, and areas can be output using the `$area` helper function. For example:

#### Twig:
```twig
<div is="flynt-example-module">
  <h1>{{ title }}</h1>
  <div class="pageComponents">
    {{ area('pageComponents') }}
  </div>
</div>
```

#### PHP:
```php
<div is="flynt-example-module">
  <h1><?= $data('title') ?></h1>
  <div class="pageComponents">
    <?= $area('pageComponents') ?>
  </div>
</div>
```

### Other Template Engines
To switch to another template engine, use the [renderComponent](/guide/core/api/#flynt-rendercomponent) filter provided by the Flynt Core plugin.

For example, to switch to [Smarty](http://www.smarty.net/):

1\. Install Smarty with composer:

```bash
composer require smarty/smarty
```

2\. [Create a feature](/guide/features/creating-features/) named `SmartyLoader`.

3\. Use the `renderComponent` filter in `SmartyLoader/functions.php`:

```php
<?php

namespace Flynt\Features\SmartyLoader;

use Flynt;
use Smarty;

// Render Component with Smarty.
add_filter('Flynt/renderComponent', function ($output, $componentName, $componentData, $areaHtml) {
    // get index file
    $componentManager = Flynt\ComponentManager::getInstance();
    $filePath = $componentManager->getComponentFilePath($componentName, 'index.tpl');

    // Return warning if template not found.
    if (!is_file($filePath)) {
        trigger_error("Template not found: {$filePath}", E_USER_WARNING);
        return $output;
    }

    // Add areas to data.
    $data = array_merge($componentData, ['areas' => $areaHtml]);

    // Assign data.
    $smarty = new Smarty();
    $smarty->assign($data);

    // Return HTML rendered by Smarty.
    return $smarty->fetch($filePath);
}, 10, 4);

```

4\. Add the feature in `Lib/init.php`:

```php
add_theme_support('flynt-smarty-loader');
```

5\. Done! Your component data will now be available as usual in `index.tpl`:

```
<div is="flynt-example-component">
  <h1>{$title}</h1>
  {$areas.exampleArea}
</div>
```

It is important to note that here we use the `$areas` variable as a simple example. To ensure that area data is not overwritten, create an `area` helper function. An example of this can be found in the [TimberLoader feature](https://github.com/flyntwp/flynt-starter-theme/blob/master/Features/TimberLoader/functions.php).
