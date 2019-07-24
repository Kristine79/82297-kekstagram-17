
'use strict';
// Сообщение об ошибке при работе с сервером

(function () {
  var TIMEOUT_ERROR = 3000; // 3c

  window.errorData = {
    onError: function (message) {
      scrollTo(0, 0);

      var divError = document.createElement('div');
      divError.style =
        'margin: 0 auto; padding: 15px 0; font-size: 30px; text-align: center; background-color: #ff4e4e';
      divError.style.position = 'absolute';
      divError.style.zIndex = '100';
      divError.style.left = 0;
      divError.style.right = 0;

      divError.textContent = message;

      document.body.insertAdjacentElement('afterbegin', divError);

      setTimeout(function () {
        divError.classList.add('hidden');
      }, TIMEOUT_ERROR);
    }
  };
})();
