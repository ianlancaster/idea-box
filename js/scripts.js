var $ideaTitleInput = $('#idea-title-input');
var $ideaBodyInput = $('#idea-body-input');
var $ideaSaveButton = $('#idea-save-button');
var $ideaSearchInput = $('#idea-search-input');
var $ideaList = $('#idea-list');

$('#idea-title-input, #idea-body-input').on('keyup', function() {
  setSaveButtonStatus();
});

$ideaSaveButton.on('click', function() {
  ideaList.add();
  $ideaTitleInput.val('');
  $ideaBodyInput.val('');
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

$(document).on('keyup', '#idea-search-input', function(){
  var searchValue = $(this).val();
  if (searchValue) {
    ideaList.search(searchValue);
  } else {
    ideaList.retreive();
    ideaList.render();
  };
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
  search: function(searchValue) {
    var matches = [];
    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    this.ideas.forEach(function(idea) {
      if (idea.title.indexOf(searchValue) > -1) {
        matches.push(idea);
      };
      if (idea.body.indexOf(searchValue) > -1 && idea.body.indexOf(searchValue) !== idea.title.indexOf(searchValue)) {
        matches.push(idea);
      };
    });
    var sortedIdeasId = matches.sort(function(a, b) {
      return b.id-a.id;
    });
    $ideaList.html(sortedIdeasId.map(function (match) {
      return match.toHTML();
    }));
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
      var sortedIdeasId = this.ideas.sort(function(a, b) {
        return b.id-a.id
      });
      $ideaList.html(sortedIdeasId.map(function (idea) {
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
    var searchValue = $ideaSearchInput.val();
    if (this.quality === 'plausible') {
      this.quality = 'genius';
    }
    if (this.quality === 'swill') {
      this.quality = 'plausible';
    }
    ideaList.store();
    ideaList.search(searchValue);
  },
  qualityDown: function () {
    var searchValue = $ideaSearchInput.val();
    if (this.quality === 'plausible') {
      this.quality = 'swill';
    }
    if (this.quality === 'genius') {
      this.quality = 'plausible'
    }
    ideaList.store();
    ideaList.search(searchValue);
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
