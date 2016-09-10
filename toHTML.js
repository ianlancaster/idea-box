return $(
  '<article id="'
  + this.id +
  '" class="idea"><input type="text" class="idea-title" value="'
  + this.title +
  '"><div class="delete-idea-button"></div><input type="text" class="idea-body" value="'
  + this.body +
  '"><div class="idea-quality-container"><div class="idea-promote-button"></div><div class="idea-demote-button"></div><p class="ideaQuality"><span class="idea-quality-label">quality: </span><span class="idea-quality-value">'
  + this.quality +
  '</span></p></div></article>');
