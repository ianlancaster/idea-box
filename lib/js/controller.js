var controller = {
  renderDomFromModel: function() {
    var ideaListHtml = '';
    ideaBox.filteredIdeas.forEach(function(idea) {
      ideaListHtml = idea.toHTML() + ideaListHtml;
    });
    // only place where dom is used. Reach out on own and eliminate dependancy
    dom.ideaList.innerHTML = ideaListHtml;
  },
  setModelFromLs: function() {
    var retreivedIdeas = JSON.parse(localStorage.getItem('ideas'));
    if (retreivedIdeas) {
      // create method to populate ideas eliminate need for Idea import
      ideaBox.ideas = retreivedIdeas.map(function (asdf){
        return new Idea(asdf.title, asdf.body, asdf.quality, asdf.id);
      });
    }
  },
  setLsFromModel: function() {
    localStorage.setItem('ideas', JSON.stringify(ideaBox.filteredIdeas));
  },
  init: function() {
    this.setModelFromLs();
    ideaBox.init();
    this.renderDomFromModel();
  },
  saveButtonClick: function() {
    this.renderDomFromModel();
    this.setLsFromModel();
  },
  ideaSearchInputKeyup: function() {
    this.renderDomFromModel();
  },
  removeIdeaButtonClick: function() {
    this.renderDomFromModel();
    this.setLsFromModel();
  },
  ideaPromoteButtonClick: function() {
    this.renderDomFromModel();
    this.setLsFromModel();
  },
  ideaDemoteButtonClick: function() {
    this.renderDomFromModel();
    this.setLsFromModel();
  },
  ideaTitleKeyup: function() {
    this.setLsFromModel();
  },
  ideaBodyKeyup: function() {
    this.setLsFromModel();
  }
};

module.exports = controller;
var ideaBox = require('./ideaBox.js');
var dom = require('./dom.js');
var Idea = require('./Idea.js');
