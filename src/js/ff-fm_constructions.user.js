// ==UserScript==
// @name    Fata Morgana Constructions Updater
// @namespace   http://fm.fm.omameier.net/*
// @description Construction Updater
// @include   http://www.dieverdammten.de/*
// @include   http://dieverdammten.de/*
// @version     0.04
// ==/UserScript==

function addJQuery() {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.setAttribute("src", "//fm.fm.omameier.net/js/fm_constructions.js?r="+Math.random());
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery();
