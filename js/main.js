
'use strict';

var commentsText = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var authors = ['Света', 'Катя', 'Иван', 'Дмитрий', 'Злата', 'Карина'];

var avatar = ['../img/avatar-1.svg', '../img/avatar-2.svg', '../img/avatar-3.svg', '../img/avatar-4.svg', '../img/avatar-5.svg', '../img/avatar-6.svg'];

var photosQuantity = 25;

var photos = [];


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
  photoElement.querySelector('.picture__comments').textContent = photo.comments;

  return photoElement;
};


var fragment = document.createDocumentFragment();

for (var element = 0; element < photos.length; element++) {
  fragment.appendChild(renderPhotos(photos[element]));
}

pictureElement.appendChild(fragment);


// Загрузка и обработка фото

var ESC_KEYCODE = 27;
var uploadFile = document.querySelector('#upload-file');
var imageUpload = document.querySelector('.img-upload__overlay');
var CloseButtonImageUploadHandler = imageUpload.querySelector('.img-upload__cancel');
var imagePreview = imageUpload.querySelector('.img-upload__preview img');
var photosEffectsList = imageUpload.querySelectorAll('.effects__item');
var effectLevel = imageUpload.querySelector('.effect-level');

var filters = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];


uploadFile.addEventListener('change', function () {
  imageUpload.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscClose);
});


var closeImageUpload = function () {
  imageUpload.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscClose);
};

CloseButtonImageUploadHandler.addEventListener('click', closeImageUpload);


var onPopupEscClose = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImageUpload();
  }
};

var elementScaleSmaller = document.querySelector('.scale__control--smaller');
var elementScaleBigger = document.querySelector('.scale__control--bigger');
var elementScaleValue = document.querySelector('.scale__control--value');
var minScale = 25;
var maxScale = 100;
var scaleStep = 25;
var defaultFilterValue = 100;
var currentScaleValue = defaultFilterValue;
var elementImagePreviewWrap = document.querySelector('.img-upload__preview');

var imageZoomOutHandler = function () {
  currentScaleValue -= scaleStep;
  setImagePreviewScale(currentScaleValue);
};

var imageZoomInHandler = function () {
  currentScaleValue += scaleStep;
  setImagePreviewScale(currentScaleValue);
};


elementScaleSmaller.addEventListener('click', function () {
  if (currentScaleValue > minScale) {
    imageZoomOutHandler();
  }
});
elementScaleSmaller.addEventListener('keydown', function () {
  if (currentScaleValue > minScale) {
    imageZoomOutHandler();
  }
});
elementScaleBigger.addEventListener('click', function () {
  if (currentScaleValue < maxScale) {
    imageZoomInHandler();
  }
});
elementScaleBigger.addEventListener('keydown', function () {
  if (currentScaleValue < minScale) {
    imageZoomInHandler();
  }
});


var setImagePreviewScale = function (value) {
  elementScaleValue.value = value + '%';
  elementImagePreviewWrap.style.transform = 'scale(' + value / 100 + ')';
};

var addFilterHandler = function (photo, filter) {
  photo.addEventListener('click', function () {
    imagePreview.className = filter;
    if (filter === 'effects__preview--none') {
      effectLevel.style.display = 'none';
    } else {
      effectLevel.style.display = 'block';
    }
  });
};

for (var x = 0; x < photosEffectsList.length; x++) {
  addFilterHandler(photosEffectsList[x], filters[x]);
}
