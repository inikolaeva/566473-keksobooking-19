'use strict';

(function () {
  var PIN_SIZE = {
    width: 65,
    height: 65
  };
  var TAIL_HEIGHT = 15;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapOverlayElement = document.querySelector('.map__overlay');
  var activePage = false;
  var DragSizeRestiction = {
    TOP: 130,
    BOTTOM: 630,
    LEFT: mapOverlayElement.offsetLeft,
    RIGHT: mapOverlayElement.offsetWidth
  };
  var Border = {
    TOP: DragSizeRestiction.TOP,
    BOTTOM: DragSizeRestiction.BOTTOM - TAIL_HEIGHT,
    LEFT: DragSizeRestiction.LEFT,
    RIGHT: DragSizeRestiction.RIGHT - PIN_SIZE.width
  };

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

  function onMapPinMainKeydown(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.map.setActiveState();
      activePage = true;
    }
  }

  function onMapPinMainMousedown(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var mapPinMainPosition = {
        x: mapPinMainElement.offsetLeft - shift.x,
        y: mapPinMainElement.offsetTop - shift.y
      };
      if (mapPinMainPosition.x >= Border.LEFT && mapPinMainPosition.x <= Border.RIGHT) {
        mapPinMainElement.style.left = mapPinMainPosition.x + 'px';
      }
      if (mapPinMainPosition.y >= Border.TOP && mapPinMainPosition.y <= Border.BOTTOM) {
        mapPinMainElement.style.top = mapPinMainPosition.y + 'px';
      }
      window.form.setAddress(activePage);
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!activePage) {
        window.map.setActiveState();
        activePage = true;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
    window.load.getData(successHandler, window.utils.errorHandler);
  }

  window.pin = {
    getData: getData,
    PIN_SIZE: PIN_SIZE,
    TAIL_HEIGHT: TAIL_HEIGHT,
    onMapPinMainMousedown: onMapPinMainMousedown,
    onMapPinMainKeydown: onMapPinMainKeydown
  };
})();
