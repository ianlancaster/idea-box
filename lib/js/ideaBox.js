var ideaBox = {
  ideas: [],
  filteredIdeas: [],
  addIdea: function() {
    var idea = new Idea();
    // pass in dom values for idea here
    this.ideas.push(idea);
    this.resetFilteredIdeas();
    this.filterIdeas();
  },
  removeIdea: function(e) {
    var targetIdea = Idea.prototype.returnTargetIdea(e);
    this.ideas = this.ideas.filter(function(idea) {
      return idea != targetIdea;
    });
    this.resetFilteredIdeas();
    this.filterIdeas();
  },
  filterIdeas: function() {
    this.filteredIdeas = [];
    this.ideas.forEach(function(idea) {
      if (idea.title.indexOf(dom.ideaSearchInput.value) > -1 || idea.body.indexOf(dom.ideaSearchInput.value) > -1) {
        this.filteredIdeas.push(idea);
      }
    }, ideaBox);
  },
  resetFilteredIdeas: function() {
    this.filteredIdeas = this.ideas;
  },
  setSaveButtonDisable: function() {
    dom.saveButton.disabled = Boolean(!(dom.ideaTitleInput.value && dom.ideaBodyInput.value));
  },
  clearInputFeilds: function() {
    dom.ideaTitleInput.value = '';
    dom.ideaBodyInput.value = '';
  },
  init: function() {
    this.setSaveButtonDisable();
    this.resetFilteredIdeas();
  },
  saveButtonClick: function() {
    this.addIdea();
    this.clearInputFeilds();
    this.setSaveButtonDisable();
  },
  ideaSearchInputKeyup: function() {
    this.filterIdeas();
  },
  removeIdeaButtonClick: function(e) {
    this.removeIdea(e);
  },
  ideaSubmissionFormKeyup: function() {
    this.setSaveButtonDisable();
  }
};

module.exports = ideaBox;
var Idea = require('./Idea.js');
var dom = require('./dom.js');
