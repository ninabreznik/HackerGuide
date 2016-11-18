/*------------------------------------------
                  REQUIRE
-------------------------------------------*/
var yo = require('yo-yo')
var csjs = require('csjs-inject')
var minixhr = require('minixhr')
var router = require('_router')
/*------------------------------------------
                VARIABLES
-------------------------------------------*/
var STATE = 'hideCafes'
/*------------------------------------------
                DATA
-------------------------------------------*/
minixhr ('https://gist.githubusercontent.com/ninabreznik/15717baef0ad4a70a119f90ae0141fe0/raw/d09a44a7bbcb09c959a5f3d749bfa652300bf4d8/gistfile1.txt', startPage)

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
  `
  /*------------------------------------------
                HTML
  -------------------------------------------*/
  function template (data) {
    return yo`
    		<div>
          <div class='${css.title}'>Taipei hacker guide</div>
          <div class='cafe'>
            <div class='hide' onclick=${_=>routes('/showCafe')(data)}>CAFE</div>
            <div class='show'></div>
          </div>
          <div class='visa'>
            <div class='hide' onclick=${_=>routes('/showVisa')(data)}>VISA</div>
            <div class='show'></div>
          </div>
        </div>

    `
	}



/*------------------------------------------
                ROUTES
-------------------------------------------*/


var routes = router()

var showCafe = showHideComponent('cafe','/showCafe', '/hideCafe')
var hideCafe = showHideComponent('cafe','/showCafe', '/hideCafe')
var showVisa = showHideComponent('visa','/showVisa', '/hideVisa')
var hideVisa = showHideComponent('visa','/showVisa', '/hideVisa')

routes('/showCafe', showCafe.show)
routes('/hideCafe', hideCafe.hide)
routes('/showVisa', showVisa.show)
routes('/hideVisa', hideVisa.hide)

//routes('/showCafes')

/*------------------------------------------
                 COMPONENTS
-------------------------------------------*/
function showHideComponent (title,routeShow,routeHide) {
  var showHide = {
    list: function list (data) {
      console.log({data})
      console.log({title})
      var array = data[title]
      console.log({array})
      return array.map(function(x){
        return yo`
        <div class='item'><a href='${x.link}'>${x.name}</a></div>
        `
      })
    },
    show: function show (data) {
      console.log('function show, route  ' + routeShow)
      console.log('function show, route  ' + routeHide)
      var newEl = yo`
        <div class='${title}'>
          <div class='hide' onclick=${_=>routes(routeHide)(data)}>${title}</div>
          <div class='show'>${showHide.list(data)}</div>
        </div>
      `
      var el = document.body.querySelector(`.${title}`)
      yo.update(el,newEl)
    },
    hide: function hide (data) {
      console.log('function hide, route  ' + routeShow)
      console.log('function hide, route  ' + routeHide)
      var newEl = yo`
        <div class='${title}'>
          <div class='hide' onclick=${_=>routes(routeShow)(data)}>${title}</div>
          <div class='show'></div>
        </div>
      `
      var el = document.body.querySelector(`.${title}`)
      yo.update(el,newEl)
    }
  }
  return showHide
}
