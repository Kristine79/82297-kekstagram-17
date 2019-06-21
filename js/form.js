// Загрузка и обработка фото

'use strict';

var ESC_KEYCODE = 27;
var uploadFile = document.querySelector('#upload-file');
var imageUpload = document.querySelector('.img-upload__overlay');
var сloseButtonImageUpload = imageUpload.querySelector('.img-upload__cancel');
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
  elementScaleValue.value = '100%';
});


var closeImageUpload = function () {
  imageUpload.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscClose);
};

сloseButtonImageUpload.addEventListener('click', closeImageUpload);


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


// Валидация формы - поле с комментарием

var commentField = document.querySelector('.text__description');

var pressEscButton = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    сloseButtonImageUpload();
  }
};

commentField.addEventListener('focus', function () {
  document.removeEventListener('keydown', pressEscButton);
});

commentField.addEventListener('blur', function () {
  document.addEventListener('keydown', pressEscButton);
});


commentField.addEventListener('invalid', function () {
  if (commentField.validity.tooShort) {
    commentField.setCustomValidity('Комментарий должен состоять минимум из 2-х символов');
    commentField.style.boxShadow = '0 0 0 2px red';
  } else if (commentField.validity.tooLong) {
    commentField.setCustomValidity('Комментарий не должен превышать 140 символов');
  } else if (commentField.validity.valueMissing) {
    commentField.setCustomValidity('Обязательное поле');
    commentField.style.boxShadow = '0 0 0 2px red';
  } else {
    commentField.setCustomValidity('');
  }
});
