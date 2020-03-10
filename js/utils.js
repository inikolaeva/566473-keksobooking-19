'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout;

  function debounce(cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function setDisabled(elements, state) {
    for (var k = 0; k < elements.length; k++) {
      elements[k].disabled = state;
    }
  }

  window.utils = {
    onError: onError,
    setDisabled: setDisabled,
    debounce: debounce
  };
})();
