'use strict';

(function () {

// Валидация формы - поле с комментарием

var commentField = document.querySelector('.text__description');

var pressEscButton = function (evt) {
  if (evt.keyCode === window.ESC_KEYCODE) {
    if (commentField === document.activeElement) {
      return evt;
    } else {
      closePopup();
    }
  }
  return evt;
};


// Открытие и закрытие формы

var openPopup = function () {
  imageUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', pressEscButton);
  elementScaleValue.value = '100%';
};

var closePopup = function () {
  imageUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', pressEscButton);
};

window.uploadFile.addEventListener('click', function () {
  openPopup();
});

сloseButtonImageUpload.addEventListener('click', function () {
  closePopup();
});

})();

