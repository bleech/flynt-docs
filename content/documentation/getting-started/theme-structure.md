---
title: Theme Structure
weight: 12
menu:
  main:
    parent: "Getting Started"
    weight: 12
---

The Flynt Theme uses the following structure:

```
flynt-theme/                     # → Root of the theme
├── Components/                  # → All components
├── config/                      # → WP/ACF Configuration
│   ├── customPostTypes/         # → Configure custom post types
│   ├── fieldGroups/             # → Configure ACF field groups
│   ├── templates/               # → Page templates (JSON)
├── dist/                        # → Built theme files (never edit)
├── Features/                    # → All features
├── gulpfile.js/                 # → Gulp tasks and setup
│   ├── tasks/                   # → Individual gulp-tasks, e.g. webpack, stylus
│   ├── config.js                # → Gulp config
│   ├── index.js                 # → Load gulp tasks with config
│   ├── webpack.config.js        # → Webpack config
├── lib/                         # → Hold utils and setup features
│   ├── Utils/                   # → Small utility functions
│   ├── Bootstrap.php            # → Flynt Bootstrap
│   ├── Init.php                 # → Setup theme, register features
├── node_modules/                # → Node.js packages (never edit)
├── templates/                   # → Page templates (PHP)
├── .env                         # → Configures dev environment
├── .flynt.json                  # → Configures Flynt
├── .gitignore                   # → Files/Folders that will not be committed to Git.
├── .stylintrc                   # → Define Stylus linting rules
├── bower.json                   # → Bower dependencies
├── composer.json                # → Composer dependencies
├── composer.lock                # → Composer lock file (never edit)
├── functions.php                # → Set template directory and load lib/Init.php
├── index.php                    # → Theme entry point (never edit)
├── package.json                 # → Node.js dependencies and scripts
├── phpcs.ruleset.xml            # → Define PHP linting rules
├── screenshot.png               # → Theme screenshot for WP admin
├── style.css                    # → Required WordPress theme style file.
├── yarn.lock                    # → Yarn lock file (never edit)
```

