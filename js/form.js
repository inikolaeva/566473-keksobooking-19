'use strict';

(function () {
  var PIN_SIZE = window.pin.PIN_SIZE;
  var roomNumberElement = document.querySelector('#room_number');
  var guestElement = document.querySelector('#capacity');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var OfferTypeMinPriceMapping = {
    flat: 0,
    bungalo: 1000,
    house: 5000,
    palace: 10000
  };

  function onPinChange() {
    var x = Math.round(mapPinMainElement.offsetTop + PIN_SIZE.width);
    var y = Math.round(mapPinMainElement.offsetLeft + PIN_SIZE.height / 2);
    addressElement.value = x + ', ' + y;
  }

  function onRoomGuestChange() {
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

  function onTypeInputChange() {
    var selectedType = typeElement.value.toLowerCase();
    var minPrice = OfferTypeMinPriceMapping[selectedType];
    priceElement.min = minPrice;
    priceElement.placeholder = minPrice.toString();
  }

  function onTimeInTimeOutChange(evt) {
    timeOutElement.value = evt.target.value;
    timeInElement.value = evt.target.value;
  }

  function adFormListeners() {
    mapPinMainElement.addEventListener('change', onPinChange);
    roomNumberElement.addEventListener('change', onRoomGuestChange);
    guestElement.addEventListener('change', onRoomGuestChange);
    typeElement.addEventListener('change', onTypeInputChange);
    timeInElement.addEventListener('change', onTimeInTimeOutChange);
    timeOutElement.addEventListener('change', onTimeInTimeOutChange);
  }

  function removeAdFormListeners() {
    mapPinMainElement.removeEventListener('change', onPinChange);
    roomNumberElement.removeEventListener('change', onRoomGuestChange);
    guestElement.removeEventListener('change', onRoomGuestChange);
    typeElement.removeEventListener('change', onTypeInputChange);
    timeInElement.removeEventListener('change', onTimeInTimeOutChange);
    timeOutElement.removeEventListener('change', onTimeInTimeOutChange);
  }

  window.form = {
    setAddress: onPinChange,
    setAvailableGuestAmount: onRoomGuestChange,
    adFormListeners: adFormListeners,
    removeAdFormListeners: removeAdFormListeners,
    setPriceValidation: onTypeInputChange
  };
})();
