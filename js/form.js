'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var roomNumberElement = document.querySelector('#room_number');
  var guestElement = document.querySelector('#capacity');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var adFormElement = document.querySelector('.ad-form');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
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
    adFormElement.addEventListener('submit', onAdFormSubmit);
  }

  function removeAdFormListeners() {
    roomNumberElement.removeEventListener('change', onRoomGuestChange);
    guestElement.removeEventListener('change', onRoomGuestChange);
    typeElement.removeEventListener('change', onTypeInputChange);
    timeInElement.removeEventListener('change', onTimeInTimeOutChange);
    timeOutElement.removeEventListener('change', onTimeInTimeOutChange);
    adFormElement.removeEventListener('submit', onAdFormSubmit);
  }

  function closeSuccess() {
    successTemplate.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessEscDown);
    successTemplate.removeEventListener('click', onSuccessClick);
  };

  function onSuccessEscDown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccess();
    }
  };

  function onSuccessClick() {
    closeSuccess();
  };

  function showSuccess() {
    var success = successTemplate.cloneNode(true);
    // fragment.appendChild(success);
    document.body.appendChild(successTemplate)

    document.addEventListener('keydown', onSuccessEscDown);
    successTemplate.addEventListener('click', onSuccessClick);
  };

  function successHandler() {
    showSuccess();
    // deactivateForm();
    // window.map.deactivate();
    // window.filter.deactivate();
  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData(adFormElement);
    window.load.postData(formData, successHandler, window.utils.errorHandler);
  };

  window.form = {
    setAvailableGuestAmount: onRoomGuestChange,
    adFormListeners: adFormListeners,
    removeAdFormListeners: removeAdFormListeners,
    setPriceValidation: onTypeInputChange
  };
})();
