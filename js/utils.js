'use strict';

(function () {
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
    for (var k = 0; k < elements.length; k++) {
      elements[k].disabled = state;
    }
  }

  window.utils = {
    showErrorMessage: showErrorMessage,
    toggleDisabled: toggleDisabled
  };
})();
