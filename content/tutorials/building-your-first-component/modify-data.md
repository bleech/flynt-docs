---
title: "4. Modifying Component Data"
weight: 23
menu:
  main:
    parent: Building your first Component
    weight: 23
---

<div class="alert">
  <h3>This tutorial covers:</h3>
  <ul>
    <li><strong><a href="#4-1-using-addcomponentdata-and-functionsphp">Using <code>addComponentData</code> and <code>functions.php</code></strong></a></li>
  </ul>
</div>

## 4.1 Using `addComponentData` and `functions.php`

Our component is now functional, but looking at our existing view template, we are still left with hard-coded text:

```twig
<div is="flynt-post-slider">
  <!-- ... code ... -->
  <div class="slider-meta">
    <p class="slider-showing">Showing {{ postsPerPage }} posts.</p>
  </div>
</div>
```

The ideal would be to make this text dynamic, but still let the editor insert the `postsPerPage` number where appropriate. Lets implement this!

First, lets create a new field for the SliderPosts component named `postsPerPageText`.

Update `Components/SliderPosts/fields.json` to match the following:

```json
{
  "fields": [
    {
      "name": "title",
      "label": "Title",
      "type": "text",
      "required": 1
    },
    {
      "name": "posts",
      "label": "Posts",
      "type": "post_object",
      "post_type": ["post"],
      "return_format": "object",
      "multiple": 1,
      "required": 1
    },
    {
      "name": "postsPerPageText",
      "label": "Posts Per Page Text",
      "type": "text",
      "required": 1
    },
  ]
}
```

To combine our text with the date, we will now need to make use of the `addComponentData` filter.

**This is the last entry point where it is possible to modify the data of a particular component.**

Since it is component specific, we place this filter into the `functions.php` file of a component.

<p class="source-note source-note--info">This file follows the original Wordpress <code>functions.php</code> functionality, only re-organized to match Flynt's modular structure. <a href="https://codex.wordpress.org/Functions_File_Explained" target="_blank">Read more here</a></p>

Open the backend interface for your page and add the following content to the "Posts Per Page Text" field and hit update:

**"Showing $postsPerPage posts."**

Now we'll take the value and replace the `$postsPerPage` string with the `postsPerPage` data we passed through our data filter.

First create `Components/SliderPosts/functions.php` and add the code below:

```php
  <?php
  namespace Flynt\Components\SliderPosts;

  add_filter('Flynt/addComponentData?name=SliderPosts', function ($data) {
    $data['postsPerPageText'] = str_replace('$postsPerPage', $data['postsPerPage'], $data['postsPerPageText']);
    return $data;
  });
```

It is important to note here that it is necessary to append `?name=` to the filter, passing the target component name as a parameter to our `addComponentData` filter.

To finish up, update the view template `Components/SliderPosts/index.twig` with the code below:

```twig
<div is="flynt-post-slider">
  <div class="slider">
    <h1 class="slider-title">{{ title }}</h1>
    <div class="slider-items">
      {% for post in posts %}
        <div class="slider-item">
          <h2>{{ post.title }}</h2>
          <img src="{{ post.thumbnail.src  }}" alt="{{ post.title }}">
        </div>
      {% endfor %}
    </div>
  </div>
  <div class="slider-meta">
    <p class="slider-showing">{{ postsPerPageText }}</p>
  </div>
</div>
```

We're done! Our editor can now change and re-word the text as they wish, adding in the "posts per page" data wherever they need without "hard-coding" it.

<div class="alert alert-steps">
  <h2>Next Steps</h2>

  <p>We have covered the core concepts of building a dynamic content driven component. What's missing is front-end styling. To round up the series we'll dive into assets and how we require styles, scripts, and images.</p>

  <p><a href="adding-assets.md" class="btn btn-primary">Learn how to add assets</a></p>
</div>
