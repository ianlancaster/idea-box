var ideaBox = {
  ideas: [],
  addIdea: function() {
    var idea = new Idea();
    this.ideas.push(idea);
  },
  removeIdea: function(e) {
    var targetIdea = Idea.prototype.returnTargetIdea(e);
    this.ideas = this.ideas.filter(function(idea) {
      return idea != targetIdea;
    });
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
  },
  saveButtonClick: function() {
    this.addIdea();
    this.clearInputFeilds();
    this.setSaveButtonDisable();
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
