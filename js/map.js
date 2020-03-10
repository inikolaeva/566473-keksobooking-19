'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var TAIL_HEIGHT = 15;
  var PIN_SIZE = {
    width: 65,
    height: 65
  };
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapOverlayElement = document.querySelector('.map__overlay');
  var addressElement = document.querySelector('#address');
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var activePage = false;
  var DragSizeRestiction = {
    TOP: 130,
    BOTTOM: 630,
    LEFT: mapOverlayElement.offsetLeft,
    RIGHT: mapOverlayElement.offsetWidth
  };
  var Border = {
    TOP: DragSizeRestiction.TOP - PIN_SIZE.height - TAIL_HEIGHT,
    BOTTOM: DragSizeRestiction.BOTTOM - PIN_SIZE.height - TAIL_HEIGHT,
    LEFT: DragSizeRestiction.LEFT - Math.ceil(PIN_SIZE.width / 2),
    RIGHT: DragSizeRestiction.RIGHT - Math.ceil(PIN_SIZE.width / 2)
  };

  function setFormAddress(isActiveState) {
    var x = Math.round(mapPinMainElement.offsetLeft + PIN_SIZE.width / 2);
    var y;
    if (isActiveState) {
      y = Math.round(mapPinMainElement.offsetTop + PIN_SIZE.height + TAIL_HEIGHT);
    } else {
      y = Math.round(mapPinMainElement.offsetTop + PIN_SIZE.height / 2);
    }
    addressElement.value = x + ', ' + y;
  }


  function setDisabledState() {
    activePage = false;
    window.form.setAdFormDisabled();
    window.filter.toggleFilter(true);
    removePins();
    mapElement.classList.add('map--faded');
    setFormAddress(false);
  }

  function setActiveState() {
    window.form.setAdFormActive();
    window.filter.toggleFilter(false);
    mapElement.classList.remove('map--faded');
    getData();
    setFormAddress(true);
  }

  function removePins() {
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinElements.forEach(function (mapPin) {
      mapPin.remove();
    });
  }

  function getData() {
    window.load.getData(successHandler, window.utils.showErrorMessage);
  }

  function displayAllPins(pins) {
    for (var j = 0; j < pins.length; j++) {
      var pinElement = window.pin.render(pins[j]);
      fragment.appendChild(pinElement);
    }
    mapPinsElement.appendChild(fragment);
  }

  function successHandler(pins) {
    displayAllPins(pins);
  }

  function onMapPinMainKeydown(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      setActiveState();
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
      setFormAddress(activePage);
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!activePage) {
        setActiveState();
        activePage = true;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function init() {
    setDisabledState();
    window.form.initForm();
    mapPinMainElement.addEventListener('mousedown', onMapPinMainMousedown);
    mapPinMainElement.addEventListener('keydown', onMapPinMainKeydown);
  }

  init();

  window.map = {
    setDisabledState: setDisabledState,
    activePage: activePage
  };
})();
