'use strict';

(function () {
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsS = [];

  function renderPin(pin) {
    var pinElement = pinTemplateElement.cloneNode(true);
    var imgElement = pinElement.querySelector('img');
    imgElement.src = pin.author.avatar;
    imgElement.alt = pin.offer.description;
    pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
    function onPinClick() {
      window.card.close();
      window.card.render(pin);
    }
    pinElement.addEventListener('click', onPinClick);
    pinsS.push(pinElement)
    return pinElement;
  }

  window.pin = {
    render: renderPin
  };
})();
