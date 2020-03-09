'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

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

  window.pin = {
    getData: getData,
    removePins: removePins
  };
})();
