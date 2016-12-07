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
var FONT  = 'Ubuntu, sans-serif'
var WHITISH = '#E6EBE0'
var YELLOWISH = '#F4F1BB'
var BLUEISH = '#5CA4A9'
var GREYISH = '#9BC1BC'
var REDISH = '#ED6A5A'
var SHADOW = '#E6EBE0'
var BLACK = 'black'
/* ---------------------------------------------------------------------------------------
Credit for cat pictures: @maxogden #catmapper https://github.com/maxogden/cats
----------------------------------------------------------------------------------------*/
var imageBasic           = 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/15095009_10154979597727454_1298834353251634175_n.jpg?oh=450a27fd9fad557ef157706ceb98ae47&oe=58B6178E'
var imageVisa            = 'https://raw.githubusercontent.com/maxogden/cats/master/catmapper/139757677862894755_13147478.jpg'
var imageLiving          = 'https://raw.githubusercontent.com/maxogden/cats/master/catmapper/222843201611284148_13147478.jpg'
var imagePower           = 'https://raw.githubusercontent.com/maxogden/cats/master/catmapper/229211733215330264_13147478.jpg'
var imageSIM             = 'https://raw.githubusercontent.com/maxogden/cats/master/catmapper/242919878211058734_13147478.jpg'
var imageTransportation  = 'https://raw.githubusercontent.com/maxogden/cats/master/catmapper/291176078364801026_197610413.jpg'
var imageMeetups         = 'https://raw.githubusercontent.com/maxogden/cats/master/cat_photos/fbe98620432f11e19e4a12313813ffc0_7.png'
var imageEasyCard        = 'https://raw.githubusercontent.com/maxogden/cats/master/cat_photos/12a8d742be7f11e188131231381b5c25_7.png'
var imageSport           = 'https://raw.githubusercontent.com/maxogden/cats/master/catmapper/221619259085077562_13147478.jpg'
var imageSpaces          = 'https://raw.githubusercontent.com/maxogden/cats/master/catmapper/229738316648856704_13147478.jpg'
var imageVegetarian      = 'https://raw.githubusercontent.com/maxogden/cats/master/cat_photos/e66928da64d311e19e4a12313813ffc0_7.png'
/*------------------------------------------
                FONT
-------------------------------------------*/
var links = [
  'https://fonts.googleapis.com/css?family=Ubuntu',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
]
var font = yo`<link href=${links[0]} rel='stylesheet' type='text/css'>`
var fontAwesome = yo`<link href=${links[1]} rel='stylesheet' type='text/css'>`
document.head.appendChild(font)
document.head.appendChild(fontAwesome)
/*------------------------------------------
                DATA
-------------------------------------------*/
minixhr ('https://raw.githubusercontent.com/ninabreznik/taipeiApp/master/src/data.json', startPage)

function startPage(data) {
  var data = JSON.parse(data)
  var html = template(data)
  document.body.appendChild(html)
}
/*------------------------------------------
                CSS
-------------------------------------------*/
  var css = csjs`
    .wrapper {
      background-color: ${BLUEISH};
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      font-family: ${FONT};
    }
    .logo {
      background-color: ${BLUEISH};
      text-shadow: -1px 0 ${WHITISH}, 0 1px ${WHITISH}, 1px 0 ${WHITISH}, 0 -1px ${WHITISH};
      font-size: 40px;
      color: ${WHITISH};
    }
    .button {
      font-size: 28px;
      color: ${WHITISH};
      text-shadow: -1px 0 ${WHITISH}, 0 1px ${WHITISH}, 1px 0 ${WHITISH}, 0 -1px ${WHITISH};
      background-image: url(${imageBasic});
      background-repeat: no-repeat;
      background-position:center;
    }
    .button, .logo {
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 10px solid ${BLUEISH};
      font-weight: bold;
      width: 300px;
      height: 300px;
      text-align: center;
      text-decoration: none;
    }
    .button:hover, .logo:hover {
      opacity: 0.8;
    }
    .items {
      width: 80%;
      text-shadow: 0 0;
    }
    .itemButton {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2%;
    }
    .itemButton a {
      width: 100%;
      color: ${WHITISH};
      font-size: 18px;
      background-color: ${REDISH};
      padding: 4%;
      border-radius: 2px;
      text-decoration: none;
    }
    .itemButton a:hover {
      opacity: 0.8;
    }
  `
  /*------------------------------------------
                HTML
  -------------------------------------------*/
  function template (data) {
    return yo`
    		<div class='${css.wrapper}'>
          <div class='${css.logo}'>Low budget Taipei for hackers</div>
          ${menuButtonComponent (data,'VISA','showVisa',imageVisa)}
          ${menuButtonComponent (data,'POWER','showPower',imagePower)}
          ${menuButtonComponent (data,'SIM','showSIM',imageSIM)}
          ${menuButtonComponent (data,'LIVING','showLiving',imageLiving)}
          ${menuButtonComponent (data,'TRANSPORTATION','showTransportation',imageTransportation)}
          ${menuButtonComponent (data,'EASYCARD','showEasyCard',imageEasyCard)}
          ${menuButtonComponent (data,'VEGETARIAN','showVegetarian',imageVegetarian)}
          ${menuButtonComponent (data,'MEETUPS','showMeetups',imageMeetups)}
          ${menuButtonComponent (data,'SPACES','showSpaces',imageSpaces)}
          ${menuButtonComponent (data,'SPORT','showSport',imageSport)}
        </div>
    `
	}



/*------------------------------------------
                ROUTES
-------------------------------------------*/
var routes = router()

var spaces = showHideComponent('SPACES','/showSpaces', '/hideSpaces')
routes('/showSpaces', spaces.show)
routes('/hideSpaces', spaces.hide)

var visa = showHideComponent('VISA','/showVisa', '/hideVisa')
routes('/showVisa', visa.show)
routes('/hideVisa', visa.hide)

var power = showHideComponent('POWER','/showPower', '/hidePower')
routes('/showPower', power.show)
routes('/hidePower', power.hide)

var sim = showHideComponent('SIM','/showSIM', '/hideSIM')
routes('/showSIM', sim.show)
routes('/hideSIM', sim.hide)

var meetups = showHideComponent('MEETUPS','/showMeetups', '/hideMeetups')
routes('/showMeetups', meetups.show)
routes('/hideMeetups', meetups.hide)

var easyCard = showHideComponent('EASYCARD','/showEasyCard', '/hideEasyCard')
routes('/showEasyCard', easyCard.show)
routes('/hideEasyCard', easyCard.hide)

var transportation = showHideComponent('TRANSPORTATION','/showTransportation', '/hideTransportation')
routes('/showTransportation', transportation.show)
routes('/hideTransportation', transportation.hide)

var sport = showHideComponent('SPORT','/showSport', '/hideSport')
routes('/showSport', sport.show)
routes('/hideSport', sport.hide)

var vegetarian = showHideComponent('VEGETARIAN','/showVegetarian', '/hideVegetarian')
routes('/showVegetarian', vegetarian.show)
routes('/hideVegetarian', vegetarian.hide)

var living = showHideComponent('LIVING','/showLiving', '/hideLiving')
routes('/showLiving', living.show)
routes('/hideLiving', living.hide)



/*------------------------------------------
                 COMPONENTS
-------------------------------------------*/
function showHideComponent (title,routeShow,routeHide) {
  var showHide = {
    list: function list (data) {
      var array = data[title]
      return array.map(function(x){
        return yo`
        <div class='item ${css.itemButton}'>
          <a href='${x.link}'>${x.name}</a>
        </div>
        `
      })
    },
    show: function show (data) {
      var newEl = yo`
          <div class='${title}'>
            <div class='square ${css.button}' onclick=${_=>routes(routeHide)(data)}>
              <div class='square ${css.items}'>${showHide.list(data)}</div>
            </div>
          </div>
      `
      var el = document.body.querySelector(`.${title}`)
      yo.update(el,newEl)
    },
    hide: function hide (data) {
      var newEl = yo`
        <div class='${title}'>
          <div class='square ${css.button}' onclick=${_=>routes(routeShow)(data)}>
            <div class='${css.title}'>${title}</div>
            <div class='square'></div>
          </div>
        </div>
      `
      var el = document.body.querySelector(`.${title}`)
      yo.update(el,newEl)
    }
  }
  return showHide
}

/*------------------------------------------
                MENU BUTTON COMPONENT
-------------------------------------------*/

function menuButtonComponent (data,title,route,image) {
  var css = csjs`
    body {
      margin: 0px;
    }
    .button {
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: ${FONT};
      background-image: url(${image});
      background-repeat: no-repeat;
      background-position:center;
      text-align: center;
      font-size: 28px;
      color: ${WHITISH};
      text-shadow: -1px 0 ${WHITISH}, 0 1px ${WHITISH}, 1px 0 ${WHITISH}, 0 -1px ${WHITISH};
      font-weight: bold;
      letter-spacing: 3px;
      border: 10px solid ${BLUEISH};
      width: 300px;
      height: 300px;
    }
    .button:hover {
      opacity: 0.9;
    }
  `

  function template () {
    return yo`
      <div class='${title}'>
        <div class='square ${css.button}' onclick=${_=>routes(`/${route}`)(data)}>
          <div class='${title}'>${title}</div>
          <div class='square'></div>
        </div>
      </div>
    `
  }

  var html = template()
  return html
}
