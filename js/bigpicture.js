'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var similarList = document.querySelector('.social__comments');
  var commentLoader = bigPicture.querySelector('.comments-loader');
  var comments;

  var clearCommentsList = function () {
    var commentsElements = bigPicture.querySelectorAll('.social__comment');
    commentsElements.forEach(function (el) {
      el.remove();
    });
  };

  var displayBigPicture = function (dataPhoto) {
    var pictureImage = bigPicture.querySelector('.big-picture__img');
    var pictureImageSource = pictureImage.querySelector('img');
    var likesCount = bigPicture.querySelector('.likes-count');
    var commentsCount = bigPicture.querySelector('.comments-count');
    var socialCaption = bigPicture.querySelector('.social__caption');
    comments = dataPhoto.comments;

    var firstLoadCommentList = window.loaderComments.getCommentListFragment(comments);
    clearCommentsList();

    similarList.appendChild(firstLoadCommentList);

    pictureImageSource.src = dataPhoto.url;
    likesCount.textContent = dataPhoto.likes;
    commentsCount.textContent = dataPhoto.comments.length;
    socialCaption.textContent = dataPhoto.description;
  };


  var openBigPictureForm = function () {
    bigPicture.classList.remove('hidden');
  };

  var onFormEscPress = function (e) {
    if (e.keyCode === window.ESC_KEYCODE) {
      closeBigPictureForm();
    }
  };

  var closeBigPictureForm = function () {
    bigPicture.classList.add('hidden');

    window.loaderComments.resetIndex();

    commentLoader.removeEventListener('click', onLoaderComments);
    document.removeEventListener('click', closeBigPictureForm);
    document.removeEventListener('keydown', onFormEscPress);
  };


  var onLoaderComments = function () {
    var fragmentCommentList = window.loaderComments.getCommentListFragment(comments);
    similarList.appendChild(fragmentCommentList);
  };


  var showBigPicture = function (data) {
    var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

    displayBigPicture(data);
    openBigPictureForm();

    commentLoader.addEventListener('click', onLoaderComments);
    bigPictureClose.addEventListener('click', closeBigPictureForm);
    document.addEventListener('keydown', onFormEscPress);
  };

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
