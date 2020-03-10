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
  var successElement;
  var errorElement;

  var OfferTypeMinPriceMapping = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function setAdFormDisabled() {
    window.utils.toggleDisabled(adFormFieldsetElements, true);
    adFormElement.classList.add('ad-form--disabled');
    adFormElement.reset();
  }

  function setAdFormActive() {
    window.utils.toggleDisabled(adFormFieldsetElements, false);
    adFormElement.classList.remove('ad-form--disabled');
  }

  function initForm() {
    setPriceValidation();
    setGuestValidation();
    formListeners();
  }

  function setGuestValidation() {
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

  function setPriceValidation() {
    var selectedType = typeElement.value.toLowerCase();
    var minPrice = OfferTypeMinPriceMapping[selectedType];
    priceElement.min = minPrice;
    priceElement.placeholder = minPrice.toString();
  }

  function setTimeSync(time1, time2) {
    time2.value = time1.value;
  }

  function formListeners() {
    roomNumberElement.addEventListener('change', onRoomGuestChange);
    guestElement.addEventListener('change', onRoomGuestChange);
    typeElement.addEventListener('change', onTypeInputChange);
    timeInElement.addEventListener('change', onTimeInChange);
    timeOutElement.addEventListener('change', onTimeOutChange);
    adFormElement.addEventListener('submit', onSubmitAdForm);
    adFormResetElement.addEventListener('click', onFormResetClick);
  }

  function closeSuccess() {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessEscDown);
    successTemplate.removeEventListener('click', onSuccessClick);
  }

  function showSuccess() {
    successElement = successTemplate.cloneNode(true);
    document.body.appendChild(successElement);
    document.addEventListener('keydown', onSuccessEscDown);
    successElement.addEventListener('click', onSuccessClick);
  }

  function closeError() {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorEscDown);
    errorTemplate.removeEventListener('click', onErrorClick);
  }

  function showError() {
    errorElement = errorTemplate.cloneNode(true);
    document.body.appendChild(errorElement);
    document.addEventListener('keydown', onErrorEscDown);
    errorElement.addEventListener('click', onErrorClick);
  }

  function onFormResetClick() {
    window.map.setDisabledState();
  }

  function onSubmitSuccess() {
    showSuccess();
    window.map.setDisabledState();
  }

  function onSuccessEscDown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccess();
    }
  }

  function onSuccessClick() {
    closeSuccess();
  }

  function onSubmitError() {
    showError();
    window.map.activePage = false;
  }

  function onErrorEscDown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeError();
    }
  }

  function onErrorClick() {
    closeError();
  }

  function onSubmitAdForm(evt) {
    evt.preventDefault();
    var formData = new FormData(adFormElement);
    window.load.postData(formData, onSubmitSuccess, onSubmitError);
  }

  function onRoomGuestChange() {
    setGuestValidation();

  }

  function onTypeInputChange() {
    setPriceValidation();
  }

  function onTimeInChange() {
    setTimeSync(timeInElement, timeOutElement)
  }

  function onTimeOutChange() {
    setTimeSync(timeOutElement, timeInElement)
  }

  window.form = {
    setAdFormDisabled: setAdFormDisabled,
    setAdFormActive: setAdFormActive,
    initForm:initForm
  };
})();
