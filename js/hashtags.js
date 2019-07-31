'use strict';

(function () {
  var MAX_HASHTAGS_LENGTH = 5;
  var MAX_HASHTAG_SIZE = 20;
  var MIN_HASHTAG_SIZE = 2;
  var hashtagsInput = document.querySelector('.text__hashtags');
  window.hashtagsInput = hashtagsInput;
  var imgUploadForm = document.querySelector('.img-upload__form');
  window.imgUploadForm = imgUploadForm;

  var hashtagsValidate = function (hashtagsInputValue) {
    var hashtags = hashtagsInputValue.split(' ');

    hashtagsInput.addEventListener('input', function () {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.style.outline = 'none';
    });

    if (hashtags.length > MAX_HASHTAGS_LENGTH) {
      return 'Нельзя внести больше ' + MAX_HASHTAGS_LENGTH + ' тегов';
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i] === '#') {
        return 'Хэштег не может состоять из одной решетки';

      } else if (hashtags[i].length === MIN_HASHTAG_SIZE) {
        return 'Хэштег не может состоять из одной буквы';

      } else if (hashtags[i].charAt(0) !== '#') {
        return 'Хэштег должен начинаться с символа #';

      } else if (hashtags[i].length > MAX_HASHTAG_SIZE) {
        return 'Хэштег не может содержать больше ' + MAX_HASHTAG_SIZE + ' символов';

      } else if (hashtags.indexOf(hashtags[i]) !== i) {
        return 'Один и тот же хэш-тег не может быть использован дважды';

      } else if (hashtags.length > 5) {
        return 'Нельзя указать больше пяти хэш-тегов';

      } else if (hashtags[i].indexOf('#', 1) >= 1) {
        return 'Хэш-теги разделяются пробелами';
      }
    }
    return false;
  };

  var submitValidate = function () {
    var hashtagsInputValue = hashtagsInput.value;
    if (hashtagsInputValue === '') {
      return false;
    }
    var errorMessage = hashtagsValidate(hashtagsInputValue);
    if (errorMessage) {
      hashtagsInput.style.outline = '4px solid red';
      hashtagsInput.setCustomValidity(errorMessage);
      return true;
    }
    return false;
  };

  window.submitValidate = submitValidate;
})();
