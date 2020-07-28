'use strict';

(function () {
  var loadCards = function (cards) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = new DocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      var copyPicture = pictureTemplate.cloneNode(true);
      copyPicture.querySelector('.picture__img').src = cards[i].url;
      copyPicture.querySelector('.picture__likes').textContent = cards[i].likes;
      copyPicture.querySelector('.picture__comments').textContent = cards[i].comments.length;
      fragment.appendChild(copyPicture);
    }

    var pictureList = document.querySelector('.pictures');
    pictureList.appendChild(fragment);
    // console.log('generatedCards', window.gallery.generateCards());
    console.log('loadedCards', cards);
  };
  window.load(loadCards);
})();
