'use strict';

// Глобальные переменные и элементы

(function () {

  window.ESC_KEYCODE = 27;

  window.imageUploadOverlay = document.querySelector('.img-upload__overlay');

  window.effectLevel = window.imageUploadOverlay.querySelector('.effect-level');

  window.uploadFile = document.querySelector('#upload-file');

  window.uploadCancel = document.querySelector('#upload-cancel');

  window.сloseButtonImageUpload = window.imageUploadOverlay.querySelector('.img-upload__cancel');

  window.imagePreview = document.querySelector('.img-upload__preview');

  window.imgUploadForm = document.querySelector('.img-upload__form');

})();
