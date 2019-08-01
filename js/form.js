'use strict';

(function () {
  var imgUpload = document.querySelector('.img-upload');
  var formEdition = imgUpload.querySelector('.img-upload__overlay');
  var zoomOutButton = formEdition.querySelector('.scale__control--smaller');
  var zoomInButton = formEdition.querySelector('.scale__control--bigger');
  var effectsList = document.querySelector('.effects__list');
  var editionClose = imgUpload.querySelector('.img-upload__cancel');
  var commentField = document.querySelector('.text__description');
  window.commentField = commentField;

  var pressEscButton = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      if (commentField === document.activeElement || window.hashtagsInput === document.activeElement) {
        return evt;
      } else {
        closePopup();
      }
    }
    return evt;
  };

  var closeFormEdition = function () {
    formEdition.classList.add('hidden');
    window.uploadFile.value = '';
    window.scale.resetScaleValue();
    zoomOutButton.removeEventListener('click', onPlusScale);
    zoomInButton.removeEventListener('click', onMinusScale);
    document.removeEventListener('keydown', pressEscButton);
    effectsList.removeEventListener('change', onEffectChange);
    editionClose.removeEventListener('click', closeFormEdition);
  };

  var openFormEdition = function () {
    formEdition.classList.remove('hidden');
    document.addEventListener('keydown', pressEscButton);
  };

  var sliderElem = imgUpload.querySelector('.effect-level__line');
  var thumbElem = imgUpload.querySelector('.effect-level__pin');
  var levelDepthElement = imgUpload.querySelector('.effect-level__depth');

  thumbElem.addEventListener('mousedown', function (e) {
    var thumbCoords = getCoords(thumbElem);
    var shiftX = e.pageX - thumbCoords.left;

    var getSizeElement = function (elem) {
      var elemInfo = elem.getBoundingClientRect();
      var sizeElem = elemInfo.width;
      return sizeElem;
    };

    var sliderSizeElem = getSizeElement(sliderElem);

    var sliderCoords = getCoords(sliderElem);
    var onMouseMove = function (moveEvt) {
      var newLeft = moveEvt.pageX - shiftX - sliderCoords.left;
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = sliderElem.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      var left = Math.round(newLeft / sliderSizeElem * 100);
      var percentLeft = left + '%';
      thumbElem.style.left = percentLeft;
      levelDepthElement.style.width = percentLeft;

      window.effects.setEffect(left);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return false;
  });

  thumbElem.ondragstart = function () {
    return false;
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  };

  var onPlusScale = function () {
    window.scale.onPlusScale(1);
  };
  var onMinusScale = function () {
    window.scale.onMinusScale(-1);
  };

  var onEffectChange = function (evt) {
    window.effects.setEffectChange(evt);
  };

  window.uploadFile.addEventListener('change', function () {
    openFormEdition();
    window.effects.resetFormEdition();
    window.scale.resetScaleValue();
    effectsList.addEventListener('change', onEffectChange);
    zoomInButton.addEventListener('click', onPlusScale);
    zoomOutButton.addEventListener('click', onMinusScale);
    editionClose.addEventListener('click', closeFormEdition);
  });

  var closePopup = function () {
    window.imageUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', pressEscButton);
  };
  window.closePopup = closePopup;

})();
