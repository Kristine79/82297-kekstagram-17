'use strict';
// Проверка поля с хэш тегами

(function () {

    var textfieldHashtagsElement = window.imgUploadOverlayElement.querySelector(
      '.text__hashtags'
  );

  textfieldHashtagsElement.addEventListener('change', function () {
    var invalidMessage = [];

    var inputText = textfieldHashtagsElement.value.toLowerCase();

    if (!inputText) {
      return;
    }

    var inputArray = inputText.split(' ').filter(function (item) {
      return item !== '';
    });

    var isStartNotHashtag = inputArray.some(function (item) {
      return item[0] !== '#';
    });
    if (isStartNotHashtag) {
      invalidMessage.push('Хэш-тег должен начинаеться с символа #');
    }

    var isOnlyLatticeHashtag = inputArray.some(function (item) {
      return item === '#';
    });
    if (isOnlyLatticeHashtag) {
      invalidMessage.push('Хеш-тег не может состоять только из одной решётки');
    }

    var isSplitSpaceHashtag = inputArray.some(function (item) {
      return ~item.indexOf('#', 1);
    });
    if (isSplitSpaceHashtag) {
      invalidMessage.push('Хэш-теги разделяются пробелами');
    }

    var isRepeatHashtag = inputArray.some(function (item, i, arr) {
      return ~arr.indexOf(item, i + 1);
    });

    if (isRepeatHashtag) {
      invalidMessage.push(
          'Один и тот же хэш-тег не может быть использован дважды'
      );
    }

    var isLongHashtag = inputArray.some(function (item) {
      return item.length > 20;
    });
    if (isLongHashtag) {
      invalidMessage.push(
          'Максимальная длина одного хэш-тега 20 символов, включая решётку'
      );
    }

    if (inputArray.length > 5) {
      invalidMessage.push('Нельзя указать больше пяти хэш-тегов');
    }

    textfieldHashtagsElement.setCustomValidity(invalidMessage.join('. \n'));

    if (textfieldHashtagsElement.validationMessage) {
      textfieldHashtagsElement.style.outlineColor = 'red';
    }
  });

})();
