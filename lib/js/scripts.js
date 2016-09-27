var ideaTitleInput = document.querySelector('#idea-title-input');
var ideaBodyInput = document.querySelector('#idea-body-input');
var saveButton = document.querySelector('#idea-save-button');
var ideaList = document.querySelector('#idea-list');

saveButton.addEventListener('click', function (e) {
  e.preventDefault();
  var title = ideaTitleInput.value;
  var body = ideaBodyInput.value;
  addElement(title,body);
});

function addElement(title, body, quality) {
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
  ideaList.appendChild(idea);
}
