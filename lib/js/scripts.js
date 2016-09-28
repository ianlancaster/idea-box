//turn all into js object. try to export. separate event listener
var object = {
  ideaTitleInput : document.querySelector('#idea-title-input'),
  ideaBodyInput : document.querySelector('#idea-body-input'),
  saveButton : document.querySelector('#idea-save-button'),
  ideaList : document.querySelector('#idea-list'),
  addElement: function(title, body, quality) {
    var title = title || 'Example Idea';
    var body = body || 'Default idea description';
    var quality = quality || 'swill';
    var idea = document.createElement('article');
    idea.className = 'idea';
    idea.innerHTML = `
      <h3 class="idea-title">${title}</h3>
      <div class="delete-idea-button"></div>
      <p class="idea-body">${body}</p>
      <div class="idea-quality-container">
        <div class="idea-promote-button"></div>
        <div class="idea-demote-button"></div>
        <p class="idea-quality">
          <span class="idea-quality-label">quality: </span><span class="idea-quality-value">${quality}</span>
        </p>
      </div>
    `;
    this.ideaList.appendChild(idea);
  }
};

module.exports = object;
