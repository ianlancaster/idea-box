var ideaBox = {
  ideas: [],
  saveButtonClick: function() {
    this.addIdea();
  },
  addIdea: function() {
    var idea = new Idea();
    this.ideas.push(idea);
  }
};

module.exports = ideaBox;
var Idea = require('./Idea.js');
