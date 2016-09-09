var $ideaTitleInput = $('#idea-title-input');
var $ideaBodyInput = $('#idea-body-input');
var $ideaSaveButton = $('#idea-save-button');

$('#idea-title-input, #idea-body-input').on('keyup', function() {
  setSaveButtonStatus();
});

function setSaveButtonStatus () {
  var enableDisableButton = ($ideaTitleInput.val() === '' || $ideaBodyInput.val() === '');
    $ideaSaveButton.prop('disabled', enableDisableButton);
}
var ideaList = {
  ideas: [],

  add: function () {},
  remove: function () {},
  find: function () {},
  store: function () {},
  retreive: function () {},
  render: function () {}
};

function Idea(id,title,body,quality) {
  this.id = id || Date.now();
  this.title = title;
  this.body = body;
  this.quality = quality || 'swill';
};

Idea.prototype = {
  qualityUp: function () {},
  qualityDown: function () {},
  remove: function () {},
  toHTML: function () {}
}
