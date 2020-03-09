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
  var adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
  var adFormResetElement = document.querySelector('.ad-form__reset');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var OfferTypeMinPriceMapping = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function setAdFormDisabled() {
    window.utils.setDisabled(adFormFieldsetElements, true);
    adFormElement.classList.add('ad-form--disabled');
    adFormElement.reset();
    removeAdFormListeners();
  }

  function setAdFormActive() {
    window.utils.setDisabled(adFormFieldsetElements, false);
    adFormElement.classList.remove('ad-form--disabled');
    onTypeInputChange();
    onRoomGuestChange();
    adFormListeners();
  }

  function adFormListeners() {
    roomNumberElement.addEventListener('change', onRoomGuestChange);
    guestElement.addEventListener('change', onRoomGuestChange);
    typeElement.addEventListener('change', onTypeInputChange);
    timeInElement.addEventListener('change', onTimeInTimeOutChange);
    timeOutElement.addEventListener('change', onTimeInTimeOutChange);
    adFormElement.addEventListener('submit', onSubmitAdForm);
    adFormResetElement.addEventListener('click', onFormResetClick);
  }

  function removeAdFormListeners() {
    roomNumberElement.removeEventListener('change', onRoomGuestChange);
    guestElement.removeEventListener('change', onRoomGuestChange);
    typeElement.removeEventListener('change', onTypeInputChange);
    timeInElement.removeEventListener('change', onTimeInTimeOutChange);
    timeOutElement.removeEventListener('change', onTimeInTimeOutChange);
    adFormElement.removeEventListener('submit', onSubmitAdForm);
    adFormResetElement.removeEventListener('click', onFormResetClick);
  }

  function closeSuccess() {
    var successElement = document.querySelector('.success');
    successElement.remove();
    document.removeEventListener('keydown', onSuccessEscDown);
    successTemplate.removeEventListener('click', onSuccessClick);
  };

  function showSuccess() {
    document.body.appendChild(successTemplate)
    document.addEventListener('keydown', onSuccessEscDown);
    successTemplate.addEventListener('click', onSuccessClick);
  };

  function closeError() {
    var errorElement = document.querySelector('.error');
    errorElement.remove();
    document.removeEventListener('keydown', onErrorEscDown);
    errorTemplate.removeEventListener('click', onErrorClick);
  };

  function showError() {
    document.body.appendChild(errorTemplate)
    document.addEventListener('keydown', onErrorEscDown);
    errorTemplate.addEventListener('click', onErrorClick);
  };

  function onFormResetClick(){
    window.map.setDisabledState();
  }

  function onSubmitSuccess() {
    showSuccess();
    window.map.setDisabledState();
  };

  function onSuccessEscDown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccess();
    }
  };

  function onSuccessClick() {
    closeSuccess();
  };

  function onSubmitError() {
    showError();
  };

  function onErrorEscDown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeError();
    }
  };

  function onErrorClick() {
    closeError();
  };

  function onSubmitAdForm(evt) {
    evt.preventDefault();
    var formData = new FormData(adFormElement);
    window.load.postData(formData, onSubmitSuccess, onSubmitError);
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

  window.form = {
    setAdFormDisabled: setAdFormDisabled,
    setAdFormActive: setAdFormActive
  };
})();
