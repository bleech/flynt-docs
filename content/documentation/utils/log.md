---
title: Log
weight: 54
menu:
  main:
    parent: Utils
    weight: 54
---

<div class="alert alert-info">
  <p><strong>To use a utility file, do not forget to include the <code>use</code> statement at the top of the file in which you wish to use it. For example: <code>use Utils\Log</code>.</strong></p>
</div>

The Log utility can be used to log data to various locations:

## `Log::console($data)`
Output the data to the console with `console.log`, along with the file this function was called from.

## `Log::error($data)`
Output the data to the console with `console.error`, along with the file this function was called from.

## `Log::pp($data)`
Output the data to the page using `print_r`, wrapped in `<pre>` tags, along with the location this function was called from.
