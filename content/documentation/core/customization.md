---
title: Customization
weight: 72
menu:
  main:
    parent: Core
    weight: 72
---


## Changing the Styling Language

Flynt Theme supports Stylus and vanilla CSS by default, but we don't enforce this. You can easily switch your styling flavor with Gulp.

Unfortunately, by changing from Stylus, you will lose the media query helper **[Rupture](https://github.com/jescalan/rupture)**.

### Switching to Sass
As an example, this section will demonstrate how to use Sass, instead of Stylus.

1\. Install `gulp-sass` with yarn:

  ```
  yarn add gulp-sass -D
  ```

2\. Create `gulpfile.js/tasks/sass.js` and add the following code:  

  ```javascript
  const browserSync = require('browser-sync')
  const changed = require('gulp-changed')
  const gulp = require('gulp')
  const path = require('path')
  const sourcemaps = require('gulp-sourcemaps')
  const sass = require('gulp-sass')
  const gulpIf = require('gulp-if')

  module.exports = function (config) {
    const isProduction = process.env.NODE_ENV === 'production'
    gulp.task('sass', function () {
      return gulp.src(config.sass)
      .pipe(changed(config.dest))
      .pipe(gulpIf(!isProduction, sourcemaps.init()))
      .pipe(sass({
        compress: isProduction,
        import: [
          path.resolve(__dirname, '../../Modules/_variables.sass'),
          path.resolve(__dirname, '../../node_modules/jeet/scss/index.scss')
        ]
      }))
      .pipe(gulpIf(!isProduction, sourcemaps.write(config.sourcemaps)))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.stream())
    })
  }
  ```

3\. In `gulpfile.js/config.js`, add a `sass` configuration to `module.exports`:
  ```js
  module.exports = {
    sass: [
      './{Modules,assets}/**/style.scss',
      './{Modules,assets}/**/style.sass'
    ],
    //...
  }
  ```

4\. In `gulpfile.js/watch.js`, add these files to be watched for changes:

  ```js
  module.exports = function (config) {
    gulp.task('watch:files', function () {
      watch(config.sass, function () { gulp.start('sass') })
      //...
    })
    //...
  }
  ```

5\. In `gulpfile.js/webpack.config.js`, add the following configuration for sass within the output object:

  ```js
  const output = {
    //...
    sass: {
      import: ['~jeet/scss/index.scss']
    },
    plugins: //...
  }
  ```

  That's it! This will provide basic Sass support, along with [Jeet Sass](http://jeet.gs/). As a next step, we would strongly recommend adding linting for Sass files, but this is not covered in this section.

## Changing Template Language

Whilst the theme uses [Twig](twig.sensiolabs.org) as the default template language, this is not strictly enforced.

### PHP Templates
To use plain PHP, simply create `index.php`, rather than `index.twig`.

The data passed to a component is still available using the `$data` function. For example:

#### Twig:
```twig
<div is="flynt-example-module">
  <h1>{{ title }}</h1>
</div>
```

#### PHP:
```php
<div is="flynt-example-module">
  <h1><?= $data('title') ?></h1>
</div>
```

### Other Template Engines
To switch to another template engine, use the `renderComponent` filter provided by the Flynt Core plugin.

As an example, the below code demonstrates how to switch to [Smarty](http://www.smarty.net/) for rendering your templates.

```php
<?php
add_filter('Flynt/renderComponent', function($output, $componentName, $componentData, $areaHtml) {
  // Get index file.
  $componentManager = Flynt\ComponentManager::getInstance();
  $filePath = $componentManager->getComponentFilePath($componentName, 'index.tpl');

  // Add areas to data.
  $data = array_merge($componentData, ['areas' => $areaHtml]);

  // Assign data.
  $smarty = new Smarty;
  $smarty->assign($data);

  // Return html rendered by Smarty.
  return $smarty->display($filePath);
}, 10, 4);
```

Your component data will now be available as usual in `index.tpl`:

```
<div is="flynt-example-module">
  <h1>{$title}</h1>
</div>
```
