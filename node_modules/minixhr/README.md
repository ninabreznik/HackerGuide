# minixhr
super simple and small cross-browser XMLHttpRequest (XHR)

# USAGE
```js
var minixhr = require('minixhr')

var callback = function responseHandler (data, response, xhr, header) {
  console.log(data)
}

var data = {
  foo: 123,
  bar: "abc"
}

var request  = { // can be 'url string' or object:
  url          : 'http://requestb.in/18b4srl1',
  method       : 'POST',  // [optional] (defaults to 'GET')
  data         : JSON.stringify(data), // [optional] payload data could be <formdata> or {key:val}'s or anything
  headers      : {} // [optional] (defaults to '{}' or in case of 'POST':
                   // {'X-Requested-With':'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded' } )
}

// EXAMPLE 1
minixhr(request, callback) // [optional] callback - (e.g. leave out for POST Request where you don't care about a response

// EXAMPLE 2
minixhr('http://jsonplaceholder.typicode.com/posts/1', callback)
// check http://requestb.in/18b4srl1?inspect afterwards to inspect
```
