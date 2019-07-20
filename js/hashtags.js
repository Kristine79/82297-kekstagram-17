'use strict';

(function () {
  var MAX_HASHTAGS_LENGTH = 5;
  var MAX_HASHTAG_SIZE = 20;
  var MIN_HASHTAG_SIZE = 2;
  var hashtags = document.querySelector('.text__hashtags');
  window.hashtags = hashtags;
  var imageUploadForm = document.querySelector('.img-upload__form');

  var hashtagsValidate = function () {
    var hashtagsArray = hashtags.value.split(' ');
    hashtags.addEventListener('input', function () {
      hashtags.setCustomValidity('');
    });

    if (hashtagsArray.length > MAX_HASHTAGS_LENGTH) {
      onHashtagsError();
      return 'Нельзя указать больше' + MAX_HASHTAGS_LENGTH + ' тегов';
    }

    var isRepeatHashtag = hashtagsArray.some(function (item, i, arr) {
      return ~arr.indexOf(item, i + 1);
    });

    if (isRepeatHashtag) {
       onHashtagsError();
       return 'Один и тот же хэш-тег не может быть использован дважды'
    }

    var isSplitSpaceHashtag = hashtagsArray.some(function (item) {
      return ~item.indexOf('#', 1);
    });

    if (isSplitSpaceHashtag) {
      onHashtagsError();
      return 'Хэш-теги разделяются пробелами';
    }

    for (var i = 0; i < hashtagsArray.length; i++) {

      if (hashtagsArray[i] === '#') {
        onHashtagsError();
        return 'Хеш-тег не может состоять только из одной решётки';

      } else if (hashtagsArray[i].length === MIN_HASHTAG_SIZE) {
        onHashtagsError();
        return 'Хэш-тег не может состоять из одной буквы';

      } else if (hashtagsArray[i].charAt(0) !== '#') {
        onHashtagsError();
        return 'Хэш-тег должен начинаться с символа #';

      } else if (hashtagsArray[i].length > MAX_HASHTAG_SIZE) {
        onHashtagsError();
        return 'Максимальная длина одного хэш-тега' + MAX_HASHTAG_SIZE + ' символов, включая решетку';
      }
    }
    return '';
  };

  var hashtagsError = function (errorMessage, entryField) {
    if (errorMessage) {
      entryField.style.outline = '4px solid red';
      entryField.setCustomValidity(errorMessage);     }
  };

  var submitValidate = function () {
    hashtagsError(hashtagsValidate(), hashtags);
  };

  var onHashtagsError = function () {
    event.preventDefault();
  };

  imageUploadForm.addEventListener('submit', submitValidate);

})();
