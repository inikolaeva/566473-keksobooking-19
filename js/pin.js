'use strict';

(function () {
  var PINS_AMOUNT_MAX = 5;
  var map = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsS = [];

  function renderPin(pin) {
    var pinElement = pinTemplateElement.cloneNode(true);
    var imgElement = pinElement.querySelector('img');
    imgElement.src = pin.author.avatar;
    imgElement.alt = pin.offer.description;
    pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
    function onPinClick() {
      var mapCardElement = map.querySelector('.map__card');
      if (mapCardElement) {
        mapCardElement.remove();
      }
      window.card.render(pin);
    }
    pinElement.addEventListener('click', onPinClick);
    pinsS.push(pinElement)
    return pinElement;
  }

  function displayAllPins(pins) {
    for (var j = 0; j < pins.length; j++) {
      var pinElement = renderPin(pins[j]);
      fragment.appendChild(pinElement);
    }
    mapPinsElement.appendChild(fragment);
  }

  function successHandler(pins) {
    displayAllPins(pins);
  }

  function getData() {
    window.load.getData(successHandler, window.utils.onError);
  }

  function removePins() {
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinElements.forEach(function (mapPin) {
      mapPin.remove();
    });
  }

  function test() {
    window.load.getData(updatePins, window.utils.onError);
  }

  function updatePins(ads) {
    window.card.close();
    var filteredAds = window.filter.filterAds(ads);
    pinsS.forEach(function (pin) {
      pin.remove();
    });
    pinsS = [];
    var pi = filteredAds.slice(0, PINS_AMOUNT_MAX);
    displayAllPins(pi);
  };


  window.pin = {
    getData: getData,
    removePins: removePins,
    test: test
  };
})();
