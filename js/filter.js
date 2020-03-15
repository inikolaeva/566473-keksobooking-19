'use strict';

(function () {
  var PINS_AMOUNT_MAX = 5;
  var mapFilterElement = document.querySelector('.map__filters');
  var mapFilterInputElements = mapFilterElement.querySelectorAll('input');
  var mapFilterSelectElements = mapFilterElement.querySelectorAll('select');
  var mapFilterFieldsetElements = mapFilterElement.querySelectorAll('fieldset');
  var filtersContainerElement = document.querySelector('.map__filters-container');
  var typeSelect = mapFilterElement.querySelector('#housing-type');
  var priceSelect = mapFilterElement.querySelector('#housing-price');
  var roomsSelect = mapFilterElement.querySelector('#housing-rooms');
  var guestsSelect = mapFilterElement.querySelector('#housing-guests');
  var featuresFieldset = mapFilterElement.querySelector('#housing-features');
  var PriceRange = {
    low: {
      MIN: 0,
      MAX: 10000
    },
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    high: {
      MIN: 50000,
      MAX: 1000000
    }
  };

  function toggleFilter(isDisabled) {
    window.utils.toggleDisabled(mapFilterSelectElements, isDisabled);
    window.utils.toggleDisabled(mapFilterFieldsetElements, isDisabled);
  }

  function attachEvents() {
    filtersContainerElement.addEventListener('change', window.utils.debounce(window.map.filterPinsData));
  }

  function resetFilter() {
    mapFilterSelectElements.forEach(function (select) {
      select.value = 'any';
    });
    mapFilterInputElements.forEach(function (feature) {
      feature.checked = false;
    });
  }

  function filtrationItem(selected, value) {
    return selected.value === 'any' ? true : selected.value === value.toString();
  }

  function filtrationByType(item) {
    return filtrationItem(typeSelect, item.offer['type']);
  }

  function filtrationByRooms(item) {
    return filtrationItem(roomsSelect, item.offer['rooms']);
  }

  function filtrationByGuests(item) {
    return filtrationItem(guestsSelect, item.offer['guests']);
  }

  function filtrationByPrice(item) {
    var filteringPrice = PriceRange[priceSelect.value];
    var price = item.offer.price;
    return filteringPrice ? price >= filteringPrice.MIN && price <= filteringPrice.MAX : true;
  }

  function filtrationByFeatures(item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  }

  function applyAllFilters(it) {
    return filtrationByType(it) && filtrationByPrice(it) && filtrationByRooms(it) && filtrationByGuests(it) && filtrationByFeatures(it);
  }

  function filterPins(pinsData) {
    var allPinData = pinsData.filter(applyAllFilters);
    return allPinData.slice(0, PINS_AMOUNT_MAX);
  }

  window.filter = {
    toggle: toggleFilter,
    attachEvents: attachEvents,
    getPins: filterPins,
    reset: resetFilter
  };
})();
