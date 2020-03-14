'use strict';

(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var PicSize = {
    WIDTH: '70',
    HEIGHT: '70'
  };

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var homePhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var homePhoto = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  function setDefault() {
    setDefaultAvatar();
    removeHomePhotos();
    removeHomePhotos();
  }

  function setDefaultAvatar() {
    avatar.src = DEFAULT_AVATAR;
  }

  function removeHomePhotos() {
    var homePhotos = photoContainer.querySelectorAll('.ad-form__photo');
    homePhotos.forEach(function (photo) {
      photo.remove();
    });
  }

  function attachEvents() {
    avatarFileChooser.addEventListener('change', onAvatarChange);
    homePhotoFileChooser.addEventListener('change', onHomePhotoChange);
  }

  function onAvatarChange() {
    displayPicture(avatarFileChooser, avatar);
  }

  function onHomePhotoChange() {
    var homePhotoClone = homePhoto.cloneNode(true);
    var imgItem = document.createElement('img');
    homePhotoClone.appendChild(imgItem);
    imgItem.width = PicSize.WIDTH;
    imgItem.height = PicSize.HEIGHT;
    displayPicture(homePhotoFileChooser, imgItem);
    photoContainer.appendChild(homePhotoClone);
  }

  function displayPicture(fileChooser, imgElement) {
    var file = fileChooser.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      imgElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }


  window.avatar = {
    setDefault: setDefault,
    attachEvents: attachEvents
  };
})();
