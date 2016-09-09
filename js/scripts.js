var $ideaTitleInput = $('#idea-title-input');
var $ideaBodyInput = $('#idea-body-input');
var $ideaSaveButton = $('#idea-save-button');

var $ideaList = $('#idea-list');

$('#idea-title-input, #idea-body-input').on('keyup', function() {
  setSaveButtonStatus();
});

$ideaSaveButton.on('click', function() {
  ideas.add();
  ideas.store();
  ideas.render();
};



function setSaveButtonStatus () {
  var enableDisableButton = ($ideaTitleInput.val() === '' || $ideaBodyInput.val() === '');
    $ideaSaveButton.prop('disabled', enableDisableButton);
}


var ideaList = {
  ideas: [],

  add: function () {
    this.ideas.push(new Idea(title, body));
  },
  remove: function () {},
  find: function () {},
  store: function () {
    localStorage.setItem('ideas', JSON.stringify(this.ideas));
  },
  retreive: function () {},
  render: function () {
    $ideaList.html(this.ideas.map(function (idea) {
      return idea.toHTML();
    }));
  }
};

function Idea(title, body, quality, id) {
  this.title = title;
  this.body = body;
  this.quality = quality || 'swill';
  this.id = id || Date.now();
};

Idea.prototype = {
  qualityUp: function () {},
  qualityDown: function () {},
  remove: function () {},
  toHTML: function () {
    return $('<article id="' + this.id + '" class="idea"><h3 class="idea-title">' + this.title + '</h3><div class="delete-idea-button"></div><p class="idea-body">' + this.body + '</p><div class="idea-quality-container"><div class="idea-promote-button"></div><div class="idea-demote-button"></div><p class="ideaQuality"><span class="idea-quality-label">quality: </span><span class="idea-quality-value">' + this.quality + '</span></p></div></article>');
  };
}
