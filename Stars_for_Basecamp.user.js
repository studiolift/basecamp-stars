// ==UserScript==
// @name        Stars for Basecamp Classic
// @description Adds "important" stars to Basecamp Classic todos if they contain an asterisk (*)
// @match       https://*.basecamphq.com/*
// @include     https://*.basecamphq.com/*
// @version     0.1
// @author      Mike Robinson
// @homepage    http://twitter.com/akamike
// ==/UserScript==
(function(){
  var doc = document,
      body = doc.getElementsByTagName('body')[0],
      style = doc.createElement('style');

  // Add custom styles
  style.textContent = [
    '.todo_star { color:#fff; display:inline-block; font-size:3em; line-height:8%; margin-right:3px; background-color:orange; font-family:Helvetica,Arial; padding:0.46em 0.1em 0; vertical-align:middle; }',
    '.hot { background-color:darkOrange; }',
    '.cold { background-color:#C3EEFF; }'
  ].join('\n');

  doc.getElementsByTagName('head')[0].appendChild(style);

  // Format markers
  var todos = body.querySelectorAll('.todolist .content, .item .item_content, .items_wrapper .content span, .page_header .content .item, .event .item span');

  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i], t;

    // matches [HOT] and [WARM] and [COLD] for legacy Enhance! tasks
    if (t = todo.textContent.match(/(\[HOT\]|\[WARM\]|\[COLD\]|\*)/g)) {
      var p = doc.createElement('span');
          p.textContent = "*";
          p.className = 'todo_star';

      // Subtle difference
      if (t[0] == '[HOT]') {
        p.className += ' hot';
      } else if (t[0] == '[COLD]') {
        p.className += ' cold';
      }

      todo.innerHTML = todo.innerHTML.replace(t[0], '');
      todo.insertBefore(p, todo.firstChild);
    }
  }
})();
