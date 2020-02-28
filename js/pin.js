'use strict';

(function () {
  var ENTER_KEYCODE = window.consts.ENTER_KEYCODE;
  var LEFT_MOUSE_CODE = window.consts.LEFT_MOUSE_CODE;
  var mapPinMainElement = document.querySelector('.map__pin--main');

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
    return pinElement;
  }

  function onMousedownMapPinMain(evt) {
    if (evt.button === LEFT_MOUSE_CODE) {
      window.pageStates.setActiveState();
      mapPinMainElement.removeEventListener('mousedown', onMousedownMapPinMain);
    }
  }

  function onKeydownMapPinMain(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.pageStates.setActiveState();
      mapPinMainElement.removeEventListener('keydown', onKeydownMapPinMain);
    }
  }
  mapPinMainElement.addEventListener('mousedown', onMousedownMapPinMain);
  mapPinMainElement.addEventListener('keydown', onKeydownMapPinMain);

  window.pin = {
    renderPin
  }
})();
