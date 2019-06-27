// Загрузка и обработка фото

'use strict';

var ESC_KEYCODE = 27;
var uploadFile = document.querySelector('#upload-file');
var imageUploadOverlay = document.querySelector('.img-upload__overlay');
// var imageUpload = document.querySelector('.img-upload__overlay');
var сloseButtonImageUpload = imageUploadOverlay.querySelector('.img-upload__cancel');
var imagePreview = imageUploadOverlay.querySelector('.img-upload__preview img');
var photosEffectsList = imageUploadOverlay.querySelectorAll('.effects__item');
var effectLevel = imageUploadOverlay.querySelector('.effect-level');
var elementScaleSmaller = document.querySelector('.scale__control--smaller');
var elementScaleBigger = document.querySelector('.scale__control--bigger');
var elementScaleValue = document.querySelector('.scale__control--value');
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


// Валидация формы - поле с комментарием

var commentField = document.querySelector('.text__description');

var pressEscButton = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (commentField === document.activeElement) {
      return evt;
    } else {
      closePopup();
    }
  }
  return evt;
};


var openPopup = function () {
  imageUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', pressEscButton);
  elementScaleValue.value = '100%';
};

var closePopup = function () {
  imageUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', pressEscButton);
};

uploadFile.addEventListener('click', function () {
  openPopup();
});

сloseButtonImageUpload.addEventListener('click', function () {
  closePopup();
});


// Слайдер - ползунок и изменение интенсивности эффектов

var effectLevelValue = effectLevel.querySelector('.effect-level__value');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
var imgUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview');
var imageUploadPreview = imgUploadPreview.firstElementChild;

var changeIntensity = function () {
  effectLevelValue.value =
    (
      effectLevelPin.offsetLeft / effectLevelLine.clientWidth
    ).toFixed(2) * 100;

  if (imageUploadPreview.classList[0] === 'effects__preview--chrome') {
    imageUploadPreview.style.filter =
      'grayscale(' + effectLevelValue.value / 100 + ')';
  } else if (
    imageUploadPreview.classList[0] === 'effects__preview--sepia'
  ) {
    imageUploadPreview.style.filter =
      'sepia(' + effectLevelValue.value / 100 + ')';
  } else if (
    imageUploadPreview.classList[0] === 'effects__preview--marvin'
  ) {
    imageUploadPreview.style.filter =
      'invert(' + effectLevelValue.value + '%)';
  } else if (
    imageUploadPreview.classList[0] === 'effects__preview--phobos'
  ) {
    imageUploadPreview.style.filter =
      'blur(' + (effectLevelValue.value / 100) * 3 + 'px)';
  } else if (
    imageUploadPreview.classList[0] === 'effects__preview--heat'
  ) {
    imageUploadPreview.style.filter =
      'brightness(' + (effectLevelValue.value / 100) * 3 + ')';
  }
};


effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordsX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordsX - moveEvt.clientX;
    startCoordsX = moveEvt.clientX;

    var pinElementLeft = effectLevelPin.offsetLeft - shiftX;

    var lineElementLeft = effectLevelLine.getBoundingClientRect().left;
    var lineElementRight = effectLevelLine.getBoundingClientRect().right;
    if (startCoordsX <= lineElementLeft) {
      pinElementLeft = 0;
    } else if (startCoordsX >= lineElementRight) {
      pinElementLeft = effectLevelLine.clientWidth;
    }

    effectLevelPin.style.left = pinElementLeft + 'px';
    effectLevelDepth.style.width = pinElementLeft + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousemove', changeIntensity);

  document.addEventListener('mouseup', onMouseUp);
});


effectLevel.addEventListener('click', function (clickEvt) {
  var coordsX = clickEvt.clientX;
  var lineElementLeft = effectLevelLine.getBoundingClientRect().left;
  var lineElementRight = effectLevelLine.getBoundingClientRect().right;

  var elementLeft = coordsX - lineElementLeft;

  if (coordsX <= lineElementLeft) {
    elementLeft = 0;
  } else if (coordsX >= lineElementRight) {
    elementLeft = effectLevelLine.clientWidth;
  }

  effectLevelPin.style.left = elementLeft + 'px';
  effectLevelDepth.style.width = elementLeft + 'px';
});

effectLevel.addEventListener('click', changeIntensity);
