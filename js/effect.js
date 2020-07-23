'use strict';

(function () {
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
  var presentFilterValue = '';

  var oldPhotoEffect = '';

  var addPhotoEffect = function (evt) {
    var currentPhotoEffect = 'effects__preview--' + evt.target.value;
    photoPreview.classList.add(currentPhotoEffect);
    if (oldPhotoEffect !== '') {
      photoPreview.classList.remove(oldPhotoEffect);
    }
    oldPhotoEffect = currentPhotoEffect;

    switch (evt.target.value) {
      case 'none':
        filterType = '';
        filterUnits = '';
        filterMinValue = 0;
        filterMaxValue = 0;
        break;
      case 'chrome':
        filterType = 'grayscale';
        filterUnits = '';
        filterMinValue = 0;
        filterMaxValue = 1;
        break;
      case 'sepia':
        filterType = 'sepia';
        filterUnits = '';
        filterMinValue = 0;
        filterMaxValue = 1;
        break;
      case 'marvin':
        filterType = 'invert';
        filterUnits = '%';
        filterMinValue = 0;
        filterMaxValue = 100;
        break;
      case 'phobos':
        filterType = 'blur';
        filterUnits = 'px';
        filterMinValue = 0;
        filterMaxValue = 3;
        break;
      case 'heat':
        filterType = 'brightness';
        filterUnits = '';
        filterMinValue = 1;
        filterMaxValue = 3;
        break;
    };

    presentFilterValue = (evt.target.value === 'none') ? effectFilter.style.filter = '' :
    effectFilter.style.filter = filterType + '(' + filterMaxValue + filterUnits + ')';
  };

  photoEffectList.addEventListener('change', addPhotoEffect);

  effectPin.addEventListener('mouseup', function(evt) {
   presentFilterValue = (evt.target.value === 'none') ? effectFilter.style.filter = '' :
   effectFilter.style.filter = filterType + '(' + photoEffectProportion() + filterUnits + ')';
  });

  var photoEffectProportion = function () {
    var photoEffectAttitude = (filterMaxValue - filterMinValue) / (filterWidth.clientWidth / filterCheckWidth.clientWidth) + filterMinValue;
    return photoEffectAttitude;
  };
})();
