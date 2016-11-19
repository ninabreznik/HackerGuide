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
minixhr ('https://gist.githubusercontent.com/ninabreznik/15717baef0ad4a70a119f90ae0141fe0/raw/6ba1a5a5b2ef5734f2869d0468be6d84da2649cc/gistfile1.txt', startPage)

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
      text-align: center;
      font-size: 20px;
    }
    .button {
      width: 90%;
      margin: 2%;
      background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }
    .button:hover {
      opacity: 0.8;
    }
  `
  /*------------------------------------------
                HTML
  -------------------------------------------*/
  function template (data) {
    return yo`
    		<div>
          <div class='${css.title}'>Taipei hacker guide</div>
          <div class='VISA'>
            <div class='hide ${css.button}' onclick=${_=>routes('/showVisa')(data)}>VISA</div>
            <div class='show'></div>
          </div>
          <div class='LIVING'>
            <div class='hide ${css.button}' onclick=${_=>routes('/showLiving')(data)}>LIVING</div>
            <div class='show'></div>
          </div>
          <div class='USEFUL'>
            <div class='hide ${css.button}' onclick=${_=>routes('/showUseful')(data)}>USEFUL</div>
            <div class='show'></div>
          </div>
          <div class='TRANSPORTATION'>
            <div class='hide ${css.button}' onclick=${_=>routes('/showTransportation')(data)}>TRANSPORTATION</div>
            <div class='show'></div>
          </div>
          <div class='SPORT'>
            <div class='hide ${css.button}' onclick=${_=>routes('/showSport')(data)}>SPORT</div>
            <div class='show'></div>
          </div>
          <div class='VEGAN'>
            <div class='hide ${css.button}' onclick=${_=>routes('/showVegan')(data)}>VEGAN</div>
            <div class='show'></div>
          </div>
          <div class='CAFÉS'>
            <div class='hide ${css.button}' onclick=${_=>routes('/showCafes')(data)}>CAFÉS</div>
            <div class='show'></div>
          </div>
        </div>

    `
	}



/*------------------------------------------
                ROUTES
-------------------------------------------*/
var routes = router()

var cafes = showHideComponent('CAFÉS','/showCafes', '/hideCafes')
routes('/showCafes', cafes.show)
routes('/hideCafes', cafes.hide)

var visa = showHideComponent('VISA','/showVisa', '/hideVisa')
routes('/showVisa', visa.show)
routes('/hideVisa', visa.hide)

var living = showHideComponent('LIVING','/showLiving', '/hideLiving')
routes('/showLiving', living.show)
routes('/hideLiving', living.hide)

var useful = showHideComponent('USEFUL','/showUseful', '/hideUseful')
routes('/showUseful', useful.show)
routes('/hideUseful', useful.hide)

var transportation = showHideComponent('TRANSPORTATION','/showTransportation', '/hideTransportation')
routes('/showTransportation', transportation.show)
routes('/hideTransportation', transportation.hide)

var sport = showHideComponent('SPORT','/showSport', '/hideSport')
routes('/showSport', sport.show)
routes('/hideSport', sport.hide)

var vegan = showHideComponent('VEGAN','/showVegan', '/hideVegan')
routes('/showVegan', vegan.show)
routes('/hideVegan', vegan.hide)


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
          <div class='hide ${css.button}' onclick=${_=>routes(routeHide)(data)}>${title}</div>
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
          <div class='hide ${css.button}' onclick=${_=>routes(routeShow)(data)}>${title}</div>
          <div class='show'></div>
        </div>
      `
      var el = document.body.querySelector(`.${title}`)
      yo.update(el,newEl)
    }
  }
  return showHide
}
