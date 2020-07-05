'use strict';

var DECIMAL_SYSTEM = 10;
var GENERATED_CARDS_AMOUNT = 25;
var GENERATED_COMENTS_AMOUNT = 4;
var MAX_RATIO = 1;

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
  var cards = [];
  for (var i = 0; i <= GENERATED_COMENTS_AMOUNT; i++) {
    cards.push(
        {
          avatar: 'img/avatar - ' + Math.random() * userComments.length + '.svg',
          message: getRandomElement(userComments),
          name: getRandomElement(userNames)
        });
  }
  return cards;
};

var getLikeCounter = function (min, max) {
  var count = Math.random() * (max - min);
  return parseInt(count + 1, DECIMAL_SYSTEM);
};

var generateCards = function () {
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
var cards = generateCards();

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
var effectFilter = document.querySelector('.img-upload__preview');
var filterWidth = document.querySelector('.effect-level__line');
var filterCheckWidth = document.querySelector('.effect-level__depth');
var filterType = '';
var filterUnits = '';
var filterMinValue = 0;
var filterMaxValue = 0;

var oldPhotoEffect = '';

var addPhotoEffect = function (evt) {
  var currentPhotoEffect = 'effects__preview--' + evt.target.value;
  photoPreview.classList.add(currentPhotoEffect);
  if (oldPhotoEffect !== '') {
    photoPreview.classList.remove(oldPhotoEffect);
  }
  oldPhotoEffect = currentPhotoEffect;

  if (evt.target.value === 'none') {
    filterType = '';
    filterUnits = '';
    filterMinValue = 0;
    filterMaxValue = 0;
  } else if (evt.target.value === 'chrome') {
    filterType = 'grayscale';
    filterUnits = '';
    filterMinValue = 0;
    filterMaxValue = 1;
  } else if (evt.target.value === 'sepia') {
    filterType = 'sepia';
    filterUnits = '';
    filterMinValue = 0;
    filterMaxValue = 1;
  } else if (evt.target.value === 'marvin') {
    filterType = 'invert';
    filterUnits = '%';
    filterMinValue = 0;
    filterMaxValue = 100;
  } else if (evt.target.value === 'phobos') {
    filterType = 'blur';
    filterUnits = 'px';
    filterMinValue = 0;
    filterMaxValue = 3;
  } else if (evt.target.value === 'heat') {
    filterType = 'brightness';
    filterUnits = '';
    filterMinValue = 1;
    filterMaxValue = 3;
  };

  if (evt.target.value === 'none') {
    effectFilter.style.filter = '';
  } else {
    effectFilter.style.filter = filterType + '(' + filterMaxValue + filterUnits + ')';
  }
};

photoEffectList.addEventListener('change', addPhotoEffect);

effectPin.addEventListener('mouseup', function(evt) {
  console.log(photoEffectProportion());
  if (evt.target.value === 'none') {
    effectFilter.style.filter = '';
  } else {
    effectFilter.style.filter = filterType + '(' + photoEffectProportion() + filterUnits + ')';
  }
});

var photoEffectProportion = function () {
  var photoEffectAttitude = (filterMaxValue - filterMinValue) / (filterWidth.clientWidth / filterCheckWidth.clientWidth) + filterMinValue;
  return photoEffectAttitude;
};
