var $ideaTitleInput = $('#idea-title-input');
var $ideaBodyInput = $('#idea-body-input');
var $ideaSaveButton = $('#idea-save-button');
var $ideaList = $('#idea-list');
var ideaIndex = [];

setIdeaIndex();
getIdeas();

function setIdeaIndex() {
  if (localStorage.getItem('ideaIndex') === null) {
    localStorage.setItem('ideaIndex',JSON.stringify([]));
  } else {
    ideaIndex = JSON.parse(localStorage.getItem('ideaIndex'));
  }
};

function getIdeas() {
  for (var i = 0; i < ideaIndex.length; i++) {
    var parsedIdea = JSON.parse(localStorage.getItem(ideaIndex[i]));
    var compiledIdea = createIdea(parsedIdea.title, parsedIdea.body, parsedIdea.quality, parsedIdea.id);
    $ideaList.prepend(compiledIdea);
  }
};

function createIdea(ideaTitle, ideaBody, ideaQuality, ideaId) {
  return $('<article id="' + ideaId + '" class="idea"><h3 class="idea-title">' + ideaTitle + '</h3><div class="delete-idea-button"></div><p class="idea-body">' + ideaBody + '</p><div class="idea-quality-container"><div class="idea-promote-button"></div><div class="idea-demote-button"></div><p class="ideaQuality"><span class="idea-quality-label">quality: </span><span class="idea-quality-value">' + ideaQuality + '</span></p></div></article>');
};

$('#idea-title-input, #idea-body-input').on('keyup', function() {
  setSaveButtonStatus();
});

function setSaveButtonStatus () {
  if($ideaTitleInput.val() === '' || $ideaBodyInput.val() === '') {
    $ideaSaveButton.prop('disabled', true);
  } else {
    $ideaSaveButton.prop('disabled', false);
  };
};

$ideaSaveButton.on('click', function() {
  var id = Date.now();
  ideaIndex.push(id);
  localStorage.setItem('ideaIndex',JSON.stringify(ideaIndex));

  var idea = {
    id: id,
    quality: 'swill',
    title: $ideaTitleInput.val(),
    body: $ideaBodyInput.val()
  }

  localStorage.setItem(id,JSON.stringify(idea));
  setIdeaIndex();
  getIdeas();
  clearInputFields();
  setSaveButtonStatus();
});

function clearInputFields() {
  $ideaTitleInput.val('');
  $ideaBodyInput.val('');
};

$(document).on('click', '.delete-idea-button', function () {
  console.log($(this).parent().prop('id'));
  var thisId = $(this).parent().prop('id');
  localStorage.removeItem(thisId);
  localStorage.setItem('ideaIndex',JSON.stringify(ideaIndex.splice( $.inArray(thisId, ideaIndex), 1 )));
  setIdeaIndex();
  getIdeas();
});
//
// Unassigned
// function Idea(id,title,body,quality) {
//   this.id = id;
//   this.title = title;
//   this.body = body;
//   this.quality = quality;
// };
//
