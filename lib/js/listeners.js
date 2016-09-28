var dom = {
  ideaTitleInput : document.querySelector('#idea-title-input'),
  ideaBodyInput : document.querySelector('#idea-body-input'),
  saveButton : document.querySelector('#idea-save-button'),
  ideaList : document.querySelector('#idea-list')
};

dom.saveButton.addEventListener('click', function (e) {
  e.preventDefault();
  ideaBox.saveButtonClick();
  controller.saveButtonClick();
});

window.addEventListener('load', function(){
  controller.init();
});

module.exports = dom;
var ideaBox = require('./ideaBox.js');
var Idea = require('./Idea.js');
var controller = require('./controller.js');
