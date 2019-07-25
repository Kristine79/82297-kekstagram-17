'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var imageChooser = document.querySelector('.img-upload__input');
  var uploadPreview = document.querySelector('.img-upload__preview');
  var imgPreview = uploadPreview.querySelector('img');

  imageChooser.addEventListener('change', function () {
    var file = imageChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
