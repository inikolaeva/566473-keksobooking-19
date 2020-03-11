'use strict';

(function () {
  var mapFilterElement = document.querySelector('.map__filters');
  var mapFilterSelectElements = mapFilterElement.querySelectorAll('select');
  var mapFilterFieldsetElements = mapFilterElement.querySelectorAll('fieldset');

  function toggleFilter(isDisabled) {
    window.utils.toggleDisabled(mapFilterSelectElements, isDisabled);
    window.utils.toggleDisabled(mapFilterFieldsetElements, isDisabled);
  }

  window.filter = {
    toggleFilter: toggleFilter
  };
})();
