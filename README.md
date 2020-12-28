# snowflakes

## [Demo](https://codepen.io/mkalygin/full/ZEpveZp)

This snow effect is based on [Codepen](https://codepen.io/bsehovac/pen/GPwXxq) developed by [@bsehovac](https://github.com/bsehovac).

To enable it on any page insert the following snippet to your HTML (the configuration script is optional):

```html
<script type="text/javascript">
  var snowConfig = {
    density: 1 / 90,
    depth: 80,
    count: 7000,
    gravity: 100,
    speed: 1 / 5000,
    color: [1, 1, 1],
    opacity: 0.2,
    snowflake: 'data:image/png;base64,texture',
  };
</script>
<script type="text/javascript" src="https://storage.yandexcloud.net/slaylines/uploads/snowflakes.min.1.0.0.js" defer></script>
```
