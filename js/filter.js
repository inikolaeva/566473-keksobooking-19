'use strict';

(function () {
  var mapFilterElement = document.querySelector('.map__filters');
  var mapFilterSelectElements = mapFilterElement.querySelectorAll('select');
  var mapFilterFieldsetElements = mapFilterElement.querySelectorAll('fieldset');
  var filtersContainerElement = document.querySelector('.map__filters-container');
  var filtersElements = filtersContainerElement.querySelector('.map__filter');
  var filteredAds = [];

  function setFilterDisabled() {
    window.utils.setDisabled(mapFilterSelectElements, true);
    window.utils.setDisabled(mapFilterFieldsetElements, true);
  }

  function setFilterActive() {
    window.utils.setDisabled(mapFilterSelectElements, false);
    window.utils.setDisabled(mapFilterFieldsetElements, false);
    filtersContainerElement.addEventListener('change', function () {
      window.utils.debounce(window.pin.test);
    });
  }

  function filterByType(ads, filterValue) {
    return ads.offer.type === filterValue;
  };

  function filterAds(ads) {
    filteredAds = [];
    var selectedFilterValue = document.querySelector('#housing-type').value;
    var a = ads.slice();

    a.forEach(function (filter) {
      var filterRes = filterByType(filter, selectedFilterValue);
      if (filterRes) {
        filteredAds.unshift(filter);
      } else {
        filteredAds.push(filter)
      }
    });
    return filteredAds;
  }

  window.filter = {
    setFilterDisabled: setFilterDisabled,
    setFilterActive: setFilterActive,
    filterAds: filterAds
  };
})();
