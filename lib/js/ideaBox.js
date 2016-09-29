var ideaBox = {
  ideas: [],
  filteredIdeas: [],
  addIdea: function() {
    var idea = new Idea();
    this.ideas.push(idea);
    this.resetFilteredIdeas();
  },
  removeIdea: function(e) {
    var targetIdea = Idea.prototype.returnTargetIdea(e);
    this.ideas = this.ideas.filter(function(idea) {
      return idea != targetIdea;
    });
    this.resetFilteredIdeas();
  },
  setSaveButtonDisable: function() {
    dom.saveButton.disabled = Boolean(!(dom.ideaTitleInput.value && dom.ideaBodyInput.value));
  },
  clearInputFeilds: function() {
    dom.ideaTitleInput.value = '';
    dom.ideaBodyInput.value = '';
  },
  filterIdeas: function() {
    this.filteredIdeas = this.filteredIdeas;
  },
  resetFilteredIdeas: function() {
    this.filteredIdeas = this.ideas;
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
