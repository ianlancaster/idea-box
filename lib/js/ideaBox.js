var ideaBox = {
  ideas: [],
  saveButtonClick: function() {
    this.addIdea();
  },
  addIdea: function() {
    var idea = new Idea();
    this.ideas.push(idea);
  },
  removeIdeaButtonClick: function(e) {
    this.removeIdea(e);
  },
  removeIdea: function(e) {
    var targetIdeaId = ((dom.parents(e.target, '.idea')[0]).id);
    this.ideas = this.ideas.filter(function(idea) {
      return idea.id != targetIdeaId;
    });
  }
};

module.exports = ideaBox;
var Idea = require('./Idea.js');
var dom = require('./dom.js');
