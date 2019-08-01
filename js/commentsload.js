'use strict';

(function () {
  var COMMENTS_COUNT = 5;
  var bigPicture = document.querySelector('.big-picture');
  var commentLoader = bigPicture.querySelector('.comments-loader');
  var commentIndex = 0;

  // Создаем комментарий
  var createComment = function (comment) {
    var commentSocial = bigPicture.querySelector('.social__comment');
    var description = commentSocial.cloneNode(true);

    description.querySelector('.social__text').textContent = comment.message;
    description.querySelector('.social__picture').src = comment.avatar;

    return description;
  };

  var insertCommentsCounter = function (numberСomments) {
    var commentCount = bigPicture.querySelector('.social__comment-count');
    var stringCountcommentSocial = commentCount.innerHTML = commentIndex + ' из <span class="comments-count">' + numberСomments + '</span> комментариев';

    return stringCountcommentSocial;
  };


  var getCommentListFragment = function (comments) {
    var fragment = document.createDocumentFragment();
    var i = 0;

    while (commentIndex < comments.length && i < COMMENTS_COUNT) {
      fragment.appendChild(createComment(comments[commentIndex]));
      commentIndex++;
      i++;
    }

    if (commentIndex < comments.length) {
      commentLoader.classList.remove('hidden');
    } else {
      commentLoader.classList.add('hidden');
    }

    insertCommentsCounter(comments.length);
    return fragment;
  };

  window.loaderComments = {
    getCommentListFragment: getCommentListFragment,
    resetIndex: function () {
      commentIndex = 0;
    }
  };
})();
