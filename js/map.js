'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
  var mapFilterElement = document.querySelector('.map__filters');
  var mapFilterSelectElements = mapFilterElement.querySelectorAll('select');
  var mapFilterFieldsetElements = mapFilterElement.querySelectorAll('fieldset');


  function setState(elements, state) {
    for (var k = 0; k < elements.length; k++) {
      elements[k].disabled = state;
    }
  }

  function setDisabledState(state) {
    setState(adFormFieldsetElements, state);
    setState(mapFilterSelectElements, state);
    setState(mapFilterFieldsetElements, state);
    window.form.removeAdFormListeners();
  }

  function setActiveState() {
    setDisabledState(false);
    mapElement.classList.remove('map--faded');
    window.pin.getData();
    adFormElement.classList.remove('ad-form--disabled');
    window.form.adFormListeners();
    window.form.setAddress();
    window.form.setPriceValidation();
    window.form.setAvailableGuestAmount();
  }

  setDisabledState(true);

  window.map = {
    setActiveState: setActiveState
  };
})();
