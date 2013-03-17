// ==UserScript==
// @name    Fata Morgana Constructions Updater
// @namespace   http://fm.dvart.de/*
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
    script.setAttribute("src", "//fm.dvart.de/js/fm_constructions.js?r="+Math.random());
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery();