'use strict';

var TITLE = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке',
  'Императорский дворец в центре Токио',
  'Милейший чердачок',
  'Наркоманский притон',
  'Чёткая хата',
  'Стандартная квартира в центре',
  'Тихая квартирка недалеко от метро',
  'Милое гнездышко для фанатов Анимэ'
];
var PRICE = {
  min: 10000,
  max: 50000
};
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = {
  min: 1,
  max: 3
};
var GUESTS = {
  min: 0,
  max: 3
};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = [
  'Полностью укомплектована.',
  'Маленькая чистая квратира на краю парка.',
  'Cвежий ремонт.',
  'Подходит для всех кто любит спать на свежем воздухе.',
  'Для самых не требовательных.',
  'У нас есть всё!',
  'Для всех кто знает толк в отдыхе.',
  'Tут красиво, светло и уютно.'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'https://cdn.ostrovok.ru/t/x500/mec/a4/bb/a4bbfa3d98c0ddf60e95e610509dbede8160e40e.jpeg',
  'https://cdn.ostrovok.ru/t/x500/mec/hotels/1000000/480000/470500/470466/470466_12_b.jpg',
  'https://cdn.ostrovok.ru/t/x500/mec/hotels/1000000/480000/470500/470466/470466_17_b.jpg',
  'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/aa9f9334-acd2-46f7-ae6e-4ae039376ec6.jpeg'
];
var LOCATION = {
  x: {
    min: 130,
    max: 630
  },
  y: {
    min: 130,
    max: 630
  }
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

function getRandomArrValueWithRandomSize(arr) {
  var randomSize = getRandomInt(1, arr.length);
  var res = [];
  for (var i = 0; i < randomSize; i++) {
    res.push(getRandomArrValue(arr));
  }
  return res;
}

function getAvatar(id) {
  return 'img/avatars/user' + (id < 10 ? '0' + id : id) + '.png';
}

function generateMockObject(id) {
  var x = getRandomInt(LOCATION.x.min, LOCATION.x.max);
  var y = getRandomInt(LOCATION.y.min, LOCATION.y.max);
  return {
    author: {
      avatar: getAvatar(id)
    },
    offer: {
      title: getRandomArrValue(TITLE),
      address: x + ', ' + y,
      price: getRandomInt(PRICE.min, PRICE.max),
      type: getRandomArrValue(HOUSING_TYPES),
      rooms: getRandomInt(ROOMS.min, ROOMS.max),
      guests: getRandomInt(GUESTS.min, GUESTS.max),
      checkin: getRandomArrValue(CHECKIN),
      checkout: getRandomArrValue(CHECKOUT),
      features: getRandomArrValue(FEATURES),
      description: getRandomArrValue(DESCRIPTION),
      photos: getRandomArrValueWithRandomSize(PHOTOS)
    },
    location: {
      x: x,
      y: y
    }
  };
}

function getPinWithOffset(pinObj) {
  return {
    x: pinObj.x - PIN_SIZE.width / 2,
    y: pinObj.y - PIN_SIZE.height
  };
}

function renderPin(pin) {
  var pinPosition = getPinWithOffset(pin.location);
  var pinElement = pinTemplate.cloneNode(true);
  var img = pinElement.querySelector('img');
  img.src = pin.author.avatar;
  img.alt = pin.offer.description;
  pinElement.style = 'left: ' + pinPosition.x + 'px; top: ' + pinPosition.y + 'px;';
  return pinElement;
}

for (var i = 0; i < MAP_PIN_AMOUNT; i++) {
  var pinElement = renderPin(generateMockObject(i + 1));
  fragment.appendChild(pinObj);
}
mapPins.appendChild(fragment);
map.classList.remove('map--faded');
