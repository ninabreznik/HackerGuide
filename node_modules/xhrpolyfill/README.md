# xhrpolyfill
cross browser xhr object

# USAGE
```js
var xhrpolyfill = require('xhrpolyfill'); // polyfills window.XMLHttpRequest
var xhr = xhrpolyfill();
// => return new XMLHttpRequest();
```

```html
<!-- Can be used via script tag too after it has been "browserified" -->
<script src="https://wzrd.in/standalone/xhrpolyfill"></script>
```

# Recommendation
If you search for a convenient cross-browser way to make all kinds of AJAX Requests, I recommend you to check out [minixhr](https://github.com/serapath/minixhr)
