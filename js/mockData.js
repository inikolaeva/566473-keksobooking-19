'use strict';

(function () {
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

  function getAvatar(id) {
    return 'img/avatars/user' + (id < 10 ? '0' + id : id) + '.png';
  }

  function generateMockObject(id) {
    var x = window.utils.getRandomInt(LOCATION.x.min, LOCATION.x.max);
    var y = window.utils.getRandomInt(LOCATION.y.min, LOCATION.y.max);
    return {
      author: {
        avatar: getAvatar(id)
      },
      offer: {
        title: window.utils.getRandomArrValue(TITLE),
        address: x + ', ' + y,
        price: window.utils.getRandomInt(PRICE.min, PRICE.max),
        type: window.utils.getRandomArrValue(HOUSING_TYPES),
        rooms: window.utils.getRandomInt(ROOMS.min, ROOMS.max),
        guests: window.utils.getRandomInt(GUESTS.min, GUESTS.max),
        checkin: window.utils.getRandomArrValue(CHECKIN),
        checkout: window.utils.getRandomArrValue(CHECKOUT),
        features: window.utils.getRandomArrValueWithRandomSize(FEATURES),
        description: window.utils.getRandomArrValue(DESCRIPTION),
        photos: window.utils.getRandomArrValueWithRandomSize(PHOTOS)
      },
      location: {
        x: x,
        y: y
      }
    };
  }

  window.mockData = {
    TITLE: TITLE,
    PRICE: PRICE,
    HOUSING_TYPES: HOUSING_TYPES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    CHECKIN: CHECKIN,
    CHECKOUT: CHECKOUT,
    FEATURES: FEATURES,
    DESCRIPTION: DESCRIPTION,
    PHOTOS: PHOTOS,
    LOCATION: LOCATION,
    MAP_PIN_AMOUNT: MAP_PIN_AMOUNT,
    generateMockObject: generateMockObject
  };
})();
