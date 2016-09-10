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

$(document).on('click', '.idea-promote-button', function () {
  var thisId = parseInt($(this).parents('.idea').prop('id'));
  ideaList.find(thisId).qualityUp();
});

$(document).on('click', '.idea-demote-button', function () {
  var thisId = parseInt($(this).parents('.idea').prop('id'));
  ideaList.find(thisId).qualityDown();
});

$(document).on('keyup', '.idea-body', function(){
  var thisId = parseInt($(this).parents('.idea').prop('id'));
  var body = $(this).val();
  ideaList.find(thisId).updateBody(body);
});

$(document).on('keyup', '.idea-title', function(){
  var thisId = parseInt($(this).parents('.idea').prop('id'));
  var title = $(this).val();
  ideaList.find(thisId).updateTitle(title);
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
    this.render();

  },
  remove: function (id) {
    id = parseInt(id);
    this.ideas = this.ideas.filter(function (idea) {
      return idea.id !== id;
    });
    this.store();
    this.render();
  },
  find: function (id) {
    return this.ideas.find(function (idea) {
      return idea.id === id;
    });
  },
  store: function () {
    localStorage.setItem('ideas', JSON.stringify(this.ideas));
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
      // Ref: http://www.w3schools.com/jsref/jsref_sort.asp
      var sortedIdeasID = this.ideas.sort(function(a, b) {
        return b.id-a.id
      });
      $ideaList.html(sortedIdeasID.map(function (idea) {
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
    if (this.quality === 'plausible') {
      this.quality = 'genius';
    }
    if (this.quality === 'swill') {
      this.quality = 'plausible';
    }
    ideaList.store();
    this.render();
  },
  qualityDown: function () {
    //  (“genius” → “plausible”, “plausible” → “swill”)
    if (this.quality === 'plausible') {
      this.quality = 'swill';
    }
    if (this.quality === 'genius') {
      this.quality = 'plausible'
    }
    ideaList.store();
    this.render();
  },
  toHTML: function () {
    return $(
      '<article id="'
      + this.id +
      '" class="idea"><input type="text" class="idea-title" value="'
      + this.title +
      '"><div class="delete-idea-button"></div><input type="text" class="idea-body" value="'
      + this.body +
      '"><div class="idea-promote-button"></div><div class="idea-demote-button"></div><p class="idea-quality"><span class="idea-quality-label">quality: </span><span class="idea-quality-value">'
      + this.quality +
      '</span></p></article>');
  },
  updateBody: function(body) {
    this.body = body;
    ideaList.store();
  },
  updateTitle: function(title) {
    this.title = title;
    ideaList.store();
  }
}

ideaList.retreive();
ideaList.render();
