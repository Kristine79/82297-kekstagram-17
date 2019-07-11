'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');

  var createComment = function (comment) {
    var commentElement = bigPictureElement.querySelector('.social__comment');
    var elementDesc = commentElement.cloneNode(true);

    elementDesc.querySelector('.social__text').textContent = comment.message;
    elementDesc.querySelector('.social__picture').src = comment.avatar;

    return elementDesc;
  };

  var clearCommentsList = function () {
    var comments = bigPictureElement.querySelectorAll('.social__comment');
    comments.forEach(function (el) {
      el.remove();
    });
  };

  var displayBigPicture = function (dataPhoto) {
    var comments = dataPhoto.comments;
    var pictureImageElement = bigPictureElement.querySelector('.big-picture__img');
    var pictureImageSrcElement = pictureImageElement.querySelector('img');
    var likesCountElement = bigPictureElement.querySelector('.likes-count');
    var commentsCountElement = bigPictureElement.querySelector('.comments-count');
    var socialCaption = bigPictureElement.querySelector('.social__caption');
    var fragment = document.createDocumentFragment();
    var similarListElement = document.querySelector('.social__comments');

    comments.forEach(function (comment) {
      fragment.appendChild(createComment(comment));
    });

    clearCommentsList();

    similarListElement.appendChild(fragment);

    pictureImageSrcElement.src = dataPhoto.url;
    likesCountElement.textContent = dataPhoto.likes;
    commentsCountElement.textContent = dataPhoto.comments.length;
    socialCaption.textContent = dataPhoto.description;
  };

  var openBigPictureForm = function () {
    var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
    var commentLoaderElement = bigPictureElement.querySelector('.comments-loader');

    bigPictureElement.classList.remove('hidden');
    commentCountElement.classList.add('hidden');
    commentLoaderElement.classList.add('hidden');
  };

   var onFormEscPress = function (e) {
    if (e.keyCode === window.ESC_KEYCODE) {
      closeBigPictureForm();
    }
  };

  var closeBigPictureForm = function () {
    bigPictureElement.classList.add('hidden');

    document.removeEventListener('click', closeBigPictureForm);
  };

  var showBigPicture = function (data) {
    var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

    displayBigPicture(data);
    openBigPictureForm();

    bigPictureCloseElement.addEventListener('click', closeBigPictureForm);
    document.addEventListener('keydown', onFormEscPress);
  };

  window.bigPicture = {
    showBigPicture: showBigPicture
  };

})();
