/*------------------------------------------
                  REQUIRE
-------------------------------------------*/
var yo = require('yo-yo')
var csjs = require('csjs-inject')
var minixhr = require('minixhr')

/*------------------------------------------
                DATA
-------------------------------------------*/
minixhr ('https://gist.githubusercontent.com/maxogden/74476ae567142d96078c/raw/04731d27f88d3eec386e5220133d63c1f88b06a8/catcafes.geojson', startPage)

function startPage(data) {
  var data = JSON.parse(data).features
  console.log(data)
  var html = template(data)
  document.body.appendChild(html)
}
/*------------------------------------------
                CSS
-------------------------------------------*/
  var css = csjs`
    .title {
      color: red;
    }
    .cafesTitle{
      color: green
    }
  `
  /*------------------------------------------
                HTML
  -------------------------------------------*/
  function template (data) {
    return yo`
    		<div>
          <div class='${css.title}'>Taipei for hackers</div>
          <div class='${css.cafesTitle}'>CAT CAFES</div>
        </div>
    `
	}

startPage()
/*------------------------------------------
                FUNCTIONS
-------------------------------------------*/


function listCafes () {
  console.log("cafes")
}
