
'use strict';

var commentsText = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var authors = ['Света', 'Катя', 'Иван', 'Дмитрий', 'Злата', 'Карина'];

var avatar = ['../img/avatar-1.svg', '../img/avatar-2.svg', '../img/avatar-3.svg', '../img/avatar-4.svg', '../img/avatar-5.svg', '../img/avatar-6.svg'];

var photosQuantity = 25;

var photos = [];


function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var makeComments = function () {
  var comments = [];
  for (var z = 0; z < randomInteger(1, 20); z++) {
    comments[z] = {
      avatar: randomInteger(avatar),
      comment: randomInteger(commentsText),
      name: randomInteger(authors)
    };
  }
  return comments;
};


for (var i = 1; i <= photosQuantity; i++) {
  var urlData = 'photos/' + i + '.jpg';
  photos.push({
    url: urlData,
    likes: randomInteger(15, 200),
    comments: makeComments().length
  });
}

var pictureElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

var renderPhotos = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments;

  return photoElement;
};


var fragment = document.createDocumentFragment();

for (var element = 0; element < photos.length; element++) {
  fragment.appendChild(renderPhotos(photos[element]));
}

pictureElement.appendChild(fragment);
