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
  return parseInt(count + 1, 10);
};

var cardsGen = function () {
  var cardItem = [];
  for (var i = 0; i <= 25; i++) {
    cardItem.push({
      'avatar': 'photos/' + parseInt(Math.random() * 25 + 1, 10) + '.jpg',
      'description': descriptionList[parseInt(Math.random() * descriptionList.length, 10)],
      'likes': likeCounter(15, 200),
      'comments': userComment()
    });
  }
  return cardItem;
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = new DocumentFragment();
var cards = cardsGen();

for (var i = 0; i < cards.length; i++) {
  var copyPicture = pictureTemplate.cloneNode(true);
  copyPicture.querySelector('.picture__img').src = cards[i].avatar;
  copyPicture.querySelector('.picture__likes').textContent = cards[i].likes;
  copyPicture.querySelector('.picture__comments').textContent = cards[i].comments.length;
  fragment.appendChild(copyPicture);
}

var pictureList = document.querySelector('.pictures');
pictureList.appendChild(fragment);

//Окно редактирования изображения

var uploadFile = document.querySelector('#upload-file');
var openForm = document.querySelector('.img-upload__overlay');
var closeForm = openForm.querySelector('.img-upload__cancel');

uploadFile.addEventListener('change', function () {
  openForm.classList.remove('hidden');
});

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

var closePopup = function () {
  openForm.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  uploadFile.value = '';
};

closeForm.addEventListener('click', function () {
  closePopup();
});

//Наложение эффекта на фото

var photoPreview = document.querySelector('.img-upload__preview');
var photoEffectList = document.querySelector('.img-upload__effects');

var photoEffectChange = function (evt) {
  photoPreview.classList.add(“effect-preview__” + evt.target.value);
};

photoEffectList.addEventListener('change', photoEffectChange);
