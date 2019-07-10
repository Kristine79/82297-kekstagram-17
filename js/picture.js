'use strict';

(function () {

var commentsText = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var authors = ['Света', 'Катя', 'Иван', 'Дмитрий', 'Злата', 'Карина'];

var avatar = ['../img/avatar-1.svg', '../img/avatar-2.svg', '../img/avatar-3.svg', '../img/avatar-4.svg', '../img/avatar-5.svg', '../img/avatar-6.svg'];

var photosQuantity = 25;

var photos = [];

var URL = 'https://js.dump.academy/kekstagram/data';

var buttonsFormElement = document.querySelector('.img-filters__form');

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var makeComments = function () {
  var comments = [];
  for (var z = 0; z < randomInteger(1, 20); z++) {
    comments[z] = {
      avatar: randomInteger(avatar),
      comment: randomInteger(commentsText),
      name: randomInteger(authors)
    };
  }
  return comments;
};


for (var i = 1; i <= photosQuantity; i++) {
  var urlData = 'photos/' + i + '.jpg';
  photos.push({
    url: urlData,
    likes: randomInteger(15, 200),
    comments: makeComments().length
  });
}

var pictureElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

var renderPhotos = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

var insertPhoto = function (photos) {
var fragment = document.createDocumentFragment();

for (var element = 0; element < photos.length; element++) {
  fragment.appendChild(renderPhotos(photos[element]));
}

pictureElement.appendChild(fragment);
 };

 //window.load(insertPhoto);

// Фильтры

  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var updateButtonsClass = function (activeButton) {
    var buttonElements = buttonsFormElement.querySelectorAll('.img-filters__button');

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

    buttonsFormElement.addEventListener('click', onFilterButtonClick);
    pictureElement.addEventListener('click', onPicturesClick);
  };

  var clearPhotosList = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (el) {
      el.remove();
    });
  };

  window.load.load(onLoadSuccess, onLoadError);

})();
