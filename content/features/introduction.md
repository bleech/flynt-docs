---
title: Introduction
weight: 40
menu:
  main:
    parent: Features
    identifier: features-introduction
    weight: 40
---

With Wordpress, it is easy to create one large functions.php file, crammed full of all the custom logic your theme may need. This can get messy. In Flynt, we split each piece of functionality into smaller, self-contained **feature** bundles.

In most cases, features add global hooks and filters that affect the project on a global level. With this in mind, each feature is built with "drag and drop" reusability in mind.

Flynt comes with a core set of ready to go features:

<div class="alert alert-list" data-markdown>
- **[Acf](https://github.com/bleech/wp-starter-theme/tree/master/Features/Acf)**<br>
Load & configure ACF fields and field groups.

- **[AdminComponentPreview](https://github.com/bleech/wp-starter-theme/tree/master/Features/AdminComponentPreview)**<br>
Show screenshots of components in the WP back-end, and on the WP admin bar.

- **[AdminNotices](https://github.com/bleech/wp-starter-theme/tree/master/Features/AdminNotices)**<br>
A wrapper around the WordPress admin notice functionality.

- **[CleanHead](https://github.com/bleech/wp-starter-theme/tree/master/Features/CleanHead)**<br>
Clean-up the WP head markup.

- **[CleanRss](https://github.com/bleech/wp-starter-theme/tree/master/Features/CleanRss)**<br>
Improve WP RSS feeds.

- **[Components](https://github.com/bleech/wp-starter-theme/tree/master/Features/Components)**<br>
Register & configure Flynt Components.

- **[GoogleAnalytics](https://github.com/bleech/wp-starter-theme/blob/master/Features/GoogleAnalytics/GoogleAnalytics.php)**<br>
Add the Google Analytics tracking script.

- **[Jquery](https://github.com/bleech/wp-starter-theme/tree/master/Features/Jquery)**<br>
Load jQuery from a CDN.

- **[MimeTypes](https://github.com/bleech/wp-starter-theme/tree/master/Features/MimeTypes)**<br>
Add SVG support to the media gallery.

- **[Navigation](https://github.com/bleech/wp-starter-theme/tree/master/Features/Navigation)**<br>
Register navigation menus.

- **[PasswordForm](https://github.com/bleech/wp-starter-theme/tree/master/Features/PasswordForm)**<br>
Add the WP password form with twig templates.

- **[RemoveEditor](https://github.com/bleech/wp-starter-theme/tree/master/Features/RemoveEditor)**<br>
Remove `the_content()` editor.

- **[Templates](https://github.com/bleech/wp-starter-theme/tree/master/Features/Templates)**<br>
Set the config path for page templates.

- **[TimberLoader](https://github.com/bleech/wp-starter-theme/tree/master/Features/TimberLoader)**<br>
Enable rendering with Timber/Twig.

- **[TinyMce](https://github.com/bleech/wp-starter-theme/tree/master/Features/TinyMce)**<br>
Clean-up the WP content editor toolbar.

- **[CustomPostTypes](../wordpress/custom-post-types.md)**<br>
Create custom post types with JSON config files.

- **[CustomTaxonomies](#add-link)**<br>
Create custom taxonomies with JSON config files.
</div>
