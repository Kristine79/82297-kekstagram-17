'use strict';

(function () {
  var EFFECT_SETTINGS = {
    chrome: {
      minValue: 0,
      maxValue: 1
    },

    sepia: {
      minValue: 0,
      maxValue: 1
    },

    marvin: {
      minValue: 0,
      maxValue: 100
    },

    phobos: {
      minValue: 0,
      maxValue: 3
    },

    heat: {
      minValue: 1,
      maxValue: 3
    }
  };

  var currentFilterName = 'none';
  var currentFilterClassName = '';
  var imgPreview = document.querySelector('.img-upload__preview');
  var slider = document.querySelector('.img-upload__effect-level');
  var levelEffectValue = document.querySelector('.effect-level__value');

  var getEffectValue = function (value) {
    if (currentFilterName !== 'none') {
      var maxValue = EFFECT_SETTINGS[currentFilterName].maxValue;
      var minValue = EFFECT_SETTINGS[currentFilterName].minValue;
      var range = maxValue - minValue;
      var effectValue = range * value / 100 + minValue;
    }
    return effectValue;
  };

  var getEffectString = function (levelEffect) {
    var effectString;
    switch (currentFilterName) {
      case 'chrome':
        effectString = 'grayscale(' + levelEffect + ')';
        break;
      case 'sepia':
        effectString = 'sepia(' + levelEffect + ')';
        break;
      case 'marvin':
        effectString = 'invert(' + levelEffect + '%)';
        break;
      case 'phobos':
        effectString = 'blur(' + levelEffect + 'px)';
        break;
      case 'heat':
        effectString = 'brightness(' + levelEffect + ')';
        break;
      default:
        effectString = '';
        break;
    }
    return effectString;
  };

  var setEffectChange = function (evt) {
    resetPreview();
    currentFilterName = evt.target.value;
    setEffectPreview(evt.target.value);
  };

  var setEffectPreview = function (effectName) {

    resetClassPreview();

    if (effectName !== 'none') {
      slider.classList.remove('hidden');
      currentFilterClassName = 'effects__preview--' + effectName;
      imgPreview.classList.add(currentFilterClassName);

    } else {
      slider.classList.add('hidden');
      currentFilterClassName = '';
      imgPreview.style.filter = '';
    }
  };

  var resetPreview = function () {
    var levelLine = document.querySelector('.effect-level__line');
    var levelPin = levelLine.querySelector('.effect-level__pin');
    var levelDepth = levelLine.querySelector('.effect-level__depth');
    levelPin.style.left = '100%';
    levelDepth.style.width = '100%';
    levelEffectValue.value = 100;
    imgPreview.style = '';
  };

  var resetFormEdition = function () {
    var scaleControl = document.querySelector('.scale__control--value');

    resetClassPreview();
    resetPreview();

    currentFilterName = 'none';
    currentFilterClassName = '';
    scaleControl.value = '100%';
    slider.classList.add('hidden');
  };

  var resetClassPreview = function () {
    if (currentFilterClassName) {
      imgPreview.classList.remove(currentFilterClassName);
    }
  };

  var setEffect = function (left) {
    var levelEffect = getEffectValue(left);
    var stringLevelEffect = getEffectString(levelEffect);

    imgPreview.style.filter = stringLevelEffect;

    levelEffectValue.value = left;
  };

  window.effects = {
    setEffectChange: setEffectChange,
    resetFormEdition: resetFormEdition,
    setEffect: setEffect
  };
})();
