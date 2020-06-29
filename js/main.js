'use strict';

var DECIMAL_SYSTEM = 10;
var GENERATED_CARDS_AMOUNT = 25;

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

var getRandomElement = function (array) {
  var randomElement = array[parseInt(Math.random() * array.length, DECIMAL_SYSTEM)];
  return randomElement;
};

var getUserComment = function () {
  var commentObj = [];
  for (var i = 0; i <= 4; i++) {
    commentObj.push(
        {
          avatar: 'img/avatar - ' + Math.random() * userComments.length + '.svg',
          message: getRandomElement(userComments),
          name: getRandomElement(userNames)
        });
  }
  return commentObj;
};

var getLikeCounter = function (min, max) {
  var count = Math.random() * (max - min);
  return parseInt(count + 1, DECIMAL_SYSTEM);
};

var getCardsGen = function () {
  var cardItem = [];
  for (var i = 0; i <= GENERATED_CARDS_AMOUNT; i++) {
    cardItem.push({
      'avatar': 'photos/' + parseInt(Math.random() * GENERATED_CARDS_AMOUNT + 1, DECIMAL_SYSTEM) + '.jpg',
      'description': getRandomElement(descriptionList),
      'likes': getLikeCounter(15, 200),
      'comments': getUserComment()
    });
  }
  return cardItem;
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = new DocumentFragment();
var cards = getCardsGen();

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
var photoPreviewImg = photoPreview.querySelector('img');
var photoEffectList = document.querySelector('.img-upload__effects');
var photoEffectItem = photoEffectList.children;
var effectPin = document.querySelector('.effect-level__pin');


var addPhotoEffect = function (evt) {
  photoPreviewImg.classList.add('effects__preview--' + evt.target.value);
};

photoEffectList.addEventListener('change', addPhotoEffect);

effectPin.addEventListener('mouseup', function(evt) {

});
