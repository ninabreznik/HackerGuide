/*------------------------------------------
                  REQUIRE
-------------------------------------------*/
var yo = require('yo-yo')
var csjs = require('csjs-inject')
var minixhr = require('minixhr')

/*------------------------------------------
                VARIABLES
-------------------------------------------*/
var STATE = 'hideCafes'
/*------------------------------------------
                DATA
-------------------------------------------*/
minixhr ('https://gist.githubusercontent.com/maxogden/74476ae567142d96078c/raw/04731d27f88d3eec386e5220133d63c1f88b06a8/catcafes.geojson', startPage)

function startPage(data) {
  var data = JSON.parse(data)
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
          <div class='catCafes'>
            <div class='hide' onclick=${_=>changeState(data)}>CAT CAFES</div>
            <div class='list'></div>
          </div>
        </div>
    `
	}

/*------------------------------------------
                FUNCTIONS
-------------------------------------------*/

function listCafes (data) {
  return data.features.map(function(x){
    var cafes = x.properties
    return yo`
    <div class='cats'><a href='${cafes.link}'>${cafes.name}</a></div>
    `
  })
}

function showCafes (data) {
  var newEl = yo`
    <div class='catCafes'>
      <div class='show' onclick=${_=>changeState(data)}>CAT CAFES</div>
      <div class='list'>${listCafes(data)}</div>
    </div>
  `
  var el = document.body.querySelector('.catCafes')
  yo.update(el,newEl)
}

function hideCafes (data) {
  var newEl = yo`
    <div class='catCafes'>
      <div class='hide' onclick=${_=>changeState(data)}>CAT CAFES</div>
      <div class='list'></div>
    </div>
  `
  var el = document.body.querySelector('.catCafes')
  yo.update(el,newEl)
}

function next() {
  if(STATE==='showCafes') {
    STATE = 'hideCafes'
  } else {
    STATE = 'showCafes'
  }
}

function changeState (data) {
  var states = {
    'showCafes': function () {
      hideCafes(data)
    },
    'hideCafes': function () {
      showCafes(data)
    }
  }
  if(STATE) {
    states[STATE]()
    next()
  }
}
