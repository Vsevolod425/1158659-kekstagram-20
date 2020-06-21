'use strict';

var descriptionList = [
  'Неродные просторы',
  'Местная растительность',
  'Дорога на север',
  'Мост дьявола'
];

var userNames = [
  'Андрей',
  'Алексей',
  'Мария',
  'Наталья',
  'Олег'
];

var userComments = [
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'В целом всё неплохо. Но не всё.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Всё отлично!',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var userComment = function () {
  var commentObj = [];
  for (var i = 0; i <= 4; i++) {
    commentObj.push(
        {
          avatar: 'img/avatar - ' + Math.random() * 6 + '.svg',
          message: userComments[parseInt(Math.random() * userComments.length, 10)],
          name: userNames[parseInt(Math.random() * userNames.length, 10)],
        });
  }
  return commentObj;
};

var likeCounter = function (min, max) {
  var count = Math.random() * (max - min);
  return count;
};

var cardsGen = function () {
  var cardItem = [];
  for (var i = 0; i <= 25; i++) {
    cardItem.push({
      'avatar': 'img/' + parseInt(Math.random() * 25, 10) + '.jpg',
      'description': descriptionList[parseInt(Math.random() * descriptionList.length, 10)],
      'likes': likeCounter(15, 200),
      'comments': userComment()
    });
  }
  return cardItem;
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = new DocumentFragment();

for (var i = 0; i <= cardsGen.length; i++) {
  var copyPicture = pictureTemplate.cloneNode(true);
  copyPicture.querySelector('.picture__img').srs = cardsGen[i].avatar;
  copyPicture.querySelector('.picture__likes').textContent = cardsGen[i].likes;
  copyPicture.querySelector('.picture__comments').textContent = cardsGen[i].comments.length;
  fragment.appendChild(copyPicture);
}

var pictureList = document.querySelector('.pictures');
pictureList.appendChild(fragment);
