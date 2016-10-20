var small_template = {
  width: '500',
  height: '225',
  from: '-12hours',
  until: 'now',
  tz: 'America/Los_Angeles',
  fontSize: '9',
  bgcolor: 'FFFFFF',
  fgcolor: '333333',
  majorGridLineColor: 'C0C0C0',
  minorGridLineColor: '99CCFF',
  hideLegend: 'true'
};

var large_template = {
  width: '1200',
  height: '600',
  from: '-12hours',
  until: 'now',
  tz: 'America/Los_Angeles',
  fontSize: '9',
  bgcolor: 'FFFFFF',
  fgcolor: '333333',
  majorGridLineColor: 'C0C0C0',
  minorGridLineColor: '99CCFF',
  hideLegend: 'false'
};

// TODO - ignore refresh requests within refresh_interval

var refresh_interval = 60 * 1000;
var refresh_timeout = false;
var images = [];

function is_hidden() {
  if (typeof document.hidden !== "undefined") {
    return document["hidden"];
  } else if (typeof document.mozHidden !== "undefined") {
    return document["mozHidden"];
  } else if (typeof document.msHidden !== "undefined") {
    return document["msHidden"];
  } else if (typeof document.webkitHidden !== "undefined") {
    return document["webkitHidden"];
  } else {
    return false;
  }
}

function init_visibility() {
  var visibility_change;
  if (typeof document.hidden !== "undefined") {
    visibility_change = "visibilitychange";
  } else if (typeof document.mozHidden !== "undefined") {
    visibility_change = "mozvisibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    visibility_change = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    visibility_change = "webkitvisibilitychange";
  } else {
    return;
  }
  document.addEventListener(visibility_change, function() {
    if (is_hidden()) {
      clear_timeout();
    } else {
      refresh();
    }
  });
}

function update_src() {
  small_template.from = document.getElementById('span').value;
  large_template.from = document.getElementById('span').value;
  for (var i = 0, il = graphs.length; i < il; i++) {
    var graph = graphs[i];

    var base_src = 'https://graphite-scl3.mozilla.org/render?';
    // var base_src = 'http://glob.uno/graphite/render.cgi?';
    for (var key in graph) {
      if (graph[key] instanceof Array) {
        for (var j = 0, jl = graph[key].length; j < jl; j++) {
          base_src += encodeURIComponent(key) + '=' + encodeURIComponent(graph[key][j]) + '&';
        }
      } else {
        base_src += encodeURIComponent(key) + '=' + encodeURIComponent(graph[key]) + '&';
      }
    }

    var img_src = base_src;
    for (var key in small_template)
      img_src += encodeURIComponent(key) + '=' + encodeURIComponent(small_template[key]) + '&';
    img_src += '_uniq=' + Date.now();
    images[i].img.className = 'loading';
    images[i].img.src = img_src;

    if (!graph.expanded) {
      var a_href = base_src;
      for (var key in large_template)
        a_href += encodeURIComponent(key) + '=' + encodeURIComponent(large_template[key]) + '&';
      a_href += '_uniq=' + Date.now();
      images[i].a.href = a_href;
    }
  }
}

function refresh(force) {
  clear_timeout();
  if (is_hidden() && !force)
    return;
  update_src();
  if (!is_hidden())
    refresh_timeout = setTimeout('refresh()', refresh_interval);
}

function clear_timeout() {
  if (refresh_timeout)
    clearTimeout(refresh_timeout);
  refresh_timeout = false;
}

function expand_graph(e) {
  var i = e.target.id;

  return false;
}

function init() {
  var content = document.getElementById('content');
  for (var i = 0, il = graphs.length; i < il; i++) {
    var graph = graphs[i];
    var a = document.createElement('a');
    a.href = graph.expanded ? '?' + graph.expanded : '';
    var img = document.createElement('img');
    img.id = i;
    img.width = small_template.width;
    img.height = small_template.height;
    img.src = '';
    img.onload = function(e) { e.target.className = '' };
    a.appendChild(img);
    content.appendChild(a);
    if ((i + 1) % 3 == 0)
      content.appendChild(document.createElement('br'));
    images[i] = { a: a, img: img };
  }
  init_visibility();
  refresh(true);
}
