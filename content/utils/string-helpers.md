---
title: String Helpers
menu:
  main:
    parent: Utils
    identifier: string-helpers
    weight: 60
---

<div class="alert alert-info">
  <p><strong>To use a utility file, do not forget to include the <code>use</code> statement at the top of the file in which you wish to use it. For example: <code>use Utils\StringHelpers</code>.</strong></p>
</div>

## `StringHelpers::camelCaseToKebab($className)`
Converts a camelCaseString to a kebab-cased-string (lowercase, hyphenated).

## `StringHelpers::trimStrip($str, $length = 25)`
Trims the given string to the specified length using [`wp_trim_words`](https://codex.wordpress.org/Function_Reference/wp_trim_words) and strips all tags with [`wp_strip_all_tags`](https://codex.wordpress.org/Function_Reference/wp_strip_all_tags). An elipsis (`...`) is appended if the text is trimmed.

## `StringHelpers::splitCamelCase($input)`
<!-- TODO: Explain this function. -->
