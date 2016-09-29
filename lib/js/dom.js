var dom = {
  ideaTitleInput : document.querySelector('#idea-title-input'),
  ideaBodyInput : document.querySelector('#idea-body-input'),
  saveButton : document.querySelector('#idea-save-button'),
  ideaList : document.querySelector('#idea-list'),
  ideaSubmissionForm: document.querySelector('#idea-submission-form'),
  parents : function (elem, selector) {
    var parents = [];
    var firstChar;
    if ( selector ) {
        firstChar = selector.charAt(0);
    }
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( selector ) {
            if ( firstChar === '.' ) {
                if ( elem.classList.contains( selector.substr(1) ) ) {
                    parents.push( elem );
                }
            }
            if ( firstChar === '#' ) {
                if ( elem.id === selector.substr(1) ) {
                    parents.push( elem );
                }
            }
            if ( elem.tagName.toLowerCase() === selector ) {
                parents.push( elem );
            }
        } else {
            parents.push( elem );
        }
    }
    if ( parents.length === 0 ) {
        return null;
    } else {
        return parents;
    }
  }
};

window.addEventListener('load', function(){
  controller.init();
});

dom.ideaSubmissionForm.addEventListener('keyup', function () {
  ideaBox.ideaSubmissionFormKeyup();
});

dom.saveButton.addEventListener('click', function (e) {
  e.preventDefault();
  ideaBox.saveButtonClick();
  controller.saveButtonClick();
});

dom.ideaList.addEventListener('click', function(e){
  if(e.target && e.target.className === 'delete-idea-button'){
    ideaBox.removeIdeaButtonClick(e);
    controller.removeIdeaButtonClick();
  }
});

dom.ideaList.addEventListener('click', function(e){
  if(e.target && e.target.className === 'idea-promote-button'){
    Idea.prototype.ideaPromoteButtonClick(e);
    controller.ideaPromoteButtonClick();
  }
});

dom.ideaList.addEventListener('click', function(e){
  if(e.target && e.target.className === 'idea-demote-button'){
    Idea.prototype.ideaDemoteButtonClick(e);
    controller.ideaDemoteButtonClick();
  }
});

dom.ideaList.addEventListener('keyup', function(e){
  if(e.target && e.target.className === 'idea-title'){
    Idea.prototype.ideaTitleKeyup(e);
    controller.ideaTitleKeyup();
  }
});

dom.ideaList.addEventListener('keyup', function(e){
  if(e.target && e.target.className === 'idea-body'){
    Idea.prototype.ideaBodyKeyup(e);
    controller.ideaBodyKeyup();
  }
});

module.exports = dom;
var ideaBox = require('./ideaBox.js');
var Idea = require('./Idea.js');
var controller = require('./controller.js');
