/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(1);
	var listeners = __webpack_require__(4);
	var ideaBox = __webpack_require__(2);
	var Idea = __webpack_require__(3);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var controller = {
	  renderDomFromModel: function () {
	    var ideaListHtml = '';
	    ideaBox.filteredIdeas.forEach(function (idea) {
	      ideaListHtml = idea.toHTML() + ideaListHtml;
	    });
	    // only place where dom is used. Reach out on own and eliminate dependancy
	    dom.ideaList.innerHTML = ideaListHtml;
	  },
	  setModelFromLs: function () {
	    var retreivedIdeas = JSON.parse(localStorage.getItem('ideas'));
	    if (retreivedIdeas) {
	      // create method to populate ideas eliminate need for Idea import
	      ideaBox.ideas = retreivedIdeas.map(function (asdf) {
	        return new Idea(asdf.title, asdf.body, asdf.quality, asdf.id);
	      });
	    }
	  },
	  setLsFromModel: function () {
	    localStorage.setItem('ideas', JSON.stringify(ideaBox.filteredIdeas));
	  },
	  init: function () {
	    this.setModelFromLs();
	    ideaBox.init();
	    this.renderDomFromModel();
	  },
	  saveButtonClick: function () {
	    this.renderDomFromModel();
	    this.setLsFromModel();
	  },
	  ideaSearchInputKeyup: function () {
	    this.renderDomFromModel();
	  },
	  removeIdeaButtonClick: function () {
	    this.renderDomFromModel();
	    this.setLsFromModel();
	  },
	  ideaPromoteButtonClick: function () {
	    this.renderDomFromModel();
	    this.setLsFromModel();
	  },
	  ideaDemoteButtonClick: function () {
	    this.renderDomFromModel();
	    this.setLsFromModel();
	  },
	  ideaTitleKeyup: function () {
	    this.setLsFromModel();
	  },
	  ideaBodyKeyup: function () {
	    this.setLsFromModel();
	  }
	};

	module.exports = controller;
	var ideaBox = __webpack_require__(2);
	var dom = __webpack_require__(4);
	var Idea = __webpack_require__(3);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var ideaBox = {
	  ideas: [],
	  filteredIdeas: [],
	  addIdea: function () {
	    var idea = new Idea();
	    // pass in dom values for idea here
	    this.ideas.push(idea);
	    this.resetFilteredIdeas();
	    this.filterIdeas();
	  },
	  removeIdea: function (e) {
	    var targetIdea = Idea.prototype.returnTargetIdea(e);
	    this.ideas = this.ideas.filter(function (idea) {
	      return idea != targetIdea;
	    });
	    this.resetFilteredIdeas();
	    this.filterIdeas();
	  },
	  filterIdeas: function () {
	    this.filteredIdeas = [];
	    this.ideas.forEach(function (idea) {
	      var searchInputValue = dom.ideaSearchInput.value.toLowerCase();
	      var ideaTitle = idea.title.toLowerCase();
	      var ideaBody = idea.body.toLowerCase();
	      if (ideaTitle.indexOf(searchInputValue) > -1 || ideaBody.indexOf(searchInputValue) > -1) {
	        this.filteredIdeas.push(idea);
	      }
	    }, ideaBox);
	  },
	  resetFilteredIdeas: function () {
	    this.filteredIdeas = this.ideas;
	  },
	  setSaveButtonDisable: function () {
	    dom.saveButton.disabled = Boolean(!(dom.ideaTitleInput.value && dom.ideaBodyInput.value));
	  },
	  clearInputFeilds: function () {
	    dom.ideaTitleInput.value = '';
	    dom.ideaBodyInput.value = '';
	  },
	  init: function () {
	    this.setSaveButtonDisable();
	    this.resetFilteredIdeas();
	  },
	  saveButtonClick: function () {
	    this.addIdea();
	    this.clearInputFeilds();
	    this.setSaveButtonDisable();
	  },
	  ideaSearchInputKeyup: function () {
	    this.filterIdeas();
	  },
	  removeIdeaButtonClick: function (e) {
	    this.removeIdea(e);
	  },
	  ideaSubmissionFormKeyup: function () {
	    this.setSaveButtonDisable();
	  }
	};

	module.exports = ideaBox;
	var Idea = __webpack_require__(3);
	var dom = __webpack_require__(4);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	function Idea(title, body, quality, id) {
	  this.title = title || dom.ideaTitleInput.value;
	  this.body = body || dom.ideaBodyInput.value;
	  this.quality = quality || 'swill';
	  this.id = id || Date.now();
	}

	Idea.prototype = {
	  toHTML: function () {
	    return `
	      <article class="idea" id="${ this.id }">
	        <h3 class="idea-title" contenteditable="true">${ this.title }</h3>
	        <div class="delete-idea-button"></div>
	        <p class="idea-body" contenteditable="true">${ this.body }</p>
	        <div class="idea-quality-container">
	          <div class="idea-promote-button"></div>
	          <div class="idea-demote-button"></div>
	          <p class="idea-quality">
	            <span class="idea-quality-label">quality: </span><span class="idea-quality-value">${ this.quality }</span>
	          </p>
	        </div>
	      </article>
	    `;
	  },
	  returnTargetIdea: function (e) {
	    // move parents selector here to remove dom dependancy
	    // this method may be better of as part of the ideaBox. Would remove file dependancy
	    var targetIdeaId = dom.parents(e.target, '.idea')[0].id;
	    var targetIdea = ideaBox.ideas.find(function (idea) {
	      return idea.id == targetIdeaId;
	    });
	    return targetIdea;
	  },
	  promoteQuality: function (e) {
	    var targetIdea = this.returnTargetIdea(e);
	    switch (targetIdea.quality) {
	      case 'swill':
	        targetIdea.quality = 'plausible';
	        break;
	      case 'plausible':
	        targetIdea.quality = 'genius';
	        break;
	      default:
	    }
	  },
	  demoteQuality: function (e) {
	    var targetIdea = this.returnTargetIdea(e);
	    switch (targetIdea.quality) {
	      case 'genius':
	        targetIdea.quality = 'plausible';
	        break;
	      case 'plausible':
	        targetIdea.quality = 'swill';
	        break;
	      default:
	    }
	  },
	  updateBody: function (e) {
	    var targetIdea = this.returnTargetIdea(e);
	    targetIdea.body = e.path[0].innerText;
	  },
	  updateTitle: function (e) {
	    var targetIdea = this.returnTargetIdea(e);
	    targetIdea.title = e.path[0].innerText;
	  },
	  ideaPromoteButtonClick: function (e) {
	    this.promoteQuality(e);
	  },
	  ideaDemoteButtonClick: function (e) {
	    this.demoteQuality(e);
	  },
	  ideaTitleKeyup: function (e) {
	    this.updateTitle(e);
	  },
	  ideaBodyKeyup: function (e) {
	    this.updateBody(e);
	  }
	};

	module.exports = Idea;
	var dom = __webpack_require__(4);
	var ideaBox = __webpack_require__(2);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var dom = {
	  ideaTitleInput: document.querySelector('#idea-title-input'),
	  ideaBodyInput: document.querySelector('#idea-body-input'),
	  saveButton: document.querySelector('#idea-save-button'),
	  ideaList: document.querySelector('#idea-list'),
	  ideaSubmissionForm: document.querySelector('#idea-submission-form'),
	  ideaSearchInput: document.querySelector('#idea-search-input'),
	  parents: function (elem, selector) {
	    // recreation of jQuery .parents() method
	    var parents = [];
	    var firstChar;
	    if (selector) {
	      firstChar = selector.charAt(0);
	    }
	    for (; elem && elem !== document; elem = elem.parentNode) {
	      if (selector) {
	        if (firstChar === '.') {
	          if (elem.classList.contains(selector.substr(1))) {
	            parents.push(elem);
	          }
	        }
	        if (firstChar === '#') {
	          if (elem.id === selector.substr(1)) {
	            parents.push(elem);
	          }
	        }
	        if (elem.tagName.toLowerCase() === selector) {
	          parents.push(elem);
	        }
	      } else {
	        parents.push(elem);
	      }
	    }
	    if (parents.length === 0) {
	      return null;
	    } else {
	      return parents;
	    }
	  }
	};

	window.addEventListener('load', function () {
	  controller.init();
	});

	dom.ideaSubmissionForm.addEventListener('keyup', function () {
	  ideaBox.ideaSubmissionFormKeyup();
	});

	dom.saveButton.addEventListener('click', function (e) {
	  e.preventDefault();
	  ideaBox.saveButtonClick();
	  controller.saveButtonClick();
	});

	dom.ideaSearchInput.addEventListener('keyup', function () {
	  ideaBox.ideaSearchInputKeyup();
	  controller.ideaSearchInputKeyup();
	});

	dom.ideaList.addEventListener('click', function (e) {
	  if (e.target && e.target.className === 'delete-idea-button') {
	    ideaBox.removeIdeaButtonClick(e);
	    controller.removeIdeaButtonClick();
	  }
	});

	dom.ideaList.addEventListener('click', function (e) {
	  if (e.target && e.target.className === 'idea-promote-button') {
	    Idea.prototype.ideaPromoteButtonClick(e);
	    controller.ideaPromoteButtonClick();
	  }
	});

	dom.ideaList.addEventListener('click', function (e) {
	  if (e.target && e.target.className === 'idea-demote-button') {
	    Idea.prototype.ideaDemoteButtonClick(e);
	    controller.ideaDemoteButtonClick();
	  }
	});

	dom.ideaList.addEventListener('keyup', function (e) {
	  if (e.target && e.target.className === 'idea-title') {
	    Idea.prototype.ideaTitleKeyup(e);
	    controller.ideaTitleKeyup();
	  }
	});

	dom.ideaList.addEventListener('keyup', function (e) {
	  if (e.target && e.target.className === 'idea-body') {
	    Idea.prototype.ideaBodyKeyup(e);
	    controller.ideaBodyKeyup();
	  }
	});

	module.exports = dom;
	var ideaBox = __webpack_require__(2);
	var Idea = __webpack_require__(3);
	var controller = __webpack_require__(1);

/***/ }
/******/ ]);