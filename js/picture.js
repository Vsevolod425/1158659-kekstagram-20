'use strict';

(function () {
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
})();
