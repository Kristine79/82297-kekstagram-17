'use strict';

(function () {

// Валидация формы - поля с комментарием и хеш-тегом

var commentField = document.querySelector('.text__description');
window.commentField = commentField;

var pressEscButton = function (evt) {
  if (evt.keyCode === window.ESC_KEYCODE) {
    if (commentField === document.activeElement || window.hashtags === document.activeElement) {
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
window.closePopup = closePopup;

window.uploadFile.addEventListener('change', function () {
  openPopup();
});

uploadCancel.addEventListener('click', function () {
    closePopup();
  });

})();

