'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhoto = cardTemplateElement.querySelector('.popup__photo');
  var mapFiltersContainerElement = document.querySelector('.map__filters-container');
  var OfferTypeMapping = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  function render(pinData) {
    var cardElement = cardTemplateElement.cloneNode(true);
    var popupFeaturesElement = cardElement.querySelector('.popup__features');
    var popupPhotosElement = cardElement.querySelector('.popup__photos');
    cardElement.querySelector('.popup__title').textContent = pinData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pinData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pinData.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = OfferTypeMapping[pinData.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
    popupFeaturesElement.innerHTML = '';
    popupFeaturesElement.appendChild(createFeatureFragment(pinData.offer.features));
    cardElement.querySelector('.popup__description').textContent = pinData.offer.description;
    popupPhotosElement.removeChild(cardElement.querySelector('.popup__photo'));
    popupPhotosElement.appendChild(createPhotosFragment(pinData.offer.photos));
    cardElement.querySelector('.popup__avatar').src = pinData.author.avatar;
    mapFiltersContainerElement.insertAdjacentElement('beforebegin', cardElement);
    var closeCardElement = cardElement.querySelector('.popup__close');
    function closeCard() {
      cardElement.remove();
      closeCardElement.removeEventListener('click', onClickCloseCard);
      document.removeEventListener('keydown', onKeydownCloseCard);
    }

    function onClickCloseCard() {
      closeCard();
    }

    function onKeydownCloseCard(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard();
      }
    }

    closeCardElement.addEventListener('click', onClickCloseCard);
    document.addEventListener('keydown', onKeydownCloseCard);
  }

  function createFeatureFragment(features) {
    var featuresFragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + feature;
      featuresFragment.appendChild(featureItem);
    });
    return featuresFragment;
  }

  function createPhotosFragment(photos) {
    var photosFragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = photo;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  }

  window.card = {
    render: render
  };
})();
