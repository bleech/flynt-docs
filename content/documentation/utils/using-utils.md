---
title: Using Utils
weight: 51
menu:
  main:
    parent: Utils
    identifier: using-utils
    weight: 51
---

To use any Util, you must only include the `use` statement at the top of your PHP file. The name will match the file name of the Util in `lib/Utils`. For example, to use the `Asset` Util:

```php
<?php

use Flynt\Utils\Asset;
```

All functions within `Asset` will now be available in your file.

```php
<?php

use Flynt\Utils\Asset;

$image = Asset::requireUrl('Components/ListPosts/assets/image.jpg');
```

See the ["What is a Util?"](/documentation/utils/what-is-util/) page to see a full list of Flynt Utils and what they are for.
