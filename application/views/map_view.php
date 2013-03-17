<div id="map-wrapper" class="clearfix">
	<div id="userInfoBox"></div>
	<div id="map" class="clearfix"></div>
	<div id="canvasDrawDiv" class="hideme"></div>
	<div id="canvasPlanDiv" class="hideme"></div>
</div>
<div id="ruinmap-wrapper" class="hideme">
  <div id="ruinmap-wrapper-close">schließen</div>
  <div id="ruinInfoBox">
    <div id="ruinTileBox">
			<h3>Gänge</h3>
      <div class="ruinOption ruinTile tile-0" tile="0" title="Kein Gang"></div>
      <div class="ruinOption ruinTile tile-1" tile="1" title="Sackgasse mit Nordzugang"></div>
      <div class="ruinOption ruinTile tile-2" tile="2" title="Sackgasse mit Ostzugang"></div>
      <div class="ruinOption ruinTile tile-3" tile="3" title="Sackgasse mit Südzugang"></div>
      <div class="ruinOption ruinTile tile-4" tile="4" title="Sackgasse mit Westzugang"></div>
      <div class="ruinOption ruinTile tile-5" tile="5" title="Langer Nord-Süd-Gang"></div>
      <div class="ruinOption ruinTile tile-6" tile="6" title="Langer Ost-West-Gang"></div>
      <div class="ruinOption ruinTile tile-7" tile="7" title="Kreuzung"></div>
      <div class="ruinOption ruinTile tile-8" tile="8" title="Nord-Ost-Verbindung"></div>
      <div class="ruinOption ruinTile tile-9" tile="9" title="Süd-Ost-Verbindung"></div>
      <div class="ruinOption ruinTile tile-10" tile="10" title="Süd-West-Verbindung"></div>
      <div class="ruinOption ruinTile tile-11" tile="11" title="Nord-West-Verbindung"></div>
      <div class="ruinOption ruinTile tile-12" tile="12" title="T-Kreuzung mit Südblockade"></div>
      <div class="ruinOption ruinTile tile-13" tile="13" title="T-Kreuzung mit Westblockade"></div>
      <div class="ruinOption ruinTile tile-14" tile="14" title="T-Kreuzung mit Nordblockade"></div>
      <div class="ruinOption ruinTile tile-15" tile="15" title="T-Kreuzung mit Ostblockade"></div>
    </div>
		<div id="ruinDoorLockBox">
      <h3>Türen &amp; Schlösser</h3>
      <div class="ruinOption ruinDoorLock doorlock-0" doorlock="0" title="Keine Tür"></div>
      <div class="ruinOption ruinDoorLock doorlock-1" doorlock="1" title="Verschlossene Tür"></div>
      <div class="ruinOption ruinDoorLock doorlock-2" doorlock="2" title="Geöffnete Tür"></div>
      <div class="ruinOption ruinDoorLock doorlock-3" doorlock="3" title="Abdruck vom Flaschenöffner"></div>
      <div class="ruinOption ruinDoorLock doorlock-4" doorlock="4" title="Abdruck vom Schlagschlüssel"></div>
      <div class="ruinOption ruinDoorLock doorlock-5" doorlock="5" title="Abdruck vom Magnet-Schlüssel"></div>
    </div>
<!--
    <div id="ruinDoorBox">
      <h3>Türen</h3>
			<div class="ruinOption ruinDoor door-0" door="0" title="Keine Tür"></div>
      <div class="ruinOption ruinDoor door-1" door="1" title="Verschlossene Tür"></div>
      <div class="ruinOption ruinDoor door-2" door="2" title="Abdruck genommen"></div>
      <div class="ruinOption ruinDoor door-3" door="3" title="Offene Tür"></div>
    </div>
		<div id="ruinLockBox">
      <h3>Schlösser</h3>
			<div class="ruinOption ruinLock lock-0" lock="0" title="Keine Schloss"></div>
      <div class="ruinOption ruinLock lock-1" lock="1" title="Flaschenöffner"></div>
      <div class="ruinOption ruinLock lock-2" lock="2" title="Schlagschlüssel"></div>
      <div class="ruinOption ruinLock lock-3" lock="3" title="Magnet-Schlüssel"></div>
    </div>
-->
		<div id="ruinZombieBox">
      <h3>Zombies</h3>
			<div class="ruinOption ruinZombie zombie-0" zombie="0" title="Kein Zombie"></div>
      <div class="ruinOption ruinZombie zombie-1" zombie="1" title="1 Zombie"></div>
      <div class="ruinOption ruinZombie zombie-2" zombie="2" title="2 Zombies"></div>
      <div class="ruinOption ruinZombie zombie-3" zombie="3" title="3 Zombies"></div>
      <div class="ruinOption ruinZombie zombie-4" zombie="4" title="4 Zombies"></div>
    </div>
  </div>
	<div id="ruinInfoBox2">
		<h2 id="ruinName"></h2>
    <h4 id="ruinCoords">X: <span class="ruinCoordsX"></span> - Y: <span class="ruinCoordsY"></span></h4>
    <div id="ruinZone"></div>
    <div id="ruinCommentBox">
			<h3>Kommentar</h3>
			<textarea id="ruinComment"></textarea>
			<div id="ruinComment-save">speichern</div>
		</div>
		<div id="ruinHoverInfo"></div>
		
	</div>
  <div id="ruinmap" class="clearfix"></div>
</div>
<div id="box" style="display:none;" class="clearfix">
	<div id="box-protection" class="hideme"></div>
	<div id="box-content">
		<ul id="box-tabs" class="clearfix">
			<li id="tab-zone-info" ref="zone-info" class="box-tab active click" title="Zone"></li>
			<li id="tab-item-info" ref="item-info" class="box-tab click" title="Items"></li>
			<li id="tab-bank-info" ref="bank-info" class="box-tab click" title="Bank"></li>
      <li id="tab-town-info" ref="town-info" class="box-tab click" title="Stadt"></li>
			<li id="tab-citizens" ref="citizens" class="box-tab click" title="Einwohner"></li>
			<li id="tab-storms" ref="storms" class="box-tab click" title="Wüstenstürme"></li>
			<li id="tab-ruins" ref="ruins" class="box-tab click" title="Ruinen"></li>
			<li id="tab-expeditions" ref="expeditions" class="box-tab click" title="Expeditionen"></li>
			<li id="tab-options" ref="options" class="box-tab click" title="Optionen"></li>
      <li id="tab-spread" class="box-spread click" title="Übersicht aufklappen">&lt;&gt;</li>
      <li id="tab-unspread" class="box-unspread click hideme" title="Übersicht einklappen">&gt;&lt;</li>
		</ul>
		
		<div id="zone-info" class="spread-no box-tab-content"></div>
		<div id="storms" class="spread-no box-tab-content hideme">Bitte warten...</div>
		<div id="expeditions" class="spread-no box-tab-content hideme">Bitte warten...</div>
		<div id="ruins" class="spread-me spread-4 box-tab-content hideme">Bitte warten...</div>
		<div id="citizens" class="spread-me spread-3 box-tab-content hideme">Bitte warten...</div>
    <div id="town-info" class="spread-me spread-5 box-tab-content hideme">Bitte warten...</div>
		
		<div id="item-info" class="spread-me spread-1 hideme box-tab-content">
			<p class="desc">Diese Gegenstände liegen in der Außenwelt verstreut herum. Klick auf einen Gegenstand, um alle Zonen anzuzeigen, wo es diesen zu finden gibt.</p>
			<div id="item-info-Rsc" class="zone-item-cat clearfix click" state="0"><h3>Rohstoffe</h3></div>
			<div id="item-info-Box" class="zone-item-cat clearfix click" state="0"><h3>Behälter</h3></div>
			<div id="item-info-Furniture" class="zone-item-cat clearfix click" state="0"><h3>Einrichtungsgegenstände</h3></div>
			<div id="item-info-Drug" class="zone-item-cat clearfix click" state="0"><h3>Medikamente</h3></div>
			<div id="item-info-Armor" class="zone-item-cat clearfix click" state="0"><h3>Verteidigung</h3></div>
			<div id="item-info-Food" class="zone-item-cat clearfix click" state="0"><h3>Vorräte</h3></div>
			<div id="item-info-Weapon" class="zone-item-cat clearfix click" state="0"><h3>Waffen</h3></div>
			<div id="item-info-Misc" class="zone-item-cat clearfix click" state="0"><h3>Verschiedenes</h3></div>
		</div>
		
		<div id="bank-info" class="spread-me spread-2 hideme box-tab-content">
			<p class="desc">Diese Gegenstände befinden sich in der Stadtbank. Klick auf einen Gegenstand, um alle Zonen anzuzeigen, wo es diesen Gegenstand in der Außenwelt zu finden gibt.</p>
			<div id="bank-info-Rsc" class="zone-item-cat clearfix click" state="0"><h3>Rohstoffe</h3></div>
			<div id="bank-info-Box" class="zone-item-cat clearfix click" state="0"><h3>Behälter</h3></div>
			<div id="bank-info-Furniture" class="zone-item-cat clearfix click" state="0"><h3>Einrichtungsgegenstände</h3></div>
			<div id="bank-info-Drug" class="zone-item-cat clearfix click" state="0"><h3>Medikamente</h3></div>
			<div id="bank-info-Armor" class="zone-item-cat clearfix click" state="0"><h3>Verteidigung</h3></div>
			<div id="bank-info-Food" class="zone-item-cat clearfix click" state="0"><h3>Vorräte</h3></div>
			<div id="bank-info-Weapon" class="zone-item-cat clearfix click" state="0"><h3>Waffen</h3></div>
			<div id="bank-info-Misc" class="zone-item-cat clearfix click" state="0"><h3>Verschiedenes</h3></div>
		</div>
		
		<div id="options" class="spread-no hideme box-tab-content">
			<div id="options-radius" class="options-section">
				<p class="desc"><strong>Radien</strong><br/>Gib eine Entfernung an, wähle Farbe und Einheit und klicke auf "Anzeigen", um den Radius in der Karte darzustellen.</p>
				<div id="colorpicker"></div>
				<input class="hideme" type="text" id="opt-radius-color" name="opt-radius-color" value="#9999ff" />
				<input type="text" id="opt-radius-number" name="opt-radius-number" value="9" size="4" maxlength="2" /><input type="radio" id="opt-radius-ap" name="opt-radius-metric" value="ap" checked="checked" /> AP&nbsp;&nbsp;<input type="radio" id="opt-radius-km" name="opt-radius-metric" value="km" /> km&nbsp;&nbsp;<button id="opt-radius-submit">Anzeigen</button><br/><span class="hideme click interactive" onclick="removeRadius();">Alle Radien löschen</span>
				<div id="radius-list"></div>
			</div>
			<div id="options-display" class="options-section">
				<p class="desc"><strong>Anzeige</strong><br/>Klicke auf eine Anzeigeoption, um die jeweiligen Infos auf der Karte ein- bzw. auszublenden.</p>
				<div id="options-display-zonehover" class="click options-display-switch active-option">Zonenhover</div>
				<div id="options-display-geodir" class="click options-display-switch">Himmelsrichtungen</div>
				<div id="options-display-driedzone" class="click options-display-option" ref="zone-status-dried">Icon für leere Zonen</div>
				<div id="options-display-fullzone" class="click options-display-option active-option" ref="zone-status-full">Icon für buddelbare Zonen</div>
				<div id="options-display-citizens" class="click options-display-option active-option" ref="citizen">Icon für Bürger</div>
				<div id="options-display-zombies" class="click options-display-option" ref="zombies">Icon für Zombies</div>
				<div id="options-display-uptodate" class="click options-display-option active-option" ref="zone-updated">Aktualisierungsstatus</div>
			</div>
			<div id="options-qrcode" class="options-section">
				<p class="desc"><strong>Persönliches Lesezeichen</strong><br/>Wenn Du die FM-Karte direkt aufrufen möchtest, ziehe dieses <a href="<?=$bookmark?>">Lesezeichen</a> in Deine Lesezeichenleiste.</p>
				<p class="desc"><strong>QR Code</strong><br/>Wenn Du die FM-Karte unterwegs mit Deinem Smartphone betrachten möchtest, nutze einfach den folgenden QR Code und speichere die Adresse als Lesezeichen.<br><br><?=$qrcode?></p>
				<div id="options-qrcode-img-wrapper" class=""></div>
			</div>
		</div>
	</div>
</div>
<div id="tools" class="clearfix hideme">
	<div id="tools-protection" class="hideme"></div>
	<div id="tools-content">
		<ul id="tools-tabs" class="clearfix">
			<li id="tab-tools-colors" ref="tools-colors" class="tools-tab active click" title="Malkasten"></li>
			<li id="tab-tools-options" ref="tools-options" class="hideme tools-tab click" title="Optionen"></li>
			<li id="tab-tools-planner" ref="tools-planner" class="tools-tab click" title="Planer"></li>
		</ul>
		
		<div id="tools-colors" class="tools-tab-content">
			<ul class="canvas-tools">
				<li>Zeichenbereich <a class="interactive click" id="clear-canvasDraw">löschen</a><br>Zeichenbereich <a class="interactive click" id="save-canvasDraw">speichern</a></li>
			</ul>
			<ul class="canvas-tools">
				<li>Stiftfarbe</li>
				<li class="draw-color click active" id="choosePurple" ref="#ff00ff">Lila</li>
				<li class="draw-color click" id="chooseGreen" ref="#00ff00">Grün</li>
				<li class="draw-color click" id="chooseYellow" ref="#ffff00">Gelb</li>
				<li class="draw-color click" id="chooseBrown" ref="#cc9900">Braun</li>
			</ul>
			<ul class="canvas-tools">
				<li>Stiftgröße</li>
				<li class="draw-size click active" id="chooseS" ref="3">Klein</li>
				<li class="draw-size click" id="chooseM" ref="5">Normal</li>
				<li class="draw-size click" id="chooseL" ref="8">Groß</li>
				<li class="draw-size click" id="chooseX" ref="12">Riesig</li>
      </ul>
		</div>
		
		<?php /* <div id="tools-options" class="hideme tools-tab-content">
			<div id="tools-options-colorwheel" class="options-section">
				<p class="desc"><strong>Farbrad</strong><br/>Wähle eine Farbe!</p>
				<div id="tools-colorpicker"></div>
				<input type="text" id="t-opt-radius-color" name="opt-radius-color" value="#9999ff" />
			</div>
		</div> */ ?>
		<div id="tools-planner" class="hideme tools-tab-content">
			<ul class="canvas-tools">
				<li>Zeichenbereich <a class="interactive click" id="clear-canvasPlan">löschen</a><br>Zeichenbereich <a class="interactive click" id="save-canvasPlan">speichern</a></li>
			</ul>
			<ul class="canvas-tools">
				<li>Route</li> 
				<li class="draw-route click active" id="chooseR1" ref="1">Route 1 (Team Pink)</li>
				<li class="draw-route click" id="chooseR2" ref="2">Route 2 (Team Grün)</li>
				<li class="draw-route click" id="chooseR3" ref="3">Route 3 (Team Gelb)</li>
				<li class="draw-route click" id="chooseR4" ref="4">Route 4 (Team Türkis)</li>
				<li class="draw-route click" id="chooseR5" ref="5">Route 5 (Team Rot)</li>
			</ul>
			<ul class="canvas-tools">
				<li><a class="interactive click" id="toggle-routeSave">Route übertragen</a></li>
				<li id="routeSave-form" class="hideme">
					Route <input type="radio" name="routeSave-no" value="1" checked="checked" />1 <input type="radio" name="routeSave-no" value="2" />2 <input type="radio" name="routeSave-no" value="3" />3 <input type="radio" name="routeSave-no" value="4" />4 <input type="radio" name="routeSave-no" value="5" />5<br/>
					Name <input type="text" name="routeSave-name" size="20" maxlength="20" /><br/>
					<a class="interactive click plus" id="routeSave-save">Route speichern</a> <a class="interactive click minus" id="routeSave-cancel">abbrechen</a>
				</li>
			</ul>
		</div>
	</div>
</div>
<div id="cape" class="clearfix hideme">
  <div id="cape-protection" class="hideme"></div>
  <div id="cape-content">
    Coming soon. Stay tuned.
  </div>
</div>
<div id="map-hover">
	<div id="map-hover-content">
		<div id="map-hover-coords"></div>
		<div id="map-hover-building"></div>
		<div id="map-hover-status"></div>
		<div id="map-hover-citizens"></div>
		<div id="map-hover-zombies"></div>
		<div id="map-hover-items"></div>
	</div>
</div>
<div id="item-selector" class="hideme">
	<div id="item-selector-Rsc" class="item-selector-cat clearfix"><h3>Rohstoffe</h3></div>
	<div id="item-selector-Box" class="item-selector-cat clearfix"><h3>Behälter</h3></div>
	<div id="item-selector-Furniture" class="item-selector-cat clearfix"><h3>Einrichtungsgegenstände</h3></div>
	<div id="item-selector-Drug" class="item-selector-cat clearfix"><h3>Medikamente</h3></div>
	<div id="item-selector-Armor" class="item-selector-cat clearfix"><h3>Verteidigung</h3></div>
	<div id="item-selector-Food" class="item-selector-cat clearfix"><h3>Vorräte</h3></div>
	<div id="item-selector-Weapon" class="item-selector-cat clearfix"><h3>Waffen</h3></div>
	<div id="item-selector-Misc" class="item-selector-cat clearfix"><h3>Verschiedenes</h3></div>
</div>
<div id="building-selector" class="hideme"></div>
<script type="text/javascript"> 
var fm_url = 'http://dv.sindevel.com/fm/';
var secureKey = "<?=$secureKey?>";
var radiusCounter = 1;
var mapHoverActive = true;
var mapHoverMoved = false;
var data = <?=$gamemap?>;
</script>
