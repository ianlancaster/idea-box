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
        <h3 class="idea-title">${this.title}</h3>
        <div class="delete-idea-button"></div>
        <p class="idea-body">${this.body}</p>
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
  promoteQuality: function() {},
  demoteQuality: function() {},
  updateBody: function() {},
  updateTitle: function() {}
};

module.exports = Idea;
var dom = require('./listeners.js');
var controller = require('./controller.js');
