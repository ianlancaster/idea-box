function Idea(title, body, quality, id) {
  this.title = title || dom.ideaTitleInput.value;
  this.body = body || dom.ideaBodyInput.value;
  this.quality = quality || 'swill';
  this.id = id || Date.now();
}

Idea.prototype = {
  toHTML: function() {
    return `
      <article class="idea" id="${this.id}">
        <h3 class="idea-title" contenteditable="true">${this.title}</h3>
        <div class="delete-idea-button"></div>
        <p class="idea-body" contenteditable="true">${this.body}</p>
        <div class="idea-quality-container">
          <div class="idea-promote-button"></div>
          <div class="idea-demote-button"></div>
          <p class="idea-quality">
            <span class="idea-quality-label">quality: </span><span class="idea-quality-value">${this.quality}</span>
          </p>
        </div>
      </article>
    `;
  },
  returnTargetIdea: function(e) {
    var targetIdeaId = (dom.parents(e.target, '.idea')[0]).id;
    var targetIdea = ideaBox.ideas.find(function(idea) {
      return (idea.id == targetIdeaId);
    });
    return targetIdea;
  },
  promoteQuality: function(e) {
    var targetIdea = this.returnTargetIdea(e);
    switch(targetIdea.quality) {
        case 'swill':
            targetIdea.quality = 'plausible';
            break;
        case 'plausible':
            targetIdea.quality = 'genius';
            break;
        default:
    }
  },
  demoteQuality: function(e) {
    var targetIdea = this.returnTargetIdea(e);
    switch(targetIdea.quality) {
        case 'genius':
            targetIdea.quality = 'plausible';
            break;
        case 'plausible':
            targetIdea.quality = 'swill';
            break;
        default:
    }
  },
  updateBody: function(e) {
    var targetIdea = this.returnTargetIdea(e);
    targetIdea.body = e.path[0].innerText;
  },
  updateTitle: function(e) {
    var targetIdea = this.returnTargetIdea(e);
    targetIdea.title = e.path[0].innerText;
  },
  ideaPromoteButtonClick: function(e) {
    this.promoteQuality(e);
  },
  ideaDemoteButtonClick: function(e) {
    this.demoteQuality(e);
  },
  ideaTitleKeyup: function(e) {
    this.updateTitle(e);
  },
  ideaBodyKeyup: function(e) {
    this.updateBody(e);
  }
};

module.exports = Idea;
var dom = require('./dom.js');
var controller = require('./controller.js');
var ideaBox = require('./ideaBox.js');
