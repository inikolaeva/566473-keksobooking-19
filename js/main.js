'use strict';

var PIN_SIZE = window.consts.PIN_SIZE;
var MAP_PIN_AMOUNT = window.mockData.MAP_PIN_AMOUNT;
var mapPinsElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

for (var j = 0; j < MAP_PIN_AMOUNT; j++) {
  var mockObject = window.mockData.generateMockObject(j + 1);
  var pinElement = window.pin.renderPin(mockObject);
  fragment.appendChild(pinElement);
}
mapPinsElement.appendChild(fragment);
window.pageStates.setDisabledState(true);


