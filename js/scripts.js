$ideaTitleInput = $('#ideaTitleInput');
$ideaBodyInput = $('#ideaBodyInput');
$ideaSaveButton = $('#ideaSaveButton');
$ideaList = $('#ideaList');

// disable submit button if title or body are missing
$('#ideaTitleInput, #ideaBodyInput').on('keyup', function() {
  if($ideaTitleInput.val() === '' || $ideaBodyInput.val() === '') {
    $ideaSaveButton.prop('disabled', true);
  } else {
    $ideaSaveButton.prop('disabled', false);
  }
});

$ideaSaveButton.on('click', function() {
  console.log('ping');
  var idea = createIdea( $ideaTitleInput.val(), $ideaBodyInput.val() );
  $ideaList.prepend(idea)
});

function ping() {
  console.log('ping');
};

function createIdea(ideaTitle, ideaBody) {
  return $(
    '<article class="idea"><h3 class="ideaTitle">' + ideaTitle +
    '</h3><div class="deleteIdeaButton"></div><p class="ideaBody">' + ideaBody +
    '</p><div class="ideaQualityContainer"><div class="ideaPromoteButton"></div><div class="ideaDemoteButton"></div><p class="ideaQuality"><span class="ideaQualityLabel">quality: </span><span class="ideaQualityValue">swill</span></p></div></article>'
  );
};




// Unassigned
// function Idea(id,title,body,quality) {
//   this.id = id;
//   this.title = title;
//   this.body = body;
//   this.quality = quality;
// };
//
