'use strict';

(function () {
  var PINS_AMOUNT_MAX = 5;
  var mapFilterElement = document.querySelector('.map__filters');
  var mapFilterInputElements = mapFilterElement.querySelectorAll('input');
  var mapFilterSelectElements = mapFilterElement.querySelectorAll('select');
  var mapFilterFieldsetElements = mapFilterElement.querySelectorAll('fieldset');
  var filtersContainerElement = document.querySelector('.map__filters-container');

  function toggleFilter(isDisabled) {
    window.utils.toggleDisabled(mapFilterSelectElements, isDisabled);
    window.utils.toggleDisabled(mapFilterFieldsetElements, isDisabled);
  }

  function filterListeners() {
    filtersContainerElement.addEventListener('change', function () {
      window.utils.debounce(window.map.getPinsData);
    });
  }

  function resetFilter() {
    mapFilterSelectElements.forEach(function (select) {
      select.value = 'any';
    });
    mapFilterInputElements.forEach(function (feature) {
      feature.checked = false;
    });
  }

  function filterPins(pinsData) {
    var filteredPinData = [];
    var selectedFilterValue = document.querySelector('#housing-type').value;
    if (selectedFilterValue === 'any') {
      filteredPinData = window.utils.getRandomArrValue(pinsData, PINS_AMOUNT_MAX);
    } else {
      pinsData.forEach(function (pinData) {
        if (pinData.offer.type === selectedFilterValue) {
          filteredPinData.push(pinData);
        }
      });
    }
    return filteredPinData;
  }

  window.filter = {
    toggleFilter: toggleFilter,
    filterListeners: filterListeners,
    filterPins: filterPins,
    resetFilter: resetFilter
  };
})();
