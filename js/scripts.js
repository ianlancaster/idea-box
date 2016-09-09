var $ideaTitleInput = $('#idea-title-input');
var $ideaBodyInput = $('#idea-body-input');
var $ideaSaveButton = $('#idea-save-button');

var $ideaList = $('#idea-list');

$('#idea-title-input, #idea-body-input').on('keyup', function() {
  setSaveButtonStatus();
});

$ideaSaveButton.on('click', function() {
  ideaList.add();
});

$(document).on('click', '.delete-idea-button', function () {
  var thisId = $(this).parents().prop('id');
  ideaList.remove(thisId);
});

$(document).on('click', '.idea-promote-button',
function () {
  var thisId = parseInt($(this).parents('.idea').prop('id'));
  console.log(thisId);
  console.log($(this).parents('.idea').prop('id'));
  console.log(ideaList.find(thisId));
  ideaList.find(thisId).qualityUp();
});

function returnIdeaTitle () {
  return $ideaTitleInput.val();
};

function returnIdeaBody () {
  return $ideaBodyInput.val();
};

function setSaveButtonStatus () {
  var enableDisableButton = ($ideaTitleInput.val() === '' || $ideaBodyInput.val() === '');
    $ideaSaveButton.prop('disabled', enableDisableButton);
}


var ideaList = {
  ideas: [],

  add: function () {
    this.ideas.push(new Idea(returnIdeaTitle(), returnIdeaBody()));
    this.store();
  },
  remove: function (id) {
    id = parseInt(id);
    this.ideas = this.ideas.filter(function (idea) {
      return idea.id !== id;
    });
    this.store();
  },
  find: function () {},
  store: function () {
    localStorage.setItem('ideas', JSON.stringify(this.ideas));
    this.render();
  },
  retreive: function () {
    var retreivedIdeas = JSON.parse(localStorage.getItem('ideas'));
    if (retreivedIdeas) {
      this.ideas = retreivedIdeas.map(function (idea){
        return new Idea(idea.title, idea.body, idea.quality, idea.id);
      });
    }
  },
  render: function () {
    $ideaList.html(this.ideas.map(function (idea) {
      return idea.toHTML()
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
  qualityUp: function () {
    // (“swill” → “plausible”, “plausible” → “genius”)
    if (this.quality = 'swill') {
      this.quality = 'plausible';
    }
    if (this.quality = 'plausible') {
      this.quality = 'genius';
    }
    ideaList.store();
  },
  qualityDown: function () {
    //  (“genius” → “plausible”, “plausible” → “swill”).
  },
  toHTML: function () {
    return $('<article id="' + this.id + '" class="idea"><h3 class="idea-title">' + this.title + '</h3><div class="delete-idea-button"></div><p class="idea-body">' + this.body + '</p><div class="idea-quality-container"><div class="idea-promote-button"></div><div class="idea-demote-button"></div><p class="ideaQuality"><span class="idea-quality-label">quality: </span><span class="idea-quality-value">' + this.quality + '</span></p></div></article>');
  }
}

ideaList.retreive();
ideaList.render();
