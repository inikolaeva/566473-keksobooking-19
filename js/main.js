'use strict';

var TITLE = ' Заголовок';
var PRICE = {min: 10000, max: 50000};
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = {min: 1, max: 3};
var GUESTS = {min: 0, max: 3};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ' Описание';
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION = {
  x: {min: 130, max: 630},
  y: {min: 130, max: 630}
};
var MAP_PIN_AMOUNT = 8;
var PIN_SIZE = {
  width: 65,
  height: 65
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

// min - inclusive, max - exclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArrValue(arr) {
  var index = getRandomInt(0, arr.length);
  return arr[index];
}

function getAvatar(id) {
  return 'img/avatars/user0' + (id < 10 ? '0' + id : id) + '.png';
}

function generateMockObject(count) {
  var res = [];
  for (var i = 0; i < count; i++) {
    var x = getRandomInt(LOCATION.x.min, LOCATION.x.max);
    var y = getRandomInt(LOCATION.y.min, LOCATION.y.max);
    var id = i + 1;
    var obj = {
      author: {
        avatar: getAvatar(id)
      },
      offer: {
        title: id + TITLE,
        address: x + ',' + y,
        price: getRandomInt(PRICE.min, PRICE.max),
        type: getRandomArrValue(TYPE),
        rooms: getRandomInt(ROOMS.min, ROOMS.max),
        guests: getRandomInt(GUESTS.min, GUESTS.max),
        checkin: getRandomArrValue(CHECKIN),
        checkout: getRandomArrValue(CHECKOUT),
        features: getRandomArrValue(FEATURES),
        description: id + DESCRIPTION,
        photos: PHOTOS
      },
      location: {
        x: x,
        y: y
      }
    };
    res.push(obj);
  }
  return res;
}

function getPinWithOffset(pinObj) {
  return {
    x: pinObj.x - PIN_SIZE.width / 2,
    y: pinObj.y - PIN_SIZE.height / 2
  };
}

function renderPin(pin) {
  var pinPosition = getPinWithOffset(pin.location);
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.description;
  pinElement.style = 'left: ' + pinPosition.x + 'px; top: ' + pinPosition.y + 'px;';
  return pinElement;
}


map.classList.remove('map--faded');
var pins = generateMockObject(MAP_PIN_AMOUNT);
for (var i = 0; i < MAP_PIN_AMOUNT; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapPins.appendChild(fragment);
