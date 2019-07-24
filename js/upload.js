'use strict';

(function () {
  var main = document.querySelector('main');

  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    var URL_POST = 'https://js.dump.academy/kekstagram';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  var resetUpload = function () {
    window.hashtags.value = '';
    window.commentField.value = '';
    window.uploadFile.value = '';
  };

  var openWindow = function (dialogWindow) {
    var successWindow = document.querySelector('#' + dialogWindow).content.querySelector('.' + dialogWindow);

    main.appendChild(successWindow);
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

  window.imageUploadForm.addEventListener('submit', function (evt) {
    upload(new FormData(window.imageUploadForm), onSucces);
    evt.preventDefault();
  });

})();
