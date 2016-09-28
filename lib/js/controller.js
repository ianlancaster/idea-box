var controller = {
  renderDomFromModel: function() {
    var ideaListHtml = '';
    ideaBox.ideas.forEach(function(idea) {
      ideaListHtml = idea.toHTML() + ideaListHtml;
    });
    dom.ideaList.innerHTML = ideaListHtml;
  },
  setModelFromLs: function() {
    var retreivedIdeas = JSON.parse(localStorage.getItem('ideas'));
    if (retreivedIdeas) {
      ideaBox.ideas = retreivedIdeas.map(function (idea){
        return new Idea(idea.title, idea.body, idea.quality, idea.id);
      });
    }
  },
  setLsFromModel: function() {
    localStorage.setItem('ideas', JSON.stringify(ideaBox.ideas));
  },
  init: function() {
    this.setModelFromLs();
    this.renderDomFromModel();
  },
  saveButtonClick: function() {
    this.renderDomFromModel();
    this.setLsFromModel();
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
    this.renderDomFromModel();
    this.setLsFromModel();
  },
  ideaBodyKeyup: function() {
    this.renderDomFromModel();
    this.setLsFromModel();
  }
};

module.exports = controller;
var ideaBox = require('./ideaBox.js');
var dom = require('./dom.js');
var Idea = require('./Idea.js');
