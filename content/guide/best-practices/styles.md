---
title: "Styles"
weight: 21
menu:
  main:
    parent: Best Practices
    identifier: best-practices-styles
    weight: 21
---

## Scope
Styles should always be scoped to the component using the `is` attribute. [This attribute is also used in the component script file.](/guide/best-practices/scripts/#the-is-attribute)

The styles for a component should include all the essential styling a component needs to function correctly on its own. This includes setting the box-sizing property for your component.

```stylus
[is='flynt-example-component']
  *,
  *:before,
  *:after
    box-sizing: border-box

  .exampleComponent
    &-title
      color: red
```

## MaintainableCSS
All components shipped with Flynt adhere to [MaintainableCSS](http://maintainablecss.com). MaintainableCSS helps writing modular and scalable CSS with maintainability in mind. We strongly recommend following this approach for all of your components.

## Jeet
If using Stylus, you will have access to the [Jeet grid system](http://jeet.gs/). Jeet is a powerful and flexible approach to creating grids with CSS.

```stylus
[is='flynt-example-component']
  .exampleComponent
    &-container
      center(1400px, 15px)

    &-content
      column(2/3)

    &-sidebar
      column(1/3)
```

## Media Queries
If using Stylus, Flynt uses the [Rupture](https://github.com/jescalan/rupture) utility for working with media queries.

Rupture must be provided a scale variable, which represents the scale of your site in slices:

```stylus
rupture.scale =        0        400px       600px      800px        1050px     1800px

//                     └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────
// Slice numbers:           1           2           3           4           5           6
rupture.scale-names:       'xs'        's'         'm'         'l'         'xl'        'hd'
```

This scale can then be referenced with Rupture's `+above`, `+below`, and `+between` mixins.

```stylus
rupture.scale = 0 400px 600px 800px 1050px 1800px

[is='flynt-example-component']
  .exampleComponent
    &-container
      center($max-width: 1400px, $pad: 15px)

    &-content
      +above('m')
        column(2/3)

    &-sidebar
      +above('m')
        column(1/3)
```

<!-- TODO: Add section on using global variables  -->
