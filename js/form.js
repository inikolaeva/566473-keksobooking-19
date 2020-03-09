'use strict';

(function () {
  var roomNumberElement = document.querySelector('#room_number');
  var guestElement = document.querySelector('#capacity');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var OfferTypeMinPriceMapping = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

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
    roomNumberElement.addEventListener('change', onRoomGuestChange);
    guestElement.addEventListener('change', onRoomGuestChange);
    typeElement.addEventListener('change', onTypeInputChange);
    timeInElement.addEventListener('change', onTimeInTimeOutChange);
    timeOutElement.addEventListener('change', onTimeInTimeOutChange);
  }

  function removeAdFormListeners() {
    roomNumberElement.removeEventListener('change', onRoomGuestChange);
    guestElement.removeEventListener('change', onRoomGuestChange);
    typeElement.removeEventListener('change', onTypeInputChange);
    timeInElement.removeEventListener('change', onTimeInTimeOutChange);
    timeOutElement.removeEventListener('change', onTimeInTimeOutChange);
  }

  window.form = {
    setAvailableGuestAmount: onRoomGuestChange,
    adFormListeners: adFormListeners,
    removeAdFormListeners: removeAdFormListeners,
    setPriceValidation: onTypeInputChange
  };
})();
