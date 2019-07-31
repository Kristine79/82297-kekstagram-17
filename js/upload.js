'use strict';

(function () {
  var main = document.querySelector('main');

  var resetUpload = function () {
    window.imgUploadPreviewLoad.src = '';
    window.hashtagsInput.value = '';
    window.commentField.value = '';
    window.uploadFile.value = '';
  };

  var openWindow = function (dialogWindow) {
    var successWindow = document.querySelector('#' + dialogWindow).content.querySelector('.' + dialogWindow);
    var message = successWindow.cloneNode(true);

    main.appendChild(message);
  };

  var closeWindow = function (dialogWindow) {
    var dialog = main.querySelector('.' + dialogWindow);
    var dialogButton = dialog.querySelectorAll('.' + dialogWindow + '__button');

    var onEscPress = function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        dialog.remove();
      }
      return evt;
    };

    var dialogElementRemove = function () {
      dialog.remove();
    };

    var dialogRemove = function (evt) {
      if (!evt.target.closest('.' + dialogWindow + '__inner')) {
        dialogElementRemove();
      }
    };

    document.addEventListener('keydown', onEscPress);

    dialog.addEventListener('click', dialogRemove);

    dialogButton.forEach(function (button) {
      button.addEventListener('click', dialogElementRemove);
    });
  };

  var onSucces = function () {
    window.closePopup();
    resetUpload();
    openWindow('success');
    closeWindow('success');
  };

  var onError = function () {
    window.closePopup();
    resetUpload();
    openWindow('error');
    closeWindow('error');
  };
  window.onError = onError;

  window.imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var submitResult = window.submitValidate();
    if (!submitResult) {
      var newFormData = new FormData(window.imgUploadForm);
      window.upload(newFormData, onSucces);
    }
  });
})();
