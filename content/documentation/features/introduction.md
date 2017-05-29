---
title: Introduction
weight: 40
aliases:
  - /documentation/features/
menu:
  main:
    parent: Features
    identifier: introduction-features
    weight: 40
---

With Wordpress, it is easy to create one large functions.php file, crammed full of all the custom logic your theme may need. This can get messy. In Flynt, we split each piece of functionality into smaller, self-contained **feature** bundles.

In most cases, features add global hooks and filters that affect the project on a global level. With this in mind, each feature is built with "drag and drop" reusability in mind.

Flynt comes with a core set of ready to go features:

<div class="alert alert-list">
  <ul>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/Acf">Acf</a><br>
      Load &amp; configure ACF fields and field groups.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/AdminComponentPreview">AdminComponentPreview</a><br>
      Show screenshots of components in the WP back-end, and on the WP admin bar.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/AdminNotices">AdminNotices</a><br>
      A wrapper around the WordPress admin notice functionality.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/CleanHead">CleanHead</a><br>
      Clean-up the WP head markup.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/CleanRss">CleanRss</a><br>
      Improve WP RSS feeds.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/Components">Components</a><br>
      Register &amp; configure Flynt Components.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/blob/master/Features/GoogleAnalytics/GoogleAnalytics.php">GoogleAnalytics</a><br>
      Add the Google Analytics tracking script.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/Jquery">Jquery</a><br>
      Load jQuery from a CDN.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/MimeTypes">MimeTypes</a><br>
      Add SVG support to the media gallery.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/Navigation">Navigation</a><br>
      Register navigation menus.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/PasswordForm">PasswordForm</a><br>
      Add the WP password form with twig templates.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/RemoveEditor">RemoveEditor</a><br>
      Remove <code>the_content()</code> editor.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/Templates">Templates</a><br>
      Set the config path for page templates.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/TimberLoader">TimberLoader</a><br>
      Enable rendering with Timber/Twig.
    </li>
    <li>
      <a href="https://github.com/bleech/wp-starter-theme/tree/master/Features/TinyMce">TinyMce</a><br>
      Clean-up the WP content editor toolbar.
    </li>
    <li>
      <a href="../wordpress/custom-post-types.md">CustomPostTypes</a><br>
      Create custom post types with JSON config files.
    </li>
    <li>
      <a href="#add-link">CustomTaxonomies</a><br>
      Create custom taxonomies with JSON config files.
    </li>
  </ul>
</div>
