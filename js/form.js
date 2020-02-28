'use strict';

(function () {
  var roomNumberElement = document.querySelector('#room_number');
  var guestElement = document.querySelector('#capacity');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var addressInputElement = document.querySelector('#address');

  function setAddress() {
    addressInputElement.value = (mapPinMainElement.offsetTop + PIN_SIZE.width) + ', ' + (mapPinMainElement.offsetLeft + PIN_SIZE.height / 2);
  }

  function setAvailableGuestAmount() {
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

  mapPinMainElement.addEventListener('change', setAddress);
  roomNumberElement.addEventListener('change', setAvailableGuestAmount);
  guestElement.addEventListener('change', setAvailableGuestAmount);

  window.form = {
    setAddress,
    setAvailableGuestAmount
  }
})();
