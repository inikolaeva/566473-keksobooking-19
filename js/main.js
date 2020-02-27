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
var ENTER_KEYCODE = 13;
var LEFT_MOUSE_CODE = 0;

var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var adFormElement = document.querySelector('.ad-form');
var adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
var mapFilterElement = document.querySelector('.map__filters');
var mapFilterSelectElements = mapFilterElement.querySelectorAll('select');
var mapFilterFieldsetElements = mapFilterElement.querySelectorAll('fieldset');
var mapPinMainElement = document.querySelector('.map__pin--main');
var roomNumberElement = document.querySelector('#room_number');
var guestElement = document.querySelector('#capacity');
var addressInputElement = document.querySelector('#address');

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
  var reduceAmount = getRandomInt(0, arr.length - 1);
  var results = arr.slice();
  for (var i = 0; i < reduceAmount; i++) {
    var randomIndex = getRandomInt(0, results.length);
    results.splice(randomIndex, 1);
  }
  return results;
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
      features: getRandomArrValueWithRandomSize(FEATURES),
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
  var pinElement = pinTemplateElement.cloneNode(true);
  var imgElement = pinElement.querySelector('img');
  imgElement.src = pin.author.avatar;
  imgElement.alt = pin.offer.description;
  pinElement.style = 'left: ' + pinPosition.x + 'px; top: ' + pinPosition.y + 'px;';
  return pinElement;
}

function setAddress() {
  addressInputElement.value = (mapPinMainElement.offsetTop + PIN_SIZE.width) + ', ' + (mapPinMainElement.offsetLeft + PIN_SIZE.height / 2);
}

function setState(elements, state) {
  for (var k = 0; k < elements.length; k++) {
    elements[k].disabled = state;
  }
}

function setDisabledState(state) {
  setState(adFormFieldsetElements, state);
  setState(mapFilterSelectElements, state);
  setState(mapFilterFieldsetElements, state);
}

function setActiveState() {
  setDisabledState(false);
  mapElement.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');
  setAddress();
  setAvailableGuestAmount();
}

function setAvailableGuestAmount() {
  var roomNumber = Number(roomNumberElement.value);
  var selectedGuestValue = Number(guestElement.value);
  if ((roomNumber === 100 && selectedGuestValue !== 0) || (roomNumber !== 100 && selectedGuestValue === 0)) {
    guestElement.setCustomValidity('"не для гостей" можно выбрать только для "100 мест"');
  } else if (roomNumber < selectedGuestValue) {
    guestElement.setCustomValidity('Такое количество гостей недопустимо: 1 комната — «для 1 гостя»; 2 комнаты — «для 1 или 2 гостей»;3 комнаты — «для 1-3 гостей»');
  } else {
    guestElement.setCustomValidity('');
  }
}

function onMousedownMapPinMain(evt) {
  if (evt.button === LEFT_MOUSE_CODE) {
    setActiveState();
    mapPinMainElement.removeEventListener('mousedown', onMousedownMapPinMain);
  }
}

function onKeydownMapPinMain(evt) {
  if (evt.button === ENTER_KEYCODE) {
    setActiveState();
    mapPinMainElement.removeEventListener('keydown', onKeydownMapPinMain);
  }
}

// Обработчики
mapPinMainElement.addEventListener('mousedown', onMousedownMapPinMain);
mapPinMainElement.addEventListener('keydown', onKeydownMapPinMain);
mapPinMainElement.addEventListener('change', setAddress);
roomNumberElement.addEventListener('change', setAvailableGuestAmount);
guestElement.addEventListener('change', setAvailableGuestAmount);

// Код при загрузке скрипта
for (var j = 0; j < MAP_PIN_AMOUNT; j++) {
  var pinElement = renderPin(generateMockObject(j + 1));
  fragment.appendChild(pinElement);
}
mapPinsElement.appendChild(fragment);
setDisabledState(true);


