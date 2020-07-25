'use strict';

(function () {
  var hashTagsInput = document.querySelector('.text__hashtags');
  var hashTagsInputValue = hashTagsInput.value;
  var hashTags = hashTagsInputValue.split(' ');
  for (var i = 0; i < hashTags.length; i++) {
    var currentHashTag = hashTags[i];
    var isHashtagValid = currentHashTag[0] === '#';
    var isHashtagShort = currentHashTag.length > 1;
    var hashTagMaxLength = currentHashTag.length < 20;
    var hasHashtagMultipleSharps = currentHashTag.split('#').length > 2;
  }
  var isTooFewHashtags = hashTags.length < 5;
})();
