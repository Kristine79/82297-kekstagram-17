// Загрузка и обработка фото

'use strict';

(function () {

var MIN_SCALE = 25;
var MAX_SCALE = 100;
var SCALE_STEP = 25;
var DEFAULT_FILTER_VALUE = 100;
var imagePreview = window.imageUploadOverlay.querySelector('.img-upload__preview img');
var photosEffectsList = window.imageUploadOverlay.querySelectorAll('.effects__item');
var elementScaleSmaller = document.querySelector('.scale__control--smaller');
var elementScaleBigger = document.querySelector('.scale__control--bigger');
var currentScaleValue = DEFAULT_FILTER_VALUE;
var elementImagePreviewWrap = document.querySelector('.img-upload__preview');

var filters = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

// Изменение масштаба изображения

var imageZoomOutHandler = function () {
  currentScaleValue -= SCALE_STEP;
  setImagePreviewScale(currentScaleValue);
};

var imageZoomInHandler = function () {
  currentScaleValue += SCALE_STEP;
  setImagePreviewScale(currentScaleValue);
};

elementScaleSmaller.addEventListener('click', function () {
  if (currentScaleValue > MIN_SCALE) {
    imageZoomOutHandler();
  }
});
elementScaleSmaller.addEventListener('keydown', function () {
  if (currentScaleValue > MIN_SCALE) {
    imageZoomOutHandler();
  }
});
elementScaleBigger.addEventListener('click', function () {
  if (currentScaleValue < MAX_SCALE) {
    imageZoomInHandler();
  }
});
elementScaleBigger.addEventListener('keydown', function () {
  if (currentScaleValue < MIN_SCALE) {
    imageZoomInHandler();
  }
});

// Смена эффектов

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

})();
