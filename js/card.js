'use strict';

(function () {

  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainerElement = document.querySelector('.map__filters-container');
  var offerTypeMapping = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  function renderCard(pin) {
    var cardElement = cardTemplateElement.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerTypeMapping[pin.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    cardElement.querySelector('.popup__features').appendChild(createFeatureFragment(cardElement, pin.offer.features));
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    cardElement.querySelector('.popup__photos').appendChild(createPhotosFragment(cardElement, pin.offer.photos));
    cardElement.querySelector('.popup__avatar').src = pin.author.avatar;
    mapFiltersContainerElement.insertAdjacentElement('beforebegin', cardElement);
  }

  function createFeatureFragment(cardElement, featuresArray) {
    cardElement.querySelector('.popup__features').innerHTML = '';
    var featuresFragment = document.createDocumentFragment();
    featuresArray.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + feature;
      featuresFragment.appendChild(featureItem);
    });
    return featuresFragment;
  }

  function createPhotosFragment(cardElement, photosArray) {
    var popupPhoto = cardElement.querySelector('.popup__photo');
    cardElement.querySelector('.popup__photos').removeChild(popupPhoto);
    var photosFragment = document.createDocumentFragment();
    photosArray.forEach(function (photo) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = photo;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  }

  window.card = {
    renderCard: renderCard
  };
})();
