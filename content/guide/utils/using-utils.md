---
title: Using Utils
weight: 51
menu:
  main:
    parent: Utils
    identifier: using-utils
    weight: 51
---

To use any Util, you must include the `use` statement at the top of your PHP file. The name will match the file name of the Util in `lib/Utils`. For example, to use the `Asset` Util:

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

All Utils are loaded in `lib/Init.php`, and are availaible for use in all files loaded after this point in execution. Any PHP file loaded before this point will need to take care of loading the Util itself.

See the ["What is a Util?"](/guide/utils/what-is-util/) page to see a full list of Flynt Utils and what they are for.
