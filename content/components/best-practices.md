# Best Practises

## Define box sizing in your component styles.
```stylus
[is='flynt-example-component']
  *,
  *:before,
  *:after
    box-sizing: border-box
```

## Alpha-order styles

Always alpha-ordering your styles provides a high-level rule for consistency.

```stylus
.exampleComponent
  &-title
    background-color: #000
    color: #fff
    text-decoration: underline
```

## Styles should extend from their nearest [maintainableCSS 'module'](http://maintainablecss.com/chapters/modules/).

```html
<div is='flynt-example-component'>
  <div class="exampleComponent">
    <h1 class="exampleComponent-title">Lorem ipsum</h1>
    <p class="exampleComponent-description">Lorem ipsum dolor sit.</p>
  </div>
</div>
```

```stylus
[is='flynt-example-component']
  *,
  *:before,
  *:after
    box-sizing: border-box

  .exampleComponent
    &-title
      color: blue

    &-description
      color: red
```

## Use [maintainableCSS state classes](http://maintainablecss.com/chapters/state/).

```stylus
.exampleComponent
  &-basket
    background-color: #fff

    &-isEmpty
      background-color: #eee
```

## Component variables can use the global variables, but should always include a fallback if it doesn't exist.

```stylus
$rupture.scale = lookup('$global-layout-scale') || (0 400px 767px 991px 1200px)
$gutterWidth = lookup('$global-layout-gutterWidth') || 15px
```

## Nest Media Queries

Write nested media queries when it makes sense and doesn’t bloat the file or become unreadable.

```stylus
.exampleComponent
  &-title
    background-color: #000
    color: #fff
    text-decoration: underline

    +below(500px)
      color: #00ff00
```

## Use [rupture's scale](https://github.com/jescalan/rupture) for writing media queries.

```
.exampleComponent
  &-title
    color: blue

    +below('m')
      font-size: 18px
```
