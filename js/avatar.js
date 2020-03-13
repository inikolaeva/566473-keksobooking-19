'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var PIC_SIZE = {
    WIDTH: '70',
    HEIGHT: '70'
  };

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var homePhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var homePhoto = document.querySelector('.ad-form__photo');

  function setDefault() {
    setDefaultAvatar();
    removeHomePhotos();
  }

  function setDefaultAvatar() {
    avatar.src = DEFAULT_AVATAR;
  }

  function removeHomePhotos() {
    var homePhotos = document.querySelectorAll('.ad-form__photo img');
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
    var imgItem = document.createElement('img');
    imgItem.width = PIC_SIZE.WIDTH;
    imgItem.height = PIC_SIZE.HEIGHT;
    displayPicture(homePhotoFileChooser, imgItem);
    homePhoto.appendChild(imgItem);
  }

  function displayPicture(fileChooser, imgElement) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgElement.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  window.avatar = {
    setDefault: setDefault,
    attachEvents: attachEvents
  };
})();
