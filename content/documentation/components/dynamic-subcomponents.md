---
title: Dynamic Sub-Components
weight: 33
menu:
  main:
    parent: Components
    weight: 33
---

<!-- TODO: Test priority of filters < 999. -->

The `Flynt/dynamicSubcomponents` filter allows a component to dynamically create new areas with components within them. Components can be added to the new area with exactly the same configuration options as with [Flynt page templates](../wordpress/page-templates.md). For example:

```php
<?php
add_filter('Flynt/dynamicSubcomponents?name=ParentComponent', function ($areas)
{
    $areas['newAreaName'] = [
        [
            'name' => 'ChildComponentName',
            'customData' => [
              'exampleData' => 1
            ]
        ],
        [
            'name' => 'AnotherComponentName'
        ]
    ];
    return $areas;
}, 10);
```

It is also possible to access the `$data` and `$parentData` of the component that the filter is applied to. This is useful if, for example, you need to dynamically load components of an [ACF flexible content field group](fields/flexible-content.md):

```php
<?php
add_filter('Flynt/dynamicSubcomponents?name=FlexibleContent', function ($areas, $data, $parentData) {
    $fieldGroup = $data['fieldGroup'];
    if (array_key_exists($fieldGroup, $parentData['post']->fields) &&
    $parentData['post']->fields[$fieldGroup] !== false
    ) {
        $areas['flexibleContent'] = array_map(function ($field) use ($parentData) {
            return [
            'name' => ucfirst($field['acf_fc_layout']),
            'customData' => $field,
            'parentData' => $parentData // overwrite parent data of child components
            ];
        }, $parentData['post']->fields[$data['fieldGroup']]);
    }
    return $areas;
}, 10, 3);
```
