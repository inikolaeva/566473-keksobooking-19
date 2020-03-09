'use strict';

(function () {
  var mapFilterElement = document.querySelector('.map__filters');
  var mapFilterSelectElements = mapFilterElement.querySelectorAll('select');
  var mapFilterFieldsetElements = mapFilterElement.querySelectorAll('fieldset');

  function setFilterDisabled() {
    window.utils.setDisabled(mapFilterSelectElements, true);
    window.utils.setDisabled(mapFilterFieldsetElements, true);
  }

  function setFilterActive() {
    window.utils.setDisabled(mapFilterSelectElements, false);
    window.utils.setDisabled(mapFilterFieldsetElements, false);
  }

  window.filter = {
    setFilterDisabled: setFilterDisabled,
    setFilterActive: setFilterActive
  }
})();
