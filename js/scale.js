'use strict';

(function () {
  var imgUpload = document.querySelector('.img-upload__preview-container');
  var scaleControlValue = imgUpload.querySelector('.scale__control--value');
  var uploadPreview = document.querySelector('.img-upload__preview');
  var imgPreview = uploadPreview.querySelector('img');
  var currentTransformScaleNumber;
  var currentScaleInputNumber;

  var onPlusScale = function () {
    if (parseInt(scaleControlValue.value, 10) >= 100) {
      return;
    }

    onScaleChange(1);
  };

  var onMinusScale = function () {
    if (parseInt(scaleControlValue.value, 10) <= 25) {
      return;
    }

    onScaleChange(-1);
  };

  var onScaleChange = function (zoomFactor) {
    currentTransformScaleNumber = parseInt(scaleControlValue.value, 10) / 100 + (zoomFactor * 0.25);
    currentScaleInputNumber = parseInt(scaleControlValue.value, 10) + (zoomFactor * 25) + '%';
    imgPreview.style.transform = 'scale(' + currentTransformScaleNumber + ')';
    scaleControlValue.value = currentScaleInputNumber;
  };

  var resetScaleValue = function () {
    imgPreview.removeAttribute('style');
    scaleControlValue.value = '100%';
    currentTransformScaleNumber = 1;
    currentScaleInputNumber = 100;
  };

  window.scale = {
    onPlusScale: onPlusScale,
    onMinusScale: onMinusScale,
    resetScaleValue: resetScaleValue
  };
})();
