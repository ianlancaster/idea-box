$ideaTitleInput = $('#ideaTitleInput');
$ideaBodyInput = $('#ideaBodyInput');
$ideaSaveButton = $('#ideaSaveButton');
$ideaList = $('#ideaList');

checkIdeaIndex();

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

  var idea = {
    id: id,
    quality: quality,
    title: title,
    body: body
  }

  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(id,stringifiedIdea);
  var gotIdea= localStorage.getItem(id);
  var parsedIdea = JSON.parse(gotIdea);
  var compiledIdea = createIdea(parsedIdea.title, parsedIdea.body, parsedIdea.quality);
  $ideaList.prepend(compiledIdea);

  clearInputFields();
  setSaveButtonStatus();
});

function getIdeas() {

  // var ideaIndex[] =
  //This will need to run on page load:
  //if ideaIndex array exists in localStorage, get the array
  //else create and empty array to prevent an error from the push to ideaIndex array then push to localStorage

  var gotIdea= localStorage.getItem(id);
  var parsedIdea = JSON.parse(gotIdea);
  var compiledIdea = createIdea(parsedIdea.title, parsedIdea.body, parsedIdea.quality);
  $ideaList.prepend(compiledIdea);
};

var ideaIndex

function checkIdeaIndex() {
  if (localStorage.getItem('ideaIndex') === null) {
    localStorage.setItem('ideaIndex',JSON.stringify([]));
  } else {
    ideaIndex = JSON.parse(localStorage.getItem('ideaIndex'));
  }
};

// $ideaSaveButton.on('click', function() {
//   console.log('ping');
//   var idea = createIdea( $ideaTitleInput.val(), $ideaBodyInput.val() );
//   $ideaList.prepend(idea);
//   clearInputFields();
//   setSaveButtonStatus();
// });

function ping() {
  console.log('ping');
};

function createIdea(ideaTitle, ideaBody, ideaQuality) {
  return $(
    '<article class="idea"><h3 class="ideaTitle">' + ideaTitle +
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
