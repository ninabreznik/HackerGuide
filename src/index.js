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
var FONT        = 'Ubuntu, sans-serif'

var imageLogo            = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTz3I-CAJuakuqXqLhrInVkmRgFAdGCh1JkpV0OXOe00dQx9aJcvQ'
var imageVisa            = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR0IkbxAk0B2tzF35ga-xttJR2216d2Od2afMpa3MVHXSzWaXq3BQ'
var imageLiving          = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA6Jc-nTzop23Monw2XmN47QPf4pcFHgYcgJQ2540Tjfyx8kvOXw'
var imagePower           = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTn7BzqdWG4BEwPFe4LX-Luxepf8xc6xg4bnGaWWmX5up4yIjSmg'
var imageSIM             = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR2F0fuUU0R5Uq7wH0agbTupgzH1D7eDLKG0piZG1d8x80NW9sX'
var imageTransportation  = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQiqGQQsQhL1WtrnnViGOhMkPjs_BXPt_zuk5fKCA8iNNxWIUIs'
var imageMeetups         = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaftx8XMSgseXMr-el-Rga4vErBAfq4tv0tRYYmusSAyCARHTDtg'
var imageEasyCard        = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTuWz4bRiczvIiQ5ATRG0Pg3aatwH2z3CL_IInXY_jPFDgkYju1eQ'
var imageSport           = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQiXFdxZhYfQAWnRU1s3_3BUPm1OiHfRdimn4V82BVF10ubpWFPOw'
var imageVegan           = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRNbPzJqw44G1BCFOm8h6HxqqrBDB3yfc4iiw6I6XTUeUikOXZv'
var imageCafes           = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRGehZ5hGbam4rTRVqmwe2t9WY1bJGW4hKSyR4cE9o9ZQTdHrff2A'
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
      display: flex;
      flex-wrap: wrap;
      font-family: ${FONT};
    }
    .logo {
      background-image: url(${imageLogo});
      text-transform: uppercase;
    }
    .button, .logo {
      background-image: url(${imageLogo});
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      color: white;
      padding: 5px;
      width: 200px;
      height: 150px;
      text-align: center;
      font-size: 20px;
      text-decoration: none;
    }
    .button:hover, .logo:hover {
      opacity: 0.8;
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      padding: 3px;
    }
    .item a {
      text-decoration: none;
      color: white;
    }
    .item a:hover {
      opacity: 0.8;
    }
    .icon {
      font-size: 15px;
      color: white;
      margin-right: 2px;
    }
  `
  /*------------------------------------------
                HTML
  -------------------------------------------*/
  function template (data) {
    return yo`
    		<div class='${css.wrapper}'>
          <div class='${css.logo}'>Taipei guide for hackers</div>
          ${menuButtonComponent (data,'VISA','showVisa',imageVisa)}
          ${menuButtonComponent (data,'LIVING','showLiving',imageLiving)}
          ${menuButtonComponent (data,'TRANSPORTATION','showTransportation',imageTransportation)}
          ${menuButtonComponent (data,'POWER','showPower',imagePower)}
          ${menuButtonComponent (data,'MEETUPS','showMeetups',imageMeetups)}
          ${menuButtonComponent (data,'SPORT','showSport',imageSport)}
          ${menuButtonComponent (data,'SIM','showSIM',imageSIM)}
          ${menuButtonComponent (data,'EASYCARD','showEasyCard',imageEasyCard)}
          ${menuButtonComponent (data,'VEGAN','showVegan',imageVegan)}
          ${menuButtonComponent (data,'CAFÉS','showCafes',imageCafes)}
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

var vegan = showHideComponent('VEGAN','/showVegan', '/hideVegan')
routes('/showVegan', vegan.show)
routes('/hideVegan', vegan.hide)


/*------------------------------------------
                 COMPONENTS
-------------------------------------------*/
function showHideComponent (title,routeShow,routeHide) {
  var showHide = {
    list: function list (data) {
      var array = data[title]
      return array.map(function(x){
        return yo`
        <div class='item ${css.item}'>
          <i class="fa fa-circle ${css.icon}" aria-hidden="true"></i>
          <a href='${x.link}'>${x.name}</a>
        </div>
        `
      })
    },
    show: function show (data) {
      var newEl = yo`
          <div class='${title}'>
            <div class='hide ${css.button}' onclick=${_=>routes(routeHide)(data)}>
              <div class='show'>${showHide.list(data)}</div>
            </div>
          </div>
      `
      var el = document.body.querySelector(`.${title}`)
      yo.update(el,newEl)
    },
    hide: function hide (data) {
      var newEl = yo`
        <div class='${title}'>
          <div class='hide ${css.button}' onclick=${_=>routes(routeShow)(data)}>
            <div class='${css.title}'>${title}</div>
            <div class='show'></div>
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
    .button {
      font-family: ${FONT};
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url(${image});
      border: none;
      color: white;
      padding: 5px;
      width: 200px;
      height: 150px;
      text-align: center;
      font-size: 20px;
    }
    .button:hover {
      opacity: 0.8;
    }
  `

  function template () {
    return yo`
      <div class='${title}'>
        <div class='hide ${css.button}' onclick=${_=>routes(`/${route}`)(data)}>
          <div class='${title}'>${title}</div>
          <div class='show'></div>
        </div>
      </div>
    `
  }

  var html = template()
  return html
}
