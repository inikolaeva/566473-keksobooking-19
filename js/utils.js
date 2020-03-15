'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  function debounce(cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };

  }

  function showErrorMessage(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function toggleDisabled(elements, state) {
    elements.forEach(function (element) {
      element.disabled = state;
    });
  }


  window.utils = {
    showErrorMessage: showErrorMessage,
    toggleDisabled: toggleDisabled,
    debounce: debounce
  };
})();
