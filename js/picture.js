'use strict';

(function () {

  var photos = [];
  var buttonsForm = document.querySelector('.img-filters__form');
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;

  var renderPhotos = function (photo) {
    var pic = pictureTemplate.cloneNode(true);

    pic.querySelector('.picture__img').src = photo.url;
    pic.querySelector('.picture__likes').textContent = photo.likes;
    pic.querySelector('.picture__comments').textContent = photo.comments.length;

    return pic;
  };

  var insertPhoto = function (photosList) {
    var fragment = document.createDocumentFragment();

    photosList.forEach(function (el) {
      fragment.appendChild(renderPhotos(el));
    });

    pictures.appendChild(fragment);
  };


  // Фильтры

  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var updateButtonsClass = function (activeButton) {
    var buttonElements = buttonsForm.querySelectorAll('.img-filters__button');

    buttonElements.forEach(function (buttonEl) {
      buttonEl.classList.remove('img-filters__button--active');
    });

    activeButton.classList.add('img-filters__button--active');
  };

  var updatePhotosList = function (filteredPictures) {
    clearPhotosList();
    insertPhoto(filteredPictures);
  };

  var debounceUpdatePhotosList = window.debounce(updatePhotosList);

  var onFilterButtonClick = function (evt) {
    var isTypeButton = evt.target.type === 'button';
    var isActiveButton = evt.target.classList.contains('img-filters__button--active');
    var ButtonIdToFIlterName = {
      'filter-popular': 'filterPopular',
      'filter-new': 'filterNew',
      'filter-discussed': 'filterComments'
    };

    if (!isTypeButton || isActiveButton) {
      return;
    }

    updateButtonsClass(evt.target);
    var filterFunctionName = ButtonIdToFIlterName[evt.target.id];
    var filteredPictures = window.filters[filterFunctionName](photos);

    debounceUpdatePhotosList(filteredPictures);
  };

  var onLoadSuccess = function (data) {
    photos = data;
    insertPhoto(data);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    buttonsForm.addEventListener('click', onFilterButtonClick);
    pictures.addEventListener('click', onPicturesClick);
  };

  var clearPhotosList = function () {
    var picturesDel = document.querySelectorAll('.picture');
    picturesDel.forEach(function (el) {
      el.remove();
    });
  };

  var getImageData = function (imageSrc) {
    var pictureIndex = photos.map(function (e) {
      return e.url;
    }).indexOf(imageSrc);

    return photos[pictureIndex];
  };

  var onPicturesClick = function (evt) {
    var target = evt.target;
    var pics = target.closest('.picture');

    if (!pics) {
      return;
    }

    var imageElement = pics.querySelector('.picture__img');
    var imageSrc = imageElement.getAttribute('src');
    var imageData = getImageData(imageSrc);

    window.bigPicture.showBigPicture(imageData);
  };

  window.load(onLoadSuccess, onLoadError);

})();
