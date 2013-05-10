/** Fata Morgana Constructions Updater
 * version 0.04
 * 23 September 2012
 * Copyright (c) 2012, Paul Bruhn
 * Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
 *
 * −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−----------
 *
 * CHROME:
 * This is a native user script.
 * Just download the file and drag it to your extension page at
 * chrome://settings/extensions
 * 
 * To uninstall click the "Remove" button at te page just mentioned.
 * 
 * 
 * FIREFOX:
 * This is a Greasemonkey user script.
 *
 * To install, you need Greasemonkey: http://www.greasespot.net/
 * Then restart Firefox and revisit this script.
 * Under Tools, there will be a new menu item to "Install User Script".
 * Accept the default configuration and install.
 *
 * To uninstall, go to Tools/Manage User Scripts,
 * select "Fata Morgana Constructions Updater", and click Uninstall.
 *
 * −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−----------
 *
 * @author  Paul Bruhn <countcount.cc@gmail.com>
 * @link    http://fm.omameier.net/js/fm-constructions.user.js
 * @license http://www.gnu.org/copyleft/gpl.html GNU General Public License
 * @charset UTF-8
*/
// ==UserScript==
// @name    Fata Morgana Constructions Updater
// @namespace   http://fm.omameier.net/*
// @description Construction Updater
// @include   http://www.dieverdammten.de/*
// @include   http://dieverdammten.de/*
// @version     0.04
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.setAttribute("src", "//fm.omameier.net/js/fm_constructions.js?r="+Math.random());
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(main);
