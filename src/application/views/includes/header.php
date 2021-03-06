<!DOCTYPE HTML> 
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="UTF-8">
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.min.js"></script>
		<script type="text/javascript" src="<?=base_url()?>js/fm.js"></script>
		<script type="text/javascript" src="<?=base_url()?>js/canvas.js"></script>
		<script type="text/javascript" src="<?=base_url()?>js/canvas2image.js"></script>
		<script type="text/javascript" src="<?=base_url()?>js/base64.js"></script>
		<script type="text/javascript" src="<?=base_url()?>js/farbtastic.js"></script>
		<link rel="stylesheet" type="text/css" href="<?=base_url()?>css/style.css" />
		<link rel="stylesheet" type="text/css" href="<?=base_url()?>css/canvas.css" />
		<link rel="stylesheet" type="text/css" href="<?=base_url()?>css/farbtastic.css" />
		<link rel="icon" type="image/x-icon" href="<?=base_url()?>img/favicon.ico" size="16x16" /> 
		
		<title>Fata Morgana</title> 
		
		<!--[if IE]><script type="text/javascript" src="<?=base_url()?>js/excanvas.js"></script><![endif]-->
	</head>
	<body>
		<div id="modeBar" class="clearfix">
			<h1 class="fatafont">fata morgana</h1>
			<h5>Eingeloggt als <span id="owner-name"></span></h5>
			<div class="mode-switch click active-mode" id="mode-normal">Kartenmodus</div>
			<div class="mode-switch click" id="mode-draw">Zeichenmodus</div>
			<div class="mode-switch click" id="mode-planner">Planungsmodus</div>
      <div class="mode-switch click" id="mode-cape" title="[C]omputer [A]ssisted [P]lanner for [E]xpeditions - coming soon">CAPE</div>
			<div class="help-switch click" id="mode-help">Hilfe / F.A.Q.</div>
		</div>
		<div id="townBar" class="clearfix hideme"><h2 id="townInfo"><span id="townDay"></span><span id="townName"></span><span id="townID"></span><span id="townSpy"><a href="#" target="_new">Spionagelink</a></span><span id="townHistory">Tag </span></h2></div>
		<div id="help-section" class="hidefaq">
			<h2>Hilfe zu Fata Morgana</h2>
			<p>Screencast für den ersten Einblick: <a style="color:#cfc;" href="http://www.youtube.com/watch?v=jpggkO0elV0" target="_blank">Teil 1</a> - <a style="color:#cfc;" href="http://www.youtube.com/watch?v=5RmMPh_6JVA" target="_blank">Teil 2</a> (YouTube)</p>
			<ul>
				<li><h4>Was ist Fata Morgana?</h4><p><em>Fata Morgana</em> ist eine Kartenapplikation für das Browserspiel <strong>DieVerdammten</strong>.</p></li>
				<li><h4>Warum Fata Morgana?</h4><p>Der Name <em>Fata Morgana</em> entstand aus dem Frust, tolle Gegenstände aus der Wüste holen zu wollen, die auf einer externen Karte eingezeichnet waren, dann aber doch nicht dort liegen. Diese haben sich dann quasi als Fata Morgana entpuppt.</p></li>
				<li><h4>Was ist mit dem Oval Office?</h4><p>Das <em>Oval Office</em> bleibt weiterhin bestehen, vorerst auch mit der eigenen Kartenfunktion. Grundsätzlich wird sich das OO aber eher in die Richtung Statistikseite entwickeln, während FM als Karten- und Planungstool gedacht ist.</p></li>
				<li><h4>Wozu sind die verschiedenen Modi gedacht?</h4><p>Standardmäßig ist der Kartenmodus aktiviert. Hier verhält sich FM wie eine normale Karte, d.h. man kann Informationen zu einzelnen Zonen betrachten und bearbeiten.<br>Der Zeichenmodus erlaubt es dem Benutzer, direkt auf der Karte zu "malen". So kann man z.B. für die Campingplanung bestimmte Regionen markieren, Pfeile zeichnen, etc.<br>Im Planungsmodus können eigene Routen eingezeichnet werden. Im Vergleich zum Zeichenmodus werden hier automatisch gerade Linien erzeugt. So kann man auch während man in der Außenwelt ist, neue Routenvorschläge erstellen.</p></li>
				<li><h4>Warum entsteht so eine komische Datei, wenn ich den Zeichenbereich speichere?</h4><p>Leider ist es noch nicht möglich, einen Standard-Dateinamen anzugeben. Je nach Browser wird die Datei also sehr unterschiedlich benannt (z.B. einfach "Download" unter Google Chrome). Wenn man die Datei dann aber in eine .png umbenennt, kann man das Bild ganz normal verwenden.<br>Derzeit ist es leider auch noch nicht möglich, die Karte selbst als Hintergrund einzufügen.</p></li>
				<li><h4>Was steht noch so auf der ToDo-Liste?</h4><p>So einige Dinge. Unter anderem:</p><ul>
				<li>Verbessertes DB-Format</li>
				<li>Speicherung des Kartenbereichs als Bild</li>
				<li>Speicherung der erzeugten Routen</li>
				<li>Stadtübersicht</li>
				<li>Bürgerübersicht inkl. Aktivitätsmeter</li>
				<li><del>Spionagemodus</del></li>
				<li><del>Zeichnen auf der Karte</del></li>
				</ul></li>
				<li><h4>Ich habe einen Fehler gefunden, was nun?</h4><p>Im Fußbereich findest Du einen Link zum Bugtracker, trage dort bitte den gefundenen Fehler ein. Vielen Dank!</p></li>
				<li><h4>Werden Daten von anderen Servern genutzt?</h4><p>Zahlreiche Grafiken (v.a. Items) werden vom DV-Server geladen. Die jQuery-Bibliothek und jQuery UI sowie der QR-Code kommen von verschiedenen Google-APIs. Der Bugtracker-Link führt zu einem Formular, welches wiederum ein öffentliches Google Docs-Spreadsheet befüllt. Statistische Daten werden derzeit nicht erfasst. Sollte ich dies aktivieren, werden die Daten nicht an externe Dienste weitergegeben, sondern direkt auf dem Server gespeichert (mittels PIWIK).</p></li>
			</ul>
		</div>
		<div id="fm-container" class="clearfix tl">
			<div id="fm-content" class="clearfix">