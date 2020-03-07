'use strict';

(function () {
  var PIN_SIZE = window.pin.PIN_SIZE;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MIN_PRICE_LENGTH = 1000000;
  var roomNumberElement = document.querySelector('#room_number');
  var guestElement = document.querySelector('#capacity');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');
  var titleElement = document.querySelector('#title');
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
    addressElement.value = (mapPinMainElement.offsetTop + PIN_SIZE.width) + ', ' + (mapPinMainElement.offsetLeft + PIN_SIZE.height / 2);
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

  function onTitleInputValidation() {
    titleElement.minLength = MIN_TITLE_LENGTH;
    titleElement.maxLength = MAX_TITLE_LENGTH;
  }

  function onPriceInputValidation() {
    priceElement.max = MIN_PRICE_LENGTH;
  }

  function onTypeInputChange(evt) {
    var selectedType = evt.target.value.toLowerCase();
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
    titleElement.addEventListener('input', onTitleInputValidation);
    priceElement.addEventListener('input', onPriceInputValidation);
    typeElement.addEventListener('change', onTypeInputChange);
    timeInElement.addEventListener('change', onTimeInTimeOutChange);
    timeOutElement.addEventListener('change', onTimeInTimeOutChange);
  }

  function removeAdFormListeners() {
    mapPinMainElement.removeEventListener('change', onPinChange);
    roomNumberElement.removeEventListener('change', onRoomGuestChange);
    guestElement.removeEventListener('change', onRoomGuestChange);
    titleElement.removeEventListener('input', onTitleInputValidation);
    priceElement.removeEventListener('input', onPriceInputValidation);
    typeElement.removeEventListener('change', onTypeInputChange);
    timeInElement.removeEventListener('change', onTimeInTimeOutChange);
    timeOutElement.removeEventListener('change', onTimeInTimeOutChange);
  }

  window.form = {
    setAddress: onPinChange,
    setAvailableGuestAmount: onRoomGuestChange,
    adFormListeners: adFormListeners,
    removeAdFormListeners: removeAdFormListeners
  };
})();
