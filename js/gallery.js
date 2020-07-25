'use strict';

(function () {
  var DECIMAL_SYSTEM = 10;
  var GENERATED_COMENTS_AMOUNT = 4;
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
  window.gallery = {
    generateCards: generateCards
  };
})();
