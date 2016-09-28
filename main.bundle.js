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

	__webpack_require__(1);
	(function webpackMissingModule() { throw new Error("Cannot find module \"app1.js\""); }());


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var scripts = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports) {

	var ideaTitleInput = document.querySelector('#idea-title-input');
	var ideaBodyInput = document.querySelector('#idea-body-input');
	var saveButton = document.querySelector('#idea-save-button');
	var ideaList = document.querySelector('#idea-list');

	saveButton.addEventListener('click', function (e) {
	  e.preventDefault();
	  var title = ideaTitleInput.value;
	  var body = ideaBodyInput.value;
	  addElement(title, body);
	});

	function addElement(title, body, quality) {
	  var title = title || 'Example Idea';
	  var body = body || 'Default idea description';
	  var quality = quality || 'swill';
	  var idea = document.createElement('article');
	  idea.className = 'idea';
	  idea.innerHTML = `
	    <h3 class="idea-title">${ title }</h3>
	    <div class="delete-idea-button"></div>
	    <p class="idea-body">${ body }</p>
	    <div class="idea-quality-container">
	      <div class="idea-promote-button"></div>
	      <div class="idea-demote-button"></div>
	      <p class="idea-quality">
	        <span class="idea-quality-label">quality: </span><span class="idea-quality-value">${ quality }</span>
	      </p>
	    </div>
	  `;
	  ideaList.appendChild(idea);
	}

/***/ }
/******/ ]);