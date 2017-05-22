---
title: Asset
menu:
  main:
    parent: Utils
    identifier: asset
    weight: 30
---

<div class="alert alert-info">
  <p><strong>To use a utility file, do not forget to include the <code>use</code> statement at the top of the file in which you wish to use it. For example: <code>use Utils\Asset</code>.</strong></p>
</div>

For caching purposes, all static assets are automatically revisioned by gulp (for example, `icon.svg` → `icon-d41d8cd98f.svg`). As such, this file includes helper functions for retrieving revisioned files.

## `Asset::requireUrl($asset)`
Return a revisioned static asset URL.

## `Asset::requirePath($asset)`
Return a revisioned static asset path.
