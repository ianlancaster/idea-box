var $ideaTitleInput = $('#ideaTitleInput');
var $ideaBodyInput = $('#ideaBodyInput');
var $ideaSaveButton = $('#ideaSaveButton');
var $ideaList = $('#ideaList');
var ideaIndex = [];

checkIdeaIndex();
getIdeas();

// disable submit button if title or body are missing
$('#ideaTitleInput, #ideaBodyInput').on('keyup', function() {
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
  console.log('ping');
  var id = Date.now();
  var quality = 'swill';
  var title = $ideaTitleInput.val();
  var body = $ideaBodyInput.val();
  ideaIndex.push(id);
  localStorage.setItem('ideaIndex',JSON.stringify(ideaIndex));
  var idea = {
    id: id,
    quality: quality,
    title: title,
    body: body
  }
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(id,stringifiedIdea);
  var gotIdea = localStorage.getItem(id);
  var parsedIdea = JSON.parse(gotIdea);
  var compiledIdea = createIdea(parsedIdea.title, parsedIdea.body, parsedIdea.quality, parsedIdea.id);
  $ideaList.prepend(compiledIdea);
  clearInputFields();
  setSaveButtonStatus();
});

$(document).on('click', '.deleteIdeaButton', function () {
  console.log($(this).parent().prop('id'));
  var thisId = $(this).parent().prop('id');
  localStorage.removeItem(thisId);
  localStorage.setItem('ideaIndex',JSON.stringify(ideaIndex.splice( $.inArray(thisId, ideaIndex), 1 )));
  checkIdeaIndex();
  getIdeas();
});

function getIdeas() {
  var numberOfIdeas = ideaIndex.length;
  for (var i = 0; i < ideaIndex.length; i++) {
    var id = ideaIndex[i];
    var gotIdea = localStorage.getItem(id);
    var parsedIdea = JSON.parse(gotIdea);
    var compiledIdea = createIdea(parsedIdea.title, parsedIdea.body, parsedIdea.quality, parsedIdea.id);
    $ideaList.prepend(compiledIdea);
  };
};

function checkIdeaIndex() {
  if (localStorage.getItem('ideaIndex') === null) {
    localStorage.setItem('ideaIndex',JSON.stringify([]));
  } else {
    ideaIndex = JSON.parse(localStorage.getItem('ideaIndex'));
  }
};


function ping() {
  console.log('ping');
};

function createIdea(ideaTitle, ideaBody, ideaQuality, ideaId) {
  return $(
    '<article id="' + ideaId + '" class="idea"><h3 class="ideaTitle">' + ideaTitle +
    '</h3><div class="deleteIdeaButton"></div><p class="ideaBody">' + ideaBody +
    '</p><div class="ideaQualityContainer"><div class="ideaPromoteButton"></div><div class="ideaDemoteButton"></div><p class="ideaQuality"><span class="ideaQualityLabel">quality: </span><span class="ideaQualityValue">' + ideaQuality + '</span></p></div></article>'
  );
};

function clearInputFields() {
  $ideaTitleInput.val('');
  $ideaBodyInput.val('');
};



// Unassigned
// function Idea(id,title,body,quality) {
//   this.id = id;
//   this.title = title;
//   this.body = body;
//   this.quality = quality;
// };
//
