'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var TAIL_HEIGHT = 15;
  var PIN_SIZE = {
    width: 65,
    height: 65
  };
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
  var mapFilterElement = document.querySelector('.map__filters');
  var mapFilterSelectElements = mapFilterElement.querySelectorAll('select');
  var mapFilterFieldsetElements = mapFilterElement.querySelectorAll('fieldset');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapOverlayElement = document.querySelector('.map__overlay');
  var addressElement = document.querySelector('#address');
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

  function setState(elements, state) {
    for (var k = 0; k < elements.length; k++) {
      elements[k].disabled = state;
    }
  }

  function setDisabledState(state) {
    setState(adFormFieldsetElements, state);
    setState(mapFilterSelectElements, state);
    setState(mapFilterFieldsetElements, state);
    setFormAddress(false);
    window.form.removeAdFormListeners();
  }

  function setActiveState() {
    setDisabledState(false);
    mapElement.classList.remove('map--faded');
    window.pin.getData();
    adFormElement.classList.remove('ad-form--disabled');
    window.form.adFormListeners();
    setFormAddress(true);
    window.form.setPriceValidation();
    window.form.setAvailableGuestAmount();
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
      setFormAddress(activePage);
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

  function init() {
    setDisabledState(true);
    mapPinMainElement.addEventListener('mousedown', onMapPinMainMousedown);
    mapPinMainElement.addEventListener('keydown', onMapPinMainKeydown);
  }

  init();

  window.map = {
    setActiveState: setActiveState
  };
})();
