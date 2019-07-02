// Загрузка и обработка фото

'use strict';

(function () {

  //var ESC_KEYCODE = 27;
  // var imageUploadOverlay = document.querySelector('.img-upload__overlay');
// var imageUpload = document.querySelector('.img-upload__overlay');
  //var сloseButtonImageUpload = window.imageUploadOverlay.querySelector('.img-upload__cancel');
var imagePreview = window.imageUploadOverlay.querySelector('.img-upload__preview img');
var photosEffectsList = window.imageUploadOverlay.querySelectorAll('.effects__item');
  // var effectLevel = imageUploadOverlay.querySelector('.effect-level');
var elementScaleSmaller = document.querySelector('.scale__control--smaller');
var elementScaleBigger = document.querySelector('.scale__control--bigger');
  //var elementScaleValue = document.querySelector('.scale__control--value');
var minScale = 25;
var maxScale = 100;
var scaleStep = 25;
var defaultFilterValue = 100;
var currentScaleValue = defaultFilterValue;
var elementImagePreviewWrap = document.querySelector('.img-upload__preview');


var filters = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];


// uploadFile.addEventListener('change', function () {
// imageUpload.classList.remove('hidden');
// document.addEventListener('keydown', onPopupEscClose);
// elementScaleValue.value = '100%';
// });


// var onPopupEscClose = function (evt) {
//  if (evt.keyCode === ESC_KEYCODE) {
// closeImageUpload();
// }
// };

// Изменение масштаба изображения

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
