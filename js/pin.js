'use strict';

(function () {
  var PIN_SIZE = {
    width: 65,
    height: 65
  };
  var ENTER_KEYCODE = 13;
  var LEFT_MOUSE_CODE = 0;
  var map = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

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

  function onMousedownMapPinMain(evt) {
    if (evt.button === LEFT_MOUSE_CODE) {
      window.map.setActiveState();
      mapPinMainElement.removeEventListener('mousedown', onMousedownMapPinMain);
    }
  }

  function onKeydownMapPinMain(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.map.setActiveState();
      mapPinMainElement.removeEventListener('keydown', onKeydownMapPinMain);
    }
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

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function getData() {
    window.load.getData(successHandler, errorHandler);
  }

  mapPinMainElement.addEventListener('mousedown', onMousedownMapPinMain);
  mapPinMainElement.addEventListener('keydown', onKeydownMapPinMain);

  window.pin = {
    getData: getData,
    PIN_SIZE: PIN_SIZE
  };
})();
