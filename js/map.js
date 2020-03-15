'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var TAIL_HEIGHT = 15;
  var PIN_SIZE = {
    width: 65,
    height: 65
  };
  var DEFAULT_PIN_ADDRESS = {
    x: 570,
    y: 375
  }
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapOverlayElement = document.querySelector('.map__overlay');
  var addressElement = document.querySelector('#address');
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var isPageActive = false;
  var currentPinsObj;
  var currentPins = [];
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

  function setDefaultPinPosition() {
    setLeftPinOffset(DEFAULT_PIN_ADDRESS.x);
    setTopPinOffset(DEFAULT_PIN_ADDRESS.y);
  }

  function setLeftPinOffset(x){
    mapPinMainElement.style.left = x + 'px';
  }

  function setTopPinOffset(y){
    mapPinMainElement.style.top = y + 'px';
  }

  function setDisabledState() {
    isPageActive = false;
    window.form.setDisabled();
    window.filter.toggle(true);
    window.filter.reset();
    removePins();
    mapElement.classList.add('map--faded');
    setDefaultPinPosition();
    setFormAddress(false);
    window.avatar.setDefault();
    window.card.close();
  }

  function setActiveState() {
    window.form.setActive();
    window.filter.attachEvents();
    mapElement.classList.remove('map--faded');
    getPinsData();
    setFormAddress(true);
    window.avatar.attachEvents();
  }

  function removePins() {
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinElements.forEach(function (mapPin) {
      mapPin.remove();
    });
  }

  function getPinsData() {
    window.load.getData(onLoadSuccess, window.utils.showErrorMessage);
  }

  function renderPins(pins) {
    pins.forEach(function (pin) {
      var pinElement = window.pin.render(pin);
      currentPins.push(pinElement);
      fragment.appendChild(pinElement);
    });
    mapPinsElement.appendChild(fragment);
  }

  function removeCurrentPins() {
    currentPins.forEach(function (pin) {
      pin.remove();
    });
    currentPins = [];
  }

  function filterPinsData() {
    window.card.close();
    removeCurrentPins();
    var filteredAds = window.filter.getPins(currentPinsObj);
    renderPins(filteredAds);
  }

  function onLoadSuccess(pins) {
    currentPinsObj = pins;
    filterPinsData(pins);
    window.filter.toggle(false);
  }

  function onMapPinMainKeydown(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      setActiveState();
      isPageActive = true;
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
        setLeftPinOffset(mapPinMainPosition.x);
      }
      if (mapPinMainPosition.y >= Border.TOP && mapPinMainPosition.y <= Border.BOTTOM) {
        setTopPinOffset(mapPinMainPosition.y);
      }
      setFormAddress(isPageActive);
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!isPageActive) {
        setActiveState();
        isPageActive = true;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function init() {
    setDisabledState();
    window.form.init();
    mapPinMainElement.addEventListener('mousedown', onMapPinMainMousedown);
    mapPinMainElement.addEventListener('keydown', onMapPinMainKeydown);
  }

  init();

  window.map = {
    setDisabledState: setDisabledState,
    isPageActive: isPageActive,
    filterPinsData: filterPinsData
  };
})();
