$ideaTitleInput = $('#ideaTitleInput');
$ideaBodyInput = $('#ideaBodyInput');
$ideaSaveButton = $('#ideaSaveButton');

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
});

function ping() {
  console.log('ping');
};





// Unassigned
// function Idea(id,title,body,quality) {
//   this.id = id;
//   this.title = title;
//   this.body = body;
//   this.quality = quality;
// };
//
