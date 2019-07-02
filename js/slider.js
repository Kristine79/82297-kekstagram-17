'use strict';

// Слайдер - ползунок и изменение интенсивности эффектов

(function () {

var effectLevelValue = window.effectLevel.querySelector('.effect-level__value');
var effectLevelLine = window.effectLevel.querySelector('.effect-level__line');
var effectLevelPin = window.effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = window.effectLevel.querySelector('.effect-level__depth');
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

})();


