/*------------------------------------------
                  REQUIRE
-------------------------------------------*/
var yo = require('yo-yo')
var csjs = require('csjs-inject')
var minixhr = require('minixhr')

/*------------------------------------------
                VARIABLES
-------------------------------------------*/
/*------------------------------------------
                DATA
-------------------------------------------*/
minixhr ('https://gist.githubusercontent.com/maxogden/74476ae567142d96078c/raw/04731d27f88d3eec386e5220133d63c1f88b06a8/catcafes.geojson', startPage)

function startPage(data,state) {
  var state = 'hideCafes'
  var data = JSON.parse(data)
  var html = template(data,state)
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
  function template (data,state) {
    return yo`
    		<div>
          <div class='${css.title}'>Taipei for hackers</div>
          <div class='catCafes'>
            <div class='${css.cafesTitle}' onclick=${_=>changeState(data,state)}>CAT CAFES</div>
            <div class='list'></div>
          </div>
        </div>
    `
	}

startPage()
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

function showCafes (data,state) {
  var newEl = yo`
    <div class='catCafes'>
      <div class='${css.cafesTitle}' onclick=${_=>changeState(data,state)}>CAT CAFES</div>
      <div class='list'>${listCafes(data)}</div>
    </div>
  `
  var el = document.body.querySelector('.catCafes')
  yo.update(el,newEl)
}

function hideCafes (data,state) {
  //var state = state
  var newEl = yo`
    <div class='catCafes'>
      <div class='${css.cafesTitle}' onclick=${_=>changeState(data,state)}>CAT CAFES</div>
      <div class='list'></div>
    </div>
  `
  var el = document.body.querySelector('.catCafes')
  yo.update(el,newEl)
}

function next(state,states) {
  if(state==='showCafes') {
    console.log('Changing from show to hide')
    state = 'hideCafes'
  } else {
    console.log('Before change: ' + state)
    console.log('Changing from hide to show')
    state = 'showCafes'
    console.log('After change: ' + state)
  }
  return state
}

function changeState (data,state) {
  console.log("OLD STATE: " + state)
  var states = {
    'showCafes': function () {
      hideCafes(data,state)
    },
    'hideCafes': function () {
      showCafes(data,state)
    }
  }
  if(state) {
    states[state]()
    var state = next(state,states)
  }
  console.log("NEW STATE: " + state)
}
