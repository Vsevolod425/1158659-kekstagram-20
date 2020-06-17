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

var randomComment = function () {
  for (var i = 0; i <= userComments.length; i++) {
    var userComment = Math.random() * userComments.length;
  }
  return userComment;
};

var randomName = function () {
  for (var i = 0; i <= userNames.length; i++) {
    var userName = Math.random() * userNames.length;
  }
  return userName;
};

var userComment = function () {
  var commentObj = [];
  for (var i = 0; i <= 4; i++) {
    commentObj.push(
        {
          avatar: 'img/avatar - ' + Math.random() * 6 + '.svg',
          message: randomComment(),
          name: randomName()
        });
  }
  return commentObj;
};

var cardsGen = function () {
  var cardItem = [];
  for (var i = 0; i <= 25; i++) {
    cardItem.push({
      'avatar': 'photos/' + parseInt(Math.random() * 25, 10) + '.jpg',
      'description': descriptionList[parseInt(Math.random() * descriptionList.length, 10)],
      'likes': likeCounter(15, 200),
      'comments': userComment()
    });
  }
  return cardItem;
};

var likeCounter = function (min, max) {
  var count = Math.random() * (max - min);
  return count;
};
