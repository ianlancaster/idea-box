var scripts = require('./js/controller.js');
var scripts = require('./js/listeners.js');
var scripts = require('./js/ideaBox.js');
var scripts = require('./js/Idea.js');

// console.log(scripts.ideaList);

scripts.saveButton.addEventListener('click', function (e) {
  e.preventDefault();
  var title = scripts.ideaTitleInput.value;
  var body = scripts.ideaBodyInput.value;
  scripts.addElement(title,body);
});
