'use strict';

(function () {
  var mapFilterElement = document.querySelector('.map__filters');
  var mapFilterSelectElements = mapFilterElement.querySelectorAll('select');
  var mapFilterFieldsetElements = mapFilterElement.querySelectorAll('fieldset');
  var filtersContainerElement = document.querySelector('.map__filters-container');
  var filtersElements = filtersContainerElement.querySelector('.map__filter');
  var filteredAds = [];

  function toggleFilter(isDisabled) {
    window.utils.toggleDisabled(mapFilterSelectElements, isDisabled);
    window.utils.toggleDisabled(mapFilterFieldsetElements, isDisabled);
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
    toggleFilter: toggleFilter,
    filterAds: filterAds
  }
})();
