// translation service
(function(){
	var _dict = {};
	var _notFoundError = false;
	window.jsIn = {
		//  the format of DictInObject : {"key1":"text1", "key2":"text2",...}
		addDict : function(dict){	                
			for (key in dict) { _dict[key] = dict[key]; }    
		},
		showNotFoundError : function(show){
			if (typeof show != 'undefined')
				_notFoundError = (show===true);
					
			return _notFoundError;            
		},
		translate : function(text, param){        
			newText = _dict[text] ||
			((!_notFoundError)?
				text :
				(function(){
					throw "No entry found for key {" + text + "}";
				})()
			);
			
			//parse the place holders.
			if (param){
				for(var i=0, maxi=param.length; i<maxi; i++)
				{
					var regex = new RegExp('\{%'+(i+1)+'\}', 'g');
					newText = newText.replace(regex, param[i]);
				}
			}
			return newText;
		}
	};
window.__ = jsIn.translate;
})();

// dictionary
jsIn.addDict({
'Zone' : 'Zone',
'Entfernung' : 'Entfernung',
'AP' : 'AP',
'km' : 'km',
'Gebäude ist leer.' : 'Gebäude ist leer.',
'regenerieren' : 'regenerieren',
'Gebäude ist durchsuchbar.' : 'Gebäude ist durchsuchbar.',
'leeren' : 'leeren',
'Blaupause wurde gefunden.' : 'Bauplan wurde gefunden.',
'ist noch erhältlich' : 'ist noch erhältlich',
'Blaupause ist noch erhältlich.' : 'Bauplan ist noch erhältlich.',
'bereits gefunden' : 'bereits gefunden',
'Zone ist leer.' : 'Zone ist leer.',
'Zone ist regeneriert.' : 'Zone ist regeneriert.',
'Zombie' : 'Zombie',
'aktualisieren' : 'aktualisieren',
'speichern' : 'speichern',
'Vor 1 Tag war es ein Zombie.' : 'Vor 1 Tag war es ein Zombie.',
'Vor 1 Tag waren es {%1} Zombies.' : 'Vor 1 Tag waren es {%1} Zombies.',
'Vor {%1} Tagen war es 1 Zombie.' : 'Vor {%1} Tagen war es 1 Zombie.',
'Vor {%1} Tagen waren es {%2} Zombies.' : 'Vor {%1} Tagen waren es {%2} Zombies.',
'Vor 1 Tag waren es 0 Zombies.' : 'Vor 1 Tag waren es 0 Zombies.',
'Vor {%1} Tagen waren es 0 Zombies.' : 'Vor {%1} Tagen waren es 0 Zombies.',
'Zombies' : 'Zombies',
'CHAOS' : 'CHAOS',
'Ich bin HIER!' : 'Ich bin HIER!',
'Bürger' : 'Bürger',
'Gegenstände' : 'Gegenstände',
'schließen' : 'schließen',
"Januar" : "Januar",
"Februar" : "Februar",
"März" : "März",
"April" : "April",
"Mai" : "Mai",
"Juni" : "Juni",
"Juli" : "Juli",
"August" : "August",
"September" : "September",
"Oktober" : "Oktober",
"November" : "November",
"Dezember" : "Dezember",
'Letzte Aktualisierung' : 'Letzte Aktualisierung',
'am' : 'am',
'Uhr' : 'Uhr',
'durch' : 'durch',
'Gebäude unwahrscheinlich' : 'Gebäude unwahrscheinlich',
'vermutlich doch' : 'vermutlich doch',
'vermutlich ein Gebäude' : 'vermutlich ein Gebäude',
'eher nicht' : 'eher nicht',
'löschen' : 'löschen',
'Radius' : 'Radius',
'Zone ist buddelbar.' : 'Zone ist buddelbar.',
'Vor {%1} Tagen war es ein Zombie.' : 'Vor {%1} Tagen war es ein Zombie.',
'Gegenstände auf dem Boden' : 'Gegenstände auf dem Boden',
'Hier ist wahrscheinlich ein Gebäude.' : 'Hier ist wahrscheinlich ein Gebäude.',
'vermutlich 1 Zombie' : 'vermutlich 1 Zombie',
'vermutlich {%1} Zombies' : 'vermutlich {%1} Zombies',
'Heute aktualisiert' : 'Heute aktualisiert',
'Gestern aktualisiert' : 'Gestern aktualisiert',
'Vorgestern aktualisiert' : 'Vorgestern aktualisiert',
'keine Beobachtung' : 'keine Beobachtung',
'Tag' : 'Tag',
'Anzeige ausblenden' : 'Anzeige ausblenden',
'ACHTUNG! Die Expeditionsanzeige ist noch im experimentellen Status.' : 'ACHTUNG! Die Expeditionsanzeige ist noch im experimentellen Status.',
'Vermutetes Gebäude' : 'Vermutetes Gebäude',
'Sturm' : 'Sturm',
'Ein nicht freigeschaufeltes Gebäude.' : 'Ein nicht freigeschaufeltes Gebäude.',
'Haufen' : 'Haufen',
'Es ist ein Fehler aufgetreten. Von DV wurde folgender Fehlercode gesendet' : 'Es ist ein Fehler aufgetreten. Von DV wurde folgender Fehlercode gesendet',
'Keine Änderungen registriert.' : 'Keine Änderungen registriert.',
'ID' : 'ID',
'Tod Typ 0' : 'Todesursache unbekannt',
'Tod Typ 1' : 'Dehydriert',
'Tod Typ 2' : 'Selbstmord durch Erhängen',
'Tod Typ 3' : 'Selbstmord durch Zyanid',
'Tod Typ 4' : 'Volksjustiz (Tod durch Erhängen)',
'Tod Typ 5' : 'In der Außenwelt verschwunden',
'Tod Typ 6' : 'Beim gestrigen Angriff aufgefressen',
'Tod Typ 7' : 'Tod durch Entzug',
'Tod Typ 8' : 'Tod durch Infektion',
'Tod Typ 9' : 'Kopfschuss (Account von Admin gelöscht)',
'Tod Typ 10' : 'Seele aufgelöst (Account gelöscht)',
'Tod Typ 11' : 'Vergiftet',
'Tod Typ 12' : 'Vom Ghul gefressen',
'Tod Typ 13' : 'Aggression (Ghul)',
'Tod Typ 14' : 'Verhungerter Ghul',
}); 

// fm code
function updateMapRulers(mapZone) {
	var rx = mapZone.attr('rx');
	var ry = mapZone.attr('ry');
	$('#map .mapruler').removeClass('hoverzone');
	$('#map .mapruler.ruler_y'+ry+',#map .mapruler.ruler_x'+rx ).addClass('hoverzone');
}
function updateRuinMapRulers(mapZone) {
  var rx = mapZone.attr('rx');
  var ry = mapZone.attr('ry');
  $('#ruinmap .mapruler').removeClass('hoverzone');
  $('#ruinmap .mapruler.ruler_y'+ry+',#ruinmap .mapruler.ruler_x'+rx ).addClass('hoverzone');
}
function selectZone(mapZone) {
	$('#item-selector').addClass('hideme');
	$('#building-selector').addClass('hideme');
	var rx = mapZone.attr('rx');
	var ry = mapZone.attr('ry');
	$('#map .mapzone, #map .mapruler').removeClass('selectedZone');
	$('#map #x'+rx+'y'+ry+',#map .mapruler.ruler_y'+ry+',#map .mapruler.ruler_x'+rx).addClass('selectedZone');
	var ax = mapZone.attr('ax');
	var ay = mapZone.attr('ay');
	updateBox(ax,ay,rx,ry);
	
	$('li.box-tab').removeClass('active');
	$('li.box-tab[ref="zone-info"]').addClass('active')
	$('div.box-tab-content').addClass('hideme');
	$('div#zone-info').removeClass('hideme');
}
function updateBox(x,y,rx,ry) {
	var zone;
	$('#item-selector').addClass('hideme');
	delete data.saveItems;
	var infoBox = $('#box-content #zone-info');
  if ( !(rx == 0 && ry == 0) ) {
    infoBox.html('<h3>'+__('Zone')+' ['+rx+'|'+ry+']</h3>');
    infoBox.append('<p>'+__('Entfernung')+': '+ calcAP(rx,ry) +__('AP')+', '+ calcKM(rx,ry) +__('km')+'</p>');
  }
  else {
    infoBox.html('<h3>'+__('Stadt')+' ['+rx+'|'+ry+']</h3>');
  }
	if ( data.map['y'+y] != undefined && data.map['y'+y]['x'+x] != undefined ) { 
		if ( zone = data.map['y'+y]['x'+x] ) {
			// building
			if ( zone.building != undefined ) {
        if (!isExplorable(zone.building.type) && zone.building.type != -1) {
          if ( zone.building.dried != undefined && zone.building.dried == 1 ) {
            if ( data.spy == undefined ) {
              infoBox.append('<p class="zone-building"><strong>'+ zone.building.name +'</strong><br/><span class="minus">'+__('Gebäude ist leer.')+'</span> <a class="interactive plus ajaxlink" href="/fatamorgana/update/building/regenerate" id="BUILDING-REGENERATE" ocx="'+x+'" ocy="'+y+'">'+__('regenerieren')+'</a></p>');
            }
            else {
              infoBox.append('<p class="zone-building"><strong>'+ zone.building.name +'</strong><br/><span class="minus">'+__('Gebäude ist leer.')+'</span></p>');
            }
          }
          else {
            if ( data.spy == undefined ) {
              infoBox.append('<p class="zone-building"><strong>'+ zone.building.name +'</strong><br/><span class="plus">'+__('Gebäude ist durchsuchbar.')+'</span> <a class="interactive minus ajaxlink" href="/fatamorgana/update/building/deplete" id="BUILDING-DEPLETE" ocx="'+x+'" ocy="'+y+'">'+__('leeren')+'</a></p>');
            }
            else {
              infoBox.append('<p class="zone-building"><strong>'+ zone.building.name +'</strong><br/><span class="plus">'+__('Gebäude ist durchsuchbar.')+'</span></p>');
            }
          }
          if ( zone.building.blueprint != undefined && zone.building.blueprint == 1 ) {
            if ( data.spy == undefined ) {
              infoBox.append('<p class="zone-building"><span class="minus">'+__('Blaupause wurde gefunden.')+'</span> <a class="interactive plus ajaxlink" href="/fatamorgana/update/blueprint/available" id="BLUEPRINT-AVAILABLE" ocx="'+x+'" ocy="'+y+'">'+__('ist noch erhältlich')+'</a></p>');
            }
            else {
              infoBox.append('<p class="zone-building"><span class="minus">'+__('Blaupause wurde gefunden.')+'</span></p>');
            }
          }
          else {
            if ( data.spy == undefined ) {
              infoBox.append('<p class="zone-building"><span class="plus">'+__('Blaupause ist noch erhältlich.')+'</span> <a class="interactive minus ajaxlink" href="/fatamorgana/update/blueprint/found" id="BLUEPRINT-FOUND" ocx="'+x+'" ocy="'+y+'">'+__('bereits gefunden')+'</a></p>');
            }
            else {
              infoBox.append('<p class="zone-building"><span class="plus">'+__('Blaupause ist noch erhältlich.')+'</span></p>');
            }
          }
        }
        else if (isExplorable(zone.building.type)) {
          infoBox.append('<p class="zone-building"><strong>'+ zone.building.name +'</strong><br/><span class="">'+__('Begehbare Ruine:')+'</span> <a class="interactive explore" href="#" id="ENTER-BUILDING" ocx="'+x+'" ocy="'+y+'">'+__('Gebäude betreten.')+'</a></p>');
        }
				else {
					infoBox.append('<p class="zone-building"><strong>'+ zone.building.name +'</strong> <span class="minus">'+__('{%1} Haufen',[zone.building.dig])+'</span><br/>');
					if ( zone.building.guess != undefined ) {
						infoBox.append('Aufklärer: '+data.buildings[zone.building.guess]);
						infoBox.append(' <a class="toggle-building-update interactive" href="#" id="GUESS-BUILDING" ocx="'+x+'" ocy="'+y+'">'+__('Vermutung ändern')+'</a>');
					}
					else {
						infoBox.append('<a class="toggle-building-update interactive" href="#" id="GUESS-BUILDING" ocx="'+x+'" ocy="'+y+'">'+__('Vermutung angeben')+'</a>');
					}
					infoBox.append('</p>');
				}
			}
			// regeneration
			if ( zone.dried != undefined && zone.dried == 1 ) {
				if ( data.spy == undefined ) {
					infoBox.append('<p class="zone-status zone-status-empty"><img src="'+data.system.icon+'tag_5.gif" /> <span class="minus">'+__('Zone ist leer.')+'</span> <a class="interactive plus ajaxlink" href="/fatamorgana/update/zone/regenerate" id="ZONE-REGENERATE" ocx="'+x+'" ocy="'+y+'">'+__('regenerieren')+'</a></p>');
				}
				else {
					infoBox.append('<p class="zone-status zone-status-empty"><img src="'+data.system.icon+'tag_5.gif" /> <span class="minus">'+__('Zone ist leer.')+'</span></p>');
				}
			}
			else if ( !(rx == 0 && ry == 0) ) {
				if ( data.spy == undefined ) {
					infoBox.append('<p class="zone-status zone-status-full"><img src="'+data.system.icon+'small_gather.gif" /> <span class="plus">'+__('Zone ist regeneriert.')+'</span> <a class="interactive minus ajaxlink" href="/fatamorgana/update/zone/deplete" id="ZONE-DEPLETE" ocx="'+x+'" ocy="'+y+'">'+__('leeren')+'</a></p>');
				}
				else {
					infoBox.append('<p class="zone-status zone-status-full"><img src="'+data.system.icon+'small_gather.gif" /> <span class="plus">'+__('Zone ist regeneriert.')+'</span></p>');
				}
			}
			// zombies
			if ( !(rx == 0 && ry == 0) ) {
				var diff = 0, days = 0;
				if ( zone.updatedOn != undefined && zone.nvt != 0 ) {
					var date = new Date(zone.updatedOn * 1000);
					var dateN = new Date();
					dateN.setHours(23);
					dateN.setMinutes(59);
					dateN.setSeconds(59);
					if ( date.getDate() != dateN.getDate ) {
						days = Math.floor( (dateN.getTime() - date.getTime()) / 86400000 );
						diff = days;
						if ( zone.building != undefined ) {
							diff = 2 * days;
						}
					}
				}
				if ( data.spy == undefined ) {
					infoBox.append('<p class="zone-zombies"><span class="hideme zombie-count-change plus">◄&nbsp;</span><span id="zombie-count-display">'+(zone.z != undefined ? parseInt(zone.z) + diff : diff)+'</span><span class="hideme zombie-count-change minus">&nbsp;►</span> '+__('Zombie')+(zone.z && zone.z == 1 ? '' : 's')+' <a class="toggle-zombie-update interactive" href="/fatamorgana/update/zombies">'+__('aktualisieren')+'</a><a class="hideme interactive ajaxlink" href="/fatamorgana/update/zombies" id="UPDATE-ZOMBIES" ocx="'+x+'" ocy="'+y+'">'+__('speichern')+'</a></p>');
					if ( days > 0 && zone.z != undefined ) {
						if (days == 1 && zone.z == 1) {
							infoBox.append('<p class="zone-zombies-scout"><em>'+__('Vor 1 Tag war es ein Zombie.')+'</em></p>');
						}
						else if (days == 1 && zone.z > 1) {
							infoBox.append('<p class="zone-zombies-scout"><em>'+__('Vor 1 Tag waren es {%1} Zombies.',[zone.z])+'</em></p>');
						}
						else if (days > 1 && zone.z == 1) {
							infoBox.append('<p class="zone-zombies-scout"><em>'+__('Vor {%1} Tagen war es 1 Zombie.',[days])+'</em></p>');
						}
						else if (days > 1 && zone.z > 1) {
							infoBox.append('<p class="zone-zombies-scout"><em>'+__('Vor {%1} Tagen waren es {%2} Zombies.',[days, zone.z])+'</em></p>');
						}
					}
					else if ( days > 0 && zone.z == undefined ) {
						if (days == 1) {
							infoBox.append('<p class="zone-zombies-scout"><em>'+__('Vor 1 Tag waren es 0 Zombies.')+'</em></p>');
						}
						else if (days > 1) {
							infoBox.append('<p class="zone-zombies-scout"><em>'+__('Vor {%1} Tagen waren es 0 Zombies.',[days])+'</em></p>');
						}
					}
					infoBox.append('<div class="hideme"><input type="hidden" value="'+(zone.z ? parseInt(zone.z) + diff : diff)+'" id="zombie-count-input" /></div>');
				}
				else {
					infoBox.append('<p class="zone-zombies"><span id="zombie-count-display">'+(zone.z ? zone.z : 0)+'</span> '+__('Zombies')+'</p>');
				}
			}
			
			if ( data.system.chaos == true ) {
				if ( data.spy == undefined ) {
					infoBox.append('<p class="zone-chaos-citizen"><img src="'+data.system.icon+'small_arma.gif" /><img src="'+data.system.icon+'small_human.gif" /> <span class="minus">'+__('CHAOS')+':</span> <a class="interactive plus ajaxlink" href="/fatamorgana/update/citizen" id="CITIZEN-LOCATION" ocx="'+x+'" ocy="'+y+'">'+__('Ich bin HIER!')+'</a></p>');
				}
			}
			
			// citizens
			if ( zone['citizens'] != undefined ) {
				var cc = 0;
				var clist = '';
				for ( cid in zone['citizens'] ) {
					cc++;
					//if ( clist != '' ) { clist += ', '; }
					clist += '<span class="zone-citizen zone-citizen-'+zone['citizens'][cid]['job']+'">'+zone['citizens'][cid]['name']+'</span> ';
				}
				if ( cc > 0 ) {
					infoBox.append('<p class="zone-citizens">'+ cc +' '+__('Bürger')+': '+ clist +'</p>');
				}
			}
			
			// lost souls
			if ( !(rx == 0 && ry == 0) ) {
        if ( zone['lostsoul'] == undefined || zone['lostsoul'] == 0 ) {
          if ( data.spy == undefined ) {
            infoBox.append('<p class="zone-soul zone-soul-0">'+__('Keine verirrte Seele')+' <a class="interactive plus ajaxlink" href="/fatamorgana/update/zone/addsoul" id="ZONE-ADDSOUL" ocx="'+x+'" ocy="'+y+'">'+__('hinzufügen')+'</a></p>');
          }
          else {
            infoBox.append('<p class="zone-soul zone-soul-0">'+__('Keine verirrte Seele')+'</p>');
          }
        }
        else {
          if ( data.spy == undefined ) {
            infoBox.append('<p class="zone-soul zone-soul-1"><img src="'+data.system.icon+'tag_12.gif" /> <span class="plus">'+__('Hier spukt es.')+'</span> <a class="interactive minus ajaxlink" href="/fatamorgana/update/zone/delsoul" id="ZONE-DELSOUL" ocx="'+x+'" ocy="'+y+'">'+__('Seele entfernen')+'</a></p>');
          }
          else {
            infoBox.append('<p class="zone-soul zone-soul-1"><img src="'+data.system.icon+'tag_12.gif" /> <span class="plus">'+__('Hier spukt es..')+'</span></p>');
          }
        }
      }
			
			// items
			if ( !(rx == 0 && ry == 0) ) {
        if ( data.spy == undefined ) {
          infoBox.append('<p class="zone-items-header"><span>'+__('Gegenstände')+'</span> <a class="toggle-item-update interactive" href="/fatamorgana/update/items" id="ZONE-ITEMS" ocx="'+x+'" ocy="'+y+'">'+__('aktualisieren')+'</a></p>');
        }
        else {
          infoBox.append('<p class="zone-items-header"><span>'+__('Gegenstände')+'</span></p>');
        }
        infoBox.append('<div id="zi_x'+rx+'_y'+ry+'" class="zone-items clearfix"></div>');
        if ( zone['items'] != undefined && !(rx == 0 && ry == 0) ) {
          for ( i in zone.items ) {
            var item = zone.items[i];
            $('#zi_x'+rx+'_y'+ry).append(createItemDisplay(item.id,item.count,item.broken));
          }
        }
        if ( data.spy == undefined ) {
          infoBox.append('<p class="zone-items-footer hideme"><a class="close-item-selector minus interactive" href="close">'+__('schließen')+'</a>&nbsp;&nbsp;&nbsp;<a class="ajaxsave plus interactive" href="/fatamorgana/update/items" id="ZONE-ITEMS" ocx="'+x+'" ocy="'+y+'">'+__('speichern')+'</a></p>');
        }
      }
			
			// update status
			if ( !(rx == 0 && ry == 0) ) {
        var monat = new Array(__("Januar"), __("Februar"), __("März"), __("April"), __("Mai", "Juni"), __("Juli"), __("August"), __("September"), __("Oktober"), __("November"), __("Dezember"));
        var updText = __('Letzte Aktualisierung')+' ';
        if ( zone.updatedOn != undefined ) {
          var date = new Date(zone.updatedOn * 1000);
          
          updText += __('am')+' ' + date.getDate() + '. ' + monat[date.getMonth() - 1] + ' ' + date.getFullYear() + ', ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ' '+__('Uhr')+' ';
        }
        if ( zone.updatedBy != undefined ) {
          updText += __('durch')+' ' + zone.updatedBy;
        }
        infoBox.append('<p class="zone-lastupdate">'+updText+'</p>');
      }
		}
	}
	else {
		// zombies scout
		if ( data.spy == undefined ) {
			if ( data.scout != undefined && data.scout['y'+y+'x'+x] != undefined ) {
				var zom = data.scout['y'+y+'x'+x]['zom'];
				var pbl = data.scout['y'+y+'x'+x]['pbl'];
				var upo = data.scout['y'+y+'x'+x]['updatedOn'];
				var upb = data.scout['y'+y+'x'+x]['updatedBy'];
			}
			else {
				var zom = 0;
				var pbl = 0;
				var upo = 0;
				var upb = 0;
			}
			infoBox.append('<p class="zone-zombies"><span class="hideme zombie-count-change plus">◄&nbsp;</span><span id="zombie-count-display">'+(zom ? zom : 0)+'</span><span class="hideme zombie-count-change minus">&nbsp;►</span> '+__('Zombies')+' <a class="toggle-zombie-update interactive" href="/fatamorgana/update/scoutzombies">'+__('aktualisieren')+'</a><a class="hideme interactive ajaxlink" href="/fatamorgana/update/scoutzombies" id="UPDATE-SCOUTZOMBIES" ocx="'+x+'" ocy="'+y+'">'+__('speichern')+'</a></p>');
			infoBox.append('<div class="hideme"><input type="hidden" value="'+(zom ? zom : 0)+'" id="zombie-count-input" /></div>');
			// possible building?
			if ( pbl == 0 ) {
				if ( data.spy == undefined ) {
					infoBox.append('<p class="zone-status zone-status-empty"><img src="'+data.system.icon+'tag_5.gif" /> <span class="minus">'+__('Gebäude unwahrscheinlich')+'</span> <a class="interactive plus ajaxlink" href="/fatamorgana/update/zone/buildingprobable" id="BUILDING-PROBABLE" ocx="'+x+'" ocy="'+y+'">'+__('vermutlich doch')+'</a></p>');
				}
			}
			else {
				if ( data.spy == undefined ) {
					infoBox.append('<p class="zone-status zone-status-full"><img src="'+data.system.icon+'small_gather.gif" /> <span class="plus">'+__('vermutlich ein Gebäude')+'</span> <a class="interactive minus ajaxlink" href="/fatamorgana/update/zone/buildingnotprobable" id="BUILDING-NOTPROBABLE" ocx="'+x+'" ocy="'+y+'">'+__('eher nicht')+'</a></p>');
				}
			}
			// update status
			if ( upo != 0 && upb != 0 ) {
				var updText = __('Letzte Aktualisierung')+' ';
				var date = new Date(upo * 1000);
				updText += __('am')+' ' + date.getDate() + '. ' + monat[date.getMonth() - 1] + ' ' + date.getFullYear() + ', ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ' '+__('Uhr')+' ';
				updText += __('durch')+' ' + upb;
				infoBox.append('<p class="zone-lastupdate">'+updText+'</p>');
			}
		}
	}
}
function selectRuinZone(mapZone) {
  var rx = mapZone.attr('rx');
  var ry = mapZone.attr('ry');
	data.crx = rx;
	data.cry = ry;
  $('#ruinmap .mapzone, #ruinmap .mapruler').removeClass('selectedZone');
  $('#ruinmap #x'+rx+'y'+ry+',#ruinmap .mapruler.ruler_y'+ry+',#ruinmap .mapruler.ruler_x'+rx).addClass('selectedZone');
  var ax = mapZone.attr('ax');
  var ay = mapZone.attr('ay');
  $('#ruinZone').html(__('Ausgewähltes Gebäudefeld:')+' '+'<span id="ruinCX">'+rx+'</span>'+'|'+'<span id="ruinCY">'+ry+'</span>');
	$('#ruinComment').val(mapZone.attr('comment'));
}
function createItemDisplay(id,count,broken) {
	if ( data.items[id] != undefined ) {
		var raw_item = data.items[id];
		var classBroken = broken == 1 ? ' broken' : (id < 1 ? ' broken' : '');
		var classDef = raw_item.category == 'Armor' ? ' defense' : '';
		return '<div class="zone-item click'+classBroken+classDef+'" state="0" ref="'+raw_item.id+'" count="'+count+'"><img src="'+data.system.icon+'item_'+raw_item.image+'.gif" title="'+raw_item.name+' (ID: '+Math.abs(id)+')" />&nbsp;<span class="count">'+count+'</span></div>';
	}
	else {
		return '';
	}
}
function createItemDisplaySmall(id) {
	var raw_item = data.items[id];
	var classBroken = id < 1 ? ' broken' : '';
	var classDef = raw_item.category == 'Armor' ? ' defense' : '';
	return '<div class="select-item click'+classBroken+classDef+'" ref="'+raw_item.id+'"><img src="'+data.system.icon+'item_'+raw_item.image+'.gif" title="'+raw_item.name+' (ID: '+Math.abs(id)+')" /></div>';

}
function createBuildingDisplaySmall(id) {
	var name = data.buildings[id];
	return '<div class="select-building click" ref="'+id+'">'+name+'</div>';
}
function calcAP(x,y) {
	return Math.abs(x) + Math.abs(y);
}
function calcKM(x,y) {
	return Math.round(Math.sqrt(x * x + y * y));
}
function calcGD(x,y) {
	if (x == 0 && y == 0) { return false; }
	if (x > Math.floor(y/2) && y > Math.floor(x/2)) { return 'NE'; }
	if (x > Math.floor(-y/2) && -y > Math.floor(x/2)) { return 'SE'; }
	if (-x > Math.floor(y/2) && y > Math.floor(-x/2)) { return 'NW'; }
	if (-x > Math.floor(-y/2) && -y > Math.floor(-x/2)) { return 'SW'; }
	if (Math.abs(x) > Math.abs(y)) { return (x > 0) ? 'E' : 'W'; }
	return (y > 0) ? 'N' : 'S';
}
function calcGDN(x,y) {
	if (x == 0 && y == 0) { return false; }
	if (x > Math.floor(y/2) && y > Math.floor(x/2)) { return 1; }
	if (x > Math.floor(-y/2) && -y > Math.floor(x/2)) { return 3; }
	if (-x > Math.floor(y/2) && y > Math.floor(-x/2)) { return 7; }
	if (-x > Math.floor(-y/2) && -y > Math.floor(-x/2)) { return 5; }
	if (Math.abs(x) > Math.abs(y)) { return (x > 0) ? 2 : 6; }
	return (y > 0) ? 0 : 4;
}
function highlightZoneWithItem(zoneitem) {
	var itemid = zoneitem.attr('ref');
	if (zoneitem.hasClass('broken')) {
		itemid *= -1;
	}
	for ( i = 0; i < data['height']; i++ ) {
		for ( j = 0; j < data['width']; j++ ) {
			var mx = 'x' + j;
			var my = 'y' + i;
			var rx = j - data['tx'];
			var ry = data['ty'] - i;
			if ( data.map[my] != undefined && data.map[my][mx] != undefined ) {
				if ( data.map[my][mx]['items'] != undefined && data.map[my][mx]['items'].length > 0 && !(rx == 0 && ry == 0) ) {
					var zoneItems = data.map[my][mx]['items'];
					for ( zi in zoneItems ) {
						var zitem = zoneItems[zi];
						if ( zitem.id == itemid ) {
							highlightZone(rx,ry);
						}						
					}	
				}
			}
		}
	}
}
function highlightZonesWithItem() {
	$('.mapzone').removeClass('highlight');
	$('div.zone-item[state="1"]').each(function() { highlightZoneWithItem($(this)); });
}
function highlightZone(x,y) {
	$('#x'+x+'y'+y).addClass('highlight');
}
function downdarkZone(x,y) {
	$('#x'+x+'y'+y).removeClass('highlight');
}
function highlightSpecialZone(x,y) {
	$('#x'+x+'y'+y).addClass('highlightSpecial');
}
function downdarkSpecialZone(x,y) {
	$('#x'+x+'y'+y).removeClass('highlightSpecial');
}
function addRadius(range,metric,color) {
	$('#dynascript').append('<style type="text/css">li.mapzone.highlight-'+radiusCounter+'-border-n { border-top-color: '+color+'; } li.mapzone.highlight-'+radiusCounter+'-border-e { border-right-color: '+color+'; } li.mapzone.highlight-'+radiusCounter+'-border-s { border-bottom-color: '+color+'; } li.mapzone.highlight-'+radiusCounter+'-border-w { border-left-color: '+color+'; }</style>');
	$('.mapzone['+metric+'="'+range+'"]').each(function(e) {
		var change = $(this).attr(metric+'c');
		for ( c = 0; c < change.length; c++ ) {
			$(this).addClass('highlight-radius').addClass('highlight-'+radiusCounter+'-border-'+change.charAt(c));
		}
	});
	$('#radius-list').append('<div class="radius-delete hideme click" id="radius-delete-'+radiusCounter+'" onclick="removeRadius('+radiusCounter+');"><div class="radius-color-example" style="background-color:'+color+';"></div><span>['+__('löschen')+']</span>'+__('Radius')+' '+radiusCounter+': '+range+' '+metric+'</div>');
	$('#radius-delete-'+radiusCounter).slideDown(750);
	
	radiusCounter++;
}
function removeAllRadius() {
	$('.mapzone.highlight-border-n').removeClass('highlight-border-n').css('border-color','rgba(0,0,0,.2)');
	$('.mapzone.highlight-border-e').removeClass('highlight-border-e').css('border-color','rgba(0,0,0,.2)');
	$('.mapzone.highlight-border-s').removeClass('highlight-border-s').css('border-color','rgba(0,0,0,.2)');
	$('.mapzone.highlight-border-w').removeClass('highlight-border-w').css('border-color','rgba(0,0,0,.2)');
}
function removeRadius(rid) {
	$('.mapzone.highlight-'+rid+'-border-n').removeClass('highlight-'+rid+'-border-n');
	$('.mapzone.highlight-'+rid+'-border-e').removeClass('highlight-'+rid+'-border-e');
	$('.mapzone.highlight-'+rid+'-border-s').removeClass('highlight-'+rid+'-border-s');
	$('.mapzone.highlight-'+rid+'-border-w').removeClass('highlight-'+rid+'-border-w');
	$('#radius-delete-'+rid).slideUp(750);
}
function walkInTheDesert(e) {

    if ( data.cx == undefined || data.cy == undefined ) { // current coords not set
        return;
    }
    if ( $('#zone-info').hasClass('hideme') ) { // zone info tab not active
        return;
    }
    if ( e.which >= 37 && e.which <= 40 ) {
				e.preventDefault();
        var initClick = false;
        if ( e.which == '37' && data.cx > -(data.tx) ) {
            data.cx -= 1;
            initClick = true;
        }
        if ( e.which == '38' && data.cy < data.ty ) {
            data.cy = parseInt(data.cy) + 1;
            initClick = true;
        }
        if ( e.which == '39' && data.cx < data.width - data.tx - 1 ) {
            data.cx = parseInt(data.cx) + 1;
            initClick = true;
        }
        if ( e.which == '40' && data.cy > data.ty - data.height + 1 ) {
            data.cy -= 1;
            initClick = true;
        }
        if ( initClick ) {
            $('#map #x'+(data.cx)+'y'+(data.cy)).click();
        }
    }
}
function walkInTheRuin(e) {

    if ( data.crx == undefined || data.cry == undefined ) { // current coords not set
        data.crx = 0;
				data.cry = 1;
    }
    if ( e.which >= 37 && e.which <= 40 ) {
				e.preventDefault();
        var initClick = false;
        if ( e.which == '37' && data.crx > -7 ) {
            data.crx -= 1;
            initClick = true;
        }
        if ( e.which == '40' && data.cry < 13 ) {
            data.cry = parseInt(data.cry) + 1;
            initClick = true;
        }
        if ( e.which == '39' && data.crx < 5 ) {
            data.crx = parseInt(data.crx) + 1;
            initClick = true;
        }
        if ( e.which == '38' && data.cry > 1 ) {
            data.cry -= 1;
            initClick = true;
        }
        if ( initClick ) {
            $('#ruinmap #x'+(data.crx)+'y'+(data.cry)).click();
        }
    }
}
function moveMapHover(e) {
  var mapHover = $("#map-hover");
	var offset = 18;
	var x = e.pageX+offset;
	var y = e.pageY+offset;
	if ( y > $(window).height() - mapHover.height() ) {
			y -= mapHover.height() + offset * 2;
			if ( y < offset * 2 ) {
					y = $(window).height() / 2 - mapHover.height() / 2;
			}
	}
	mapHover.css( { 'left': x , 'top': y } );
	mapHoverMoved = true;
}
function hideMapHover() {
	$("#map-hover").hide();
	mapHoverMoved = false;
}
function showMapHover(e,z) {
	if ( !mapHoverMoved ) { moveMapHover(e); }
	var selectedZone = $('#'+z);
	if (selectedZone.attr('rx') == 0 && selectedZone.attr('ry') == 0) {
			return;
	}
	$("#map-hover").html(fillMapHover(selectedZone));
	$("#map-hover").show();
	mapHoverMoved = false;
}
function fillMapHover(z) {
	var rx = z.attr('rx');
	var ry = z.attr('ry');
	var ax = z.attr('ax');
	var ay = z.attr('ay');
	
	$('#map-hover-coords').html('<strong>['+rx+'|'+ry+']</strong> - '+calcAP(rx,ry)+' AP / '+calcKM(rx,ry)+' km');
	if ( data.map['y'+ay] != undefined && data.map['y'+ay]['x'+ax] != undefined ) {
		if ( data.map['y'+ay]['x'+ax]['building'] != undefined ) {
			$('#map-hover-building').html('<strong>'+data.map['y'+ay]['x'+ax]['building']['name']+'</strong>');
		}
		else {
			$('#map-hover-building').html(' ');
		}
		if ( data.map['y'+ay]['x'+ax]['dried'] != undefined ) {
			if ( data.map['y'+ay]['x'+ax]['dried'] == 1 ) {
				$('#map-hover-status').html('<strong class="minus">'+__('Zone ist leer.')+'</strong>');
			}
			else {
				$('#map-hover-status').html('<strong class="plus">'+__('Zone ist buddelbar.')+'</strong>');
			}
		}
		else {
			$('#map-hover-status').html(' ');
		}
		if ( data.map['y'+ay]['x'+ax]['citizens'] != undefined ) {
			var cc = 0;
			var clist = '';
			var zone = data.map['y'+ay]['x'+ax];
			for ( cid in zone['citizens'] ) {
				cc++;
				//if ( clist != '' ) { clist += ', '; }
				clist += '<span class="zone-citizen zone-citizen-'+zone['citizens'][cid]['job']+'">'+zone['citizens'][cid]['name']+'</span> ';
			}
			if ( cc > 0 ) {
				//infoBox.append('<p class="zone-citizens">'+ cc +' Bürger: '+ clist +'</p>');
				$('#map-hover-citizens').html(clist);
			}
			else {
				$('#map-hover-citizens').html(' ');
			}
		}
		else {
			$('#map-hover-citizens').html(' ');
		}
		if ( data.map['y'+ay]['x'+ax]['z'] != undefined ) {
			var zone = data.map['y'+ay]['x'+ax];
			var diff = 0, days = 0;
			if ( zone.updatedOn != undefined && zone.nvt != 0 ) {
				var date = new Date(zone.updatedOn * 1000);
				var dateN = new Date();
				dateN.setHours(23);
				dateN.setMinutes(59);
				dateN.setSeconds(59);
				if ( date.getDate() != dateN.getDate ) {
					days = Math.floor( (dateN.getTime() - date.getTime()) / 86400000 );
					diff = days;
					if ( zone.building != undefined ) {
						diff = 2 * days;
					}
				}
			}
			var zest = '';
			if ( days > 0 ) {
				if (days == 1 && zone.z == 1) {
					zest = '<br/><em style="color:#ccc;">'+__('Vor 1 Tag war es ein Zombie.')+'</em>';
				}
				else if (days == 1 && zone.z > 1) {
					zest = '<br/><em style="color:#ccc;">'+__('Vor 1 Tag waren es {%1} Zombies.',[zone.z])+'</em>';
				}
				else if (days > 1 && zone.z == 1) {
					zest = '<br/><em style="color:#ccc;">'+__('Vor {%1} Tagen war es ein Zombie.',[days])+'</em>';
				}
				else if (days > 1 && zone.z > 1) {
					zest = '<br/><em style="color:#ccc;">'+__('Vor {%1} Tagen waren es {%2} Zombies.',[days, zone.z])+'</em>';
				}
			}
			var zcnt = parseInt(data.map['y'+ay]['x'+ax]['z']) + diff;
				
			if ( zcnt == 1 ) {
				$('#map-hover-zombies').html('<strong class="minus">1 '+__('Zombie')+'</strong>'+zest);
			}
			else {
				$('#map-hover-zombies').html('<strong class="minus">'+zcnt+' '+__('Zombies')+'</strong>'+zest);
			}
		}
		else if ( data.map['y'+ay]['x'+ax]['updatedOn'] != undefined ) {
			var zone = data.map['y'+ay]['x'+ax];
			var diff = 0, days = 0;
			var date = new Date(zone.updatedOn * 1000);
			var dateN = new Date();
			dateN.setHours(23);
			dateN.setMinutes(59);
			dateN.setSeconds(59);
			if ( date.getDate() != dateN.getDate ) {
				days = Math.floor( (dateN.getTime() - date.getTime()) / 86400000 );
				diff = days;
				if ( zone.building != undefined ) {
					diff = 2 * days;
				}
			}			
			var zest = '';
			if ( days > 0 ) {
				if (days == 1) {
					zest = '<br/><em style="color:#ccc;">'+__('Vor 1 Tag waren es 0 Zombies.')+'</em>';
				}
				else if (days > 1) {
					zest = '<br/><em style="color:#ccc;">'+__('Vor {%1} Tagen waren es 0 Zombies.',[days])+'</em>';
				}
			}
			var zcnt = diff;
				
			if ( zcnt == 1 ) {
				$('#map-hover-zombies').html('<strong class="minus">1 '+__('Zombie')+'</strong>'+zest);
			}
			else {
				$('#map-hover-zombies').html('<strong class="minus">'+zcnt+' '+__('Zombies')+'</strong>'+zest);
			}
		}
		else {
			$('#map-hover-zombies').html(' ');
		}
		if ( data.map['y'+ay]['x'+ax]['items'] != undefined && data.map['y'+ay]['x'+ax]['items'].length > 0 ) {
			var zone = data.map['y'+ay]['x'+ax];
			var itemBox = $('#map-hover-items');
			itemBox.html('<p><strong>'+__('Gegenstände auf dem Boden')+'</strong></p>');
			itemBox.append('<div id="zh_x'+rx+'_y'+ry+'" class="zone-items clearfix"></div>');
			for ( i in zone.items ) {
				var item = zone.items[i];
				$('#zh_x'+rx+'_y'+ry).append(createItemDisplay(item.id,item.count,item.broken));
			}
		}
		else {
			$('#map-hover-items').html(' ');
		}
	}
	else {
		$('#map-hover-building').html(' ');
		$('#map-hover-status').html(' ');
		$('#map-hover-zombies').html(' ');
		$('#map-hover-items').html(' ');
		if ( data.scout != undefined && data.scout['y'+ay+'x'+ax] != undefined ) {
			if (data.scout['y'+ay+'x'+ax]['pbl'] == 1) {
				$('#map-hover-building').html('<strong>'+__('Hier ist wahrscheinlich ein Gebäude.')+'</strong>');
			}
			if (data.scout['y'+ay+'x'+ax]['zom'] == 1) {
				$('#map-hover-zombies').html('<strong class="minus">'+__('vermutlich 1 Zombie')+'</strong>');
			}
			else if (data.scout['y'+ay+'x'+ax]['zom'] > 1) {
				$('#map-hover-zombies').html('<strong class="minus">'+__('vermutlich {%1} Zombies',[data.scout['y'+ay+'x'+ax]['zom']])+'</strong>');
			}
		}
	}
}
function ajaxUpdate(ec,z) {
	var el = $('#'+ec);
	var token = secureKey;
	var ocX = el.attr('ocx');
	var ocY = el.attr('ocy');
	var ocAction = ec;
	protectBox(true);
	$.ajax({
		type: "POST",
		url: "/fatamorgana/map/update",
		data: "key="+token+"&action="+ocAction+"&x="+ocX+"&y="+ocY+"&z="+z,
		success: function(msg) {
			$('#dynascript').append(msg);
			protectBox(false);
		}
	});
}
function ajaxInfo(msg) {
	var responseItem = $(document.createElement('p')).addClass('ajaxInfo').addClass('hideme').html(msg);
	$('#userInfoBox').append(responseItem);
	responseItem.hide().removeClass('hideme').slideDown(250).delay(2500).slideUp(500);
}
function ajaxRuinUpdate(ocAction,z) {
	var token = secureKey;
	var ocX = $('.ruinCoordsX').html();
	var ocY = $('.ruinCoordsY').html();
	var riX = parseInt($('#ruinCX').html());
	var riY = parseInt($('#ruinCY').html());
	if ( riY > 0 ) {
		var ocAD = riX + '|' + riY + '|' + z;
		/*protectRuinBox(true);*/
		$.ajax({
			type: "POST",
			url: "/fatamorgana/map/update",
			data: "key="+token+"&action="+ocAction+"&x="+ocX+"&y="+ocY+"&z="+ocAD,
			success: function(msg) {
				$('#dynascript').append(msg);
				/*protectRuinBox(false);*/
			}
		});
	}
	else {
		ajaxInfo(__('Bitte gültiges Feld wählen.'));
	}
}
function generateMapZone(i,j) {
	var ax = j;
	var ay = i;
	var mx = 'x' + j;
	var my = 'y' + i;
	var rx = j - data['tx'];
	var ry = data['ty'] - i;
	var rzd = null;
	
	var mapzone = $(document.createElement('li'));
			
	mapzone.addClass('mapzone').attr('rx',rx).attr('ry',ry).attr('ax',ax).attr('ay',ay);
	mapzone.attr('id','x'+rx+'y'+ry);
	if ( data.ox == j && data.oy == i ) {
		mapzone.addClass('selectedZone');
	}

	var ap = calcAP(rx,ry);
	var km = calcKM(rx,ry);
	var gd = 'gd-' + calcGD(rx,ry);
	mapzone.attr('ap',ap).attr('km',km).addClass(gd);

	var apc = '';
	var kmc = '';
	if ( ax > 0 && rx <= 0 ) { // west borders
		var aap = calcAP(rx-1,ry);
		var akm = calcKM(rx-1,ry);
		if ( aap != ap ) { apc += 'w'; }
		if ( akm != km ) { kmc += 'w'; }
	}
	if ( ax < data.width - 1 && rx >= 0 ) { // east borders
		var aap = calcAP(rx+1,ry);
		var akm = calcKM(rx+1,ry);
		if ( aap != ap ) { apc += 'e'; }
		if ( akm != km ) { kmc += 'e'; }
	}
	if ( ay < data.height - 1 && ry <= 0 ) { // south borders
		var aap = calcAP(rx,ry-1);
		var akm = calcKM(rx,ry-1);
		if ( aap != ap ) { apc += 's'; }
		if ( akm != km ) { kmc += 's'; }
	}
	if ( ay > 0 && ry >= 0 ) { // north borders
		var aap = calcAP(rx,ry+1);
		var akm = calcKM(rx,ry+1);
		if ( aap != ap ) { apc += 'n'; }
		if ( akm != km ) { kmc += 'n'; }
	}
	mapzone.attr('apc',apc).attr('kmc',kmc);

	if ( data.map[my] != undefined && data.map[my][mx] != undefined ) {

		if ( data.map[my][mx]['items'] != undefined && data.map[my][mx]['items'].length > 0 && !(rx == 0 && ry == 0) ) {
			var zoneItems = data.map[my][mx]['items'];
			for ( zi in zoneItems ) {
				var zitem = zoneItems[zi];
				if ( data.items[zitem.id] != undefined ) {
					var ritem = data.items[zitem.id];
					if ( data.mapitems[ritem.category][ritem.id] != undefined ) {
						data.mapitems[ritem.category][ritem.id] += zitem.count;
					}
					else {
						data.mapitems[ritem.category][ritem.id] = zitem.count;
					}
				}						
			}					
		}			

		var diff = 0, days = 0;
		var zc = null;
		var zone = data.map[my][mx];
		if ( zone.updatedOn != undefined ) {
			var date = new Date(zone.updatedOn * 1000);
			var dateN = new Date();
			dateN.setHours(23);
			dateN.setMinutes(59);
			dateN.setSeconds(59);
			if ( date.getDate() != dateN.getDate ) {
				days = Math.floor( (dateN.getTime() - date.getTime()) / 86400000 );
				diff = days;
				if ( zone.building != undefined ) {
					diff = 2 * days;
				}
			}
		}
		if (data.map[my][mx]['z'] != undefined)	{
			var zc = parseInt(data.map[my][mx]['z']) + diff;
      var zl = parseInt(data.map[my][mx]['z']);
		}
		else {
			var zc = diff;
      var zl = 0;
		}
		
		if ( data.map[my][mx]['danger'] != undefined && data.map[my][mx]['danger'] != null ) {
			mapzone.addClass('danger'+ data.map[my][mx]['danger']);
			rzd = data.map[my][mx]['danger'];
		}
		else if ( zc != null ) {
			if ( data.map[my][mx]['z'] != undefined ) {
				mapzone.attr('z',data.map[my][mx]['z']);
			}
			if ( zc > 0 ) {
				mapzone.attr('e',zc);
			}
			if ( zl == 0 ) {
				mapzone.addClass('danger0');
			}
			else if ( zl == 1 ) {
				mapzone.addClass('danger1');
				rzd = 1;
			}
			else if ( zl >= 2 && zl <= 4 ) {
				mapzone.addClass('danger2');
				rzd = 2;
			}
			else if ( zl >= 5 && zl <= 8 ) {
				mapzone.addClass('danger3');
				rzd = 3;
			}
			else if ( zl > 8 ) {
				mapzone.addClass('danger4');
				rzd = 4
			}
			else {
				mapzone.addClass('danger0');
			}
		}
		else {
			mapzone.addClass('danger0');
		}
		if ( data.map[my][mx]['tag'] != undefined && data.map[my][mx]['tag'] != null ) {
			mapzone.addClass('tag'+ data.map[my][mx]['tag']);
		}
		if ( data.map[my][mx]['nvt'] != undefined && data.map[my][mx]['nvt'] == 1 ) {
			mapzone.addClass('nvt');
		}
		if ( data.map[my][mx]['building'] != undefined && !(rx == 0 && ry == 0) ) {
			var building = $(document.createElement('div')).addClass('building');
      if (!isExplorable(data.map[my][mx]['building']['type'])) {
        if ( data.map[my][mx]['building']['dried'] == 1 ) {
          building.addClass('depleted-building');
        }
        if ( data.map[my][mx]['building']['blueprint'] == undefined || data.map[my][mx]['building']['blueprint'] == 0 ) {
          building.addClass('building-blueprint');
        }
      }
      else {
        building.addClass('explorable-building');
      }
			mapzone.append(building);
		}
		if ( data.map[my][mx]['lostsoul'] != undefined && data.map[my][mx]['lostsoul'] == 1 && !(rx == 0 && ry == 0)) {
      mapzone.addClass('lostsoul');
      var lostsoul = $(document.createElement('div')).addClass('lostsoul');
      mapzone.append(lostsoul);
    }
		if ( data.map[my][mx]['dried'] != undefined && !(rx == 0 && ry == 0) ) {
			var zsi = $(document.createElement('img')).addClass('zone-status-img');
			if (data.map[my][mx]['dried'] == 1) {
				zsi.attr('src',data.system.icon+'tag_5.gif').addClass('zone-status-dried').addClass('hideme');
			}
			else {
				zsi.attr('src',data.system.icon+'small_gather.gif').addClass('zone-status-full');
			}					
			mapzone.append(zsi);
		}
		if ( data.map[my][mx]['updatedOn'] != undefined && !(rx == 0 && ry == 0) ) {
			var udate = new Date(data.map[my][mx]['updatedOn'] * 1000);
			var cdate = new Date();
			var ydate = new Date();
			ydate.setDate(ydate.getDate() - 1);
			var bdate = new Date();
			bdate.setDate(bdate.getDate() - 2);
			if ( udate.getDate() == cdate.getDate() && udate.getMonth() == cdate.getMonth() ) {
				var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-today').attr('title',__('Heute aktualisiert'));
				mapzone.append(utd);
			}
			else if ( udate.getDate() == ydate.getDate() && udate.getMonth() == ydate.getMonth() ) {
				var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-yesterday').attr('title',__('Gestern aktualisiert'));
				mapzone.append(utd);
			}					
			else if ( udate.getDate() == bdate.getDate() && udate.getMonth() == bdate.getMonth() ) {
				var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-b4yesterday').attr('title',__('Vorgestern aktualisiert'));
				mapzone.append(utd);
			}
			else {
				var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-longago').attr('title',__('Irgendwann mal aktualisiert'));
				mapzone.append(utd);
			}
		}
		if ( data.map[my][mx]['citizens'] != undefined && !(rx == 0 && ry == 0) ) {
			var cc = 0;
			for ( cid in data.map[my][mx]['citizens'] ) {
				cc++;
			}
			if ( cc > 0 ) {
				var citidot = $(document.createElement('div')).addClass('citizen');
				citidot.attr('style','background: transparent url("' + fm_url + 'img/citidots.php?cs=2&cc=' + cc + '") no-repeat;');
				mapzone.append(citidot);
			}
		}
		if ( rzd > 0 ) {
			var zombdot = $(document.createElement('div')).addClass('zombies').addClass('hideme');
			zombdot.attr('style','background: transparent url("' + fm_url + 'img/citidots.php?cs=1&cc=' + rzd + '") no-repeat;');
			mapzone.append(zombdot);
		}
	}
	else {
		mapzone.addClass('nyv');
		if (data.scout != undefined && data.scout[my+mx] != undefined) {
			if ( data.scout[my+mx]['pbl'] == 1 ) {
				var building = $(document.createElement('div')).addClass('possible-building');
				mapzone.append(building);
			}
		}
	}
	if ( rx == 0 && ry == 0 ) {
		mapzone.addClass('city');
	}
	
	return mapzone;

}
function reMoveCitizen(id) {
	for ( i = 0; i < data['height']; i++ ) {
		for ( j = 0; j < data['width']; j++ ) {
			var ax = j;
			var ay = i;
			var mx = 'x' + j;
			var my = 'y' + i;
			var rx = j - data['tx'];
			var ry = data['ty'] - i;
			var rzd = null;
			if ( data.map[my] != undefined && data.map[my][mx] != undefined && data.map[my][mx]['citizens'] != undefined && data.map[my][mx]['citizens'][id] != undefined ) {
				delete data.map[my][mx]['citizens'][id];
				$('#x'+rx+'y'+ry).replaceWith(generateMapZone(ay,ax));
			}
		}
	}
}
function populateItemSelector() {
	for ( i in data.items ) {
		$('#item-selector-'+data.items[i]['category']).append(createItemDisplaySmall(i));
	}
}
function populateBuildingSelector() {
	for ( i in data.buildings ) {
		$('#building-selector').append(createBuildingDisplaySmall(i));
	}
}
function zoneItemList(x,y) {
	this.x = x;
	this.y = y;
}
function saveZoneItems(x,y,serial) {
	protectBox(true);
	$.ajax({
		type: "POST",
		url: "/fatamorgana/map/update",
		data: "key="+secureKey+"&action=ZONE-ITEMS&x="+(parseInt(x) + parseInt(data.tx))+"&y="+(parseInt(data.ty) - parseInt(y))+"&z="+serial,
		success: function(msg) {
			//alert(msg);
			$('#dynascript').append(msg);
			protectBox(false);
		}
	});
}
function saveBuildingGuess(x,y,bID) {
	protectBox(true);
	$.ajax({
		type: "POST",
		url: "/fatamorgana/map/update",
		data: "key="+secureKey+"&action=BUILDING-GUESS&x="+(parseInt(x) + parseInt(data.tx))+"&y="+(parseInt(data.ty) - parseInt(y))+"&z="+bID,
		success: function(msg) {
			//alert(msg);
			$('#dynascript').append(msg);
			protectBox(false);
		}
	});
}
function protectBox(state) {
	if ( state ) {
		$('#box-protection').css('height', $('#box').css('height'));
		$('#box-protection').css('width', $('#box').css('width'));
		$('#box-protection').removeClass('hideme');
	}
	else {
		$('#box-protection').addClass('hideme');
	}
}
function toggleGeoDirDisplay() {
	$('.mapzone').toggleClass('geodir');
}
function generateStormList() {
	if ( data.storm == undefined ) {
		return false;
	}
	
	var stormBox = $('#storms');
	var stormList = $(document.createElement('ul')).addClass('storm-list');
	var stormForm = $(document.createElement('div')).addClass('storm-form');
	stormForm.append('<select id="storm-today" name="storm-today"><option value="0">'+__('keine Beobachtung')+'</option></select>').append('<a class="interactive ajaxupdate" href="/fatamorgana/update/storm" id="UPDATE-STORM">'+__('speichern')+'</a>');
	stormBox.html('').append(stormForm).append(stormList);
	for ( i = 1; i < 9; i++ ) {
		$('#storm-today').append('<option value="'+i+'">'+data.stormnames[i-1]+'</option>');
	}
	for ( s in data.storm ) {
		if ( parseInt(s) == parseInt(data.system.day) ) {
			$('#storm-today').val(s);
		}
		if ( data.storm[s] > 0 ) {
			$('.storm-list').prepend('<li>'+__('Tag')+' '+s+': <strong>'+data.stormnames[data.storm[s]-1]+'</strong></li>');
		}
		else {
			$('.storm-list').prepend('<li>'+__('Tag')+' '+s+': <strong>'+__('keine Beobachtung')+'</strong></li>');
		}
	}
	
}
function generateExpeditionList() {
	if ( data.expeditions == undefined ) {
		return false;
	}	
	var expBox = $('#expeditions');
	var expList = $(document.createElement('ul')).addClass('exp-list');
	for ( e in data.expeditions ) {
		var expData = data.expeditions[e];
		var expEntry = $(document.createElement('li')).addClass('exp-item click').attr('id', e).html(expData.name);
		expList.prepend(expEntry);
		// expData.day + '.' + expData.creator
	}
	expList.prepend($(document.createElement('li')).addClass('exp-item click active-option').attr('id', '0.0').html(__('Anzeige ausblenden')));
	expBox.html('<p>'+__('ACHTUNG! Die Expeditionsanzeige ist noch im experimentellen Status.')+'</p>').append(expList);	
}
function highlightRoute(r) {
	$('.mapzone').removeClass('highlightRoute');
	$('.route-counter').remove();
	if ( r != '0.0' ) {
		var route = data.expeditions[r]['route'];
		var delayTimer = 100;
		var c = 0;
		for ( p in route ) {
			c++;
			//alert("highlightZone("+(parseInt(p.x) - parseInt(data.tx))+", "+(parseInt(data.ty) - parseInt(p.y))+");");
			//highlightZone((parseInt(route[p].x) - parseInt(data.tx)), (parseInt(data.ty) - parseInt(route[p].y)));
			var px = parseInt(route[p].x) - parseInt(data.tx);
			var py = parseInt(data.ty) - parseInt(route[p].y);
			setTimeout("highlightRouteZone("+px+","+py+","+c+")",delayTimer);
			delayTimer += 100;
		}
	}
}
function highlightRouteZone(x,y,c) {
	if ( !(x == 0 && y == 0) ) {
		if ( $('#x'+x+'y'+y+' .route-counter').length > 0 ) {
			$('#x'+x+'y'+y+' .route-counter').html($('#x'+x+'y'+y+' .route-counter').addClass('route-counter-multi').html() + ':' + c);
		}
		else {
			var cntdiv = $(document.createElement('div')).addClass('route-counter').html(c);
			$('#x'+x+'y'+y).addClass('highlightRoute').prepend(cntdiv);
		}
	}
}
function generateRuinList() {
	var awrBox = $('#ruins');
	var awrTable = $(document.createElement('table')).addClass('awr-table');
	var awr = {};
	var a = 0;
  var zones = 0;
  var ruins = 0;
	for ( y in data.map ) {
		var yrow = data.map[y];
		for ( x in yrow ) {
      zones++;
			var xcell = yrow[x];
			if ( xcell.building != undefined ) {
        ruins++;
				var bdata = xcell.building;
				bdata['x'] = xcell.rx;
				bdata['y'] = xcell.ry;
				bdata['ap'] = calcAP(xcell.rx, xcell.ry);
				bdata['km'] = calcKM(xcell.rx, xcell.ry);
				if ( bdata['blueprint'] == undefined ) {
					bdata['blueprint'] = 0;
				}
				bdata['explorable'] = isExplorable(bdata['type']);
				var gdn = calcGDN(xcell['rx'], xcell['ry']);
				if ( awr[gdn] == undefined ) {
					awr[gdn] = {};
				}
				if ( bdata['x'] != undefined && bdata['y'] != undefined ) {
					awr[gdn][a] = bdata;
				}
				a++;
			}
		}
	}
	for ( c in data.scout ) {
		var xcell = data.scout[c];
		if ( xcell.pbl != undefined && xcell.pbl == 1 ) {
			var coord = c.split('y')[1].split('x');
			if ( data.map['y'+coord[0]] == undefined || data.map['y'+coord[0]]['x'+coord[1]] == undefined ) {
				var bdata = {};
				bdata['name'] = '<em style="color:#666;">'+__('Vermutetes Gebäude')+'</em>';
				bdata['x'] = coord[1] - data.tx;
				bdata['y'] = data.ty - coord[0];
				bdata['ap'] = calcAP(bdata['x'], bdata['y']);
				bdata['km'] = calcKM(bdata['x'], bdata['y']);
				bdata['blueprint'] = 0;
				var gdn = calcGDN(bdata['x'], bdata['y']);
				if ( awr[gdn] == undefined ) {
					awr[gdn] = {};
				}
				awr[gdn][a] = bdata;
				a++;
			}
		}
	}	
	
	for ( gdn in awr ) {
		var stn = data.stormnames[gdn];
		var stc = 0;
		var stt = '';
		for ( sto in data.storm ) {
			if ( parseInt(data.storm[sto]) == (parseInt(gdn) + 1) ) {
				stc++;
			}
		}
		if ( stc > 0 ) {
			stt = ' <em>('+stc+'x '+__('Sturm')+')</em>';
		}
		var awrHeaderRow = $(document.createElement('tr')).addClass('awr-header').html('<th colspan="3">'+stn+stt+'</th>');
		awrTable.append(awrHeaderRow);
		var gdl = awr[gdn];
		for ( i in gdl ) {
			var b = gdl[i];
			var awrRow = $(document.createElement('tr')).addClass('awr-entry').html('<td class="pos-stat '+(b.dried != undefined && b.dried == 1 ? 'ruin-empty' : 'ruin-regen')+'"><abbr onmouseover="highlightSpecialZone('+b.x+','+b.y+');" onmouseout="downdarkSpecialZone('+b.x+','+b.y+');" onclick="$(\'#x'+(b.x)+'y'+(b.y)+'\').click();" class="ruin-coords" title="'+b.ap+'AP ('+b.km+'km)">['+b.x+'|'+b.y+']</abbr></td><td>'+'<img src="/fatamorgana/css/img/'+(b.explorable == true ? 'explore' : (b.blueprint != undefined && b.blueprint == 1 ? 'no-bp' : 'bp'))+'.png">'+'</td><td>'+(b.name != __('Ein nicht freigeschaufeltes Gebäude.') ? b.name : '<em style="color:#c00;"> '+b.dig+' '+__('Haufen')+' <img style="vertical-align:text-bottom;height:14px;" src="http://www.dieverdammten.de/gfx/forum/smiley/h_dig.gif"></em>' )+'</td>');
			awrTable.append(awrRow);
		}
	}
	awrBox.html('<p class="desc">' + __('{%1} von {%2} Zonen entdeckt ({%3}%).',[zones, (data.height * data.width), Math.round(zones / data.height / data.width * 100)]) + '<br>' + __('{%1} von 21 Ruinen entdeckt ({%2}%).',[ruins, Math.round(ruins / 21 * 100)]) + '</p>').append(awrTable);	
}
function generateCitizenList() {
	if ( data.citizens != undefined ) {
    var citBox = $('#citizens');
    var citTable = $(document.createElement('table')).addClass('cit-table');
    var cit = [];
    
    for ( cid in data.citizens ) {
      cit.push([cid, data.citizens[cid]['name']]);
    }
    cit.sort(function(a,b) { return a[1] > b[1] });
    
    for ( cco in cit ) {
      var ctd = data.citizens[cit[cco][0]];
      if (data.system.chaos == 0) {
        var citRow = $(document.createElement('tr')).addClass('cit-entry').html('<td class="pos-stat"><abbr onmouseover="highlightSpecialZone('+ctd.rx+','+ctd.ry+');" onmouseout="downdarkSpecialZone('+ctd.rx+','+ctd.ry+');" onclick="$(\'#x'+(ctd.rx)+'y'+(ctd.ry)+'\').click();" class="ruin-coords">['+ctd.rx+'|'+ctd.ry+']</abbr></td><td>'+ctd.name+'</td>');
      }
      else {
        var citRow = $(document.createElement('tr')).addClass('cit-entry').html('<td class="pos-stat"><abbr class="ruin-coords">[??|??]</abbr></td><td>'+ctd.name+'</td>');
      }
      citTable.append(citRow);
    }
    citBox.html('').append(citTable);	
  }
  if ( data.cadavers != undefined ) {
    var citTable = $(document.createElement('table')).addClass('cad-table');
        
    for (var d = data.system.day; d > 0; d--) {
      if ( data.cadavers[d] != undefined ) {
        var citRow = $(document.createElement('tr')).addClass('cad-day').html('<td colspan="2">' + __('Tag') + ' ' + d + '</td>');
        citTable.append(citRow);
        
        var cit = [];
        for ( cid in data.cadavers[d] ) {
          cit.push([cid, data.cadavers[d][cid]['name']]);
          reMoveCitizen(cid);
        }
        cit.sort(function(a,b) { return a[1] > b[1] });
        
        for ( cco in cit ) {
          var ctd = data.cadavers[d][cit[cco][0]];
          var citRow = $(document.createElement('tr')).addClass('cad-entry').html('<td class="dtype dtype-'+ctd.dtype+'" title="'+__('Tod Typ '+ctd.dtype)+'"></td><td '+(ctd.rx != undefined ? 'title="'+__('Letzter bekannter Aufenthaltsort')+': ['+ctd.rx+'|'+ctd.ry+']"' : '')+'>'+ctd.name+'</td>');
          citTable.append(citRow);
        }
      }
    }
    citBox.append(citTable);
  }
}
function generateConstructionList() {
  var conBox = $('#town-info');
	conBox.html('');
	if (data.constructions != undefined && Object.keys(data.constructions).length > 0 && data.mconstructions != undefined && data.mconstructions.length > 0) {
		var conHelpBox = $(document.createElement('p')).addClass('desc').html(__('Die XML-Daten sind aktuell, aber nicht sehr informativ. Die manuell übertragenen Daten haben höheren Informationswert, können aber nur von Hand an die FM gesendet werden.'));
		var switchXML = $(document.createElement('a')).addClass('constructions-xml interactive click').html('XML');
		var switchMAN = $(document.createElement('a')).addClass('constructions-man interactive click').html('Manuell');
		conHelpBox.prepend(switchMAN).prepend(switchXML);
		conBox.append(conHelpBox);
	}
  var con = {};
  var a = 0;
  if (data.constructions != undefined && Object.keys(data.constructions).length > 0) {
		var conTable = $(document.createElement('table')).addClass('construction-table construction-table-xml');
    var conHeaderRow = $(document.createElement('tr')).addClass('construction-header').html('<th colspan="2">'+__('Konstruktionen')+'</th>');
    conTable.append(conHeaderRow);
    for ( c in data.constructions ) {
      var concon = data.constructions[c];
      if ( concon.level != undefined ) {
        var level = ' (' + concon.level + ')';
      }
      else {
        var level = '';
      }
      var conRow = $(document.createElement('tr')).addClass('con-entry').html('<td class="con-icon'+(concon.temp == 1 ? ' temporary' : '')+'"><img src="http://data.dieverdammten.de/gfx/icons/'+concon.image+'.gif" /></td><td>'+concon.name+level+'</td>');
        conTable.append(conRow);
    }
		conBox.append(conTable);
  }
  if (data.mconstructions != undefined && data.mconstructions.length > 0) {
    var conTable = $(document.createElement('table')).addClass('construction-table construction-table-man');
		if (data.constructions != undefined && Object.keys(data.constructions).length > 0) {
			conTable.addClass('hideme');
		}
    if ( data.mconststamp != undefined ) {
			var conUpdateRow = $(document.createElement('tr')).addClass('construction-update').html('<td colspan="3">'+__('Stand: ')+data.mconststamp+' '+__('Uhr')+'</td>');
			conTable.append(conUpdateRow);
		}
		var conHeaderRow = $(document.createElement('tr')).addClass('construction-header').html('<th colspan="2">'+__('Konstruktion')+'</th><th>'+__('???')+'</th>');
    conTable.append(conHeaderRow);
		var mconid = 0;
    for ( c in data.mconstructions ) {
			mconid++;
      var concon = data.mconstructions[c];
      if ( concon.level != undefined ) {
        var level = ' (' + concon.level + ')';
      }
      else {
        var level = '';
      }
      var conRow = $(document.createElement('tr')).addClass('mcon-entry').addClass((concon.done == 1 ? 'mcon-done': (concon.lock == 1 ? 'mcon-lock' : 'mcon-active'))).addClass((mconid % 2 == 1 ? 'odd': 'even')).html('<td class="con-icon'+'">'+(concon.indent != undefined && concon.indent > 1 ? '<img src="http://data.dieverdammten.de/gfx/icons/small_parent.gif" />' : '')+(concon.indent != undefined && concon.indent > 0 ? '<img src="http://data.dieverdammten.de/gfx/icons/small_parent.gif" />' : '')+'<img src="'+concon.image+'" /></td><td class="'+(concon.indent != undefined && concon.indent == 0 ? 'item' : 'subitem')+'">'+concon.name+level+'</td><td>'+(concon.done == 1 ? __('✓'): (concon.lock == 1 ? __('x') : '<abbr title="'+__(' AP')+'">' + concon.ap + '</abbr>'))+'</td>');
        conTable.append(conRow);
    }
		conBox.append(conTable);
  } 
}
function isExplorable(buildingID) {
  var eba = new Array(100,101,102);  /* 17 */
  var length = eba.length;
    for(var i = 0; i < length; i++) {
        if(eba[i] == buildingID) return true;
    }
    return false;
}
function generateRuinMap(x,y) {
  $('#ruinmap').html('');
  for ( i = 0; i < 14; i++ ) {
    var maprow = $(document.createElement('ul')).addClass('maprow');
    for ( j = 0; j < 13; j++ ) {
      var ax = j;
      var ay = i;
      var mx = 'x' + j;
      var my = 'y' + i;
      var rx = j - 8;
      var ry = i;
      var rzd = null;
      
      var px = 'x' + x;
      var py = 'y' + y;
      maprow.append(generateRuinMapZone(i,j,data.map[py][px]['building']['ruin']));
    }
    var maprulerF = $(document.createElement('li')).addClass('mapruler').addClass('ruler_y'+ry).addClass('first').html(ry);
    var maprulerL = maprulerF.clone().removeClass('first').addClass('last');
    maprow.prepend(maprulerF);
    maprow.append(maprulerL);
    $('#ruinmap').append(maprow);
  }
  var maprulebarT = $(document.createElement('ul')).addClass('maprow').addClass('maprulebar').addClass('maprulebar-top');
  for ( j = 0; j < 13; j++ ) {
    var maprulex = $(document.createElement('li')).addClass('mapruler').addClass('ruler_x'+(j - 7)).html(j - 7);
    maprulebarT.append(maprulex);
  }
  var mapruleoF = $(document.createElement('li')).addClass('mapcorner').addClass('first');
  var mapruleoL = mapruleoF.clone().removeClass('first').addClass('last');
  maprulebarT.prepend(mapruleoF);
  maprulebarT.append(mapruleoL);
  var maprulebarB = maprulebarT.clone().removeClass('maprulebar-top').addClass('maprulebar-bottom');
  $('#ruinmap').prepend(maprulebarT);
  $('#ruinmap').append(maprulebarB);
  $('#ruinName').html(data.map[py][px]['building']['name']);
  $('.ruinCoordsX').html(x);
  $('.ruinCoordsY').html(y);
  
	if ( $('#ruinCX').html() != '' && $('#ruinCY').html() != '' && $('#ruinCX').html() != undefined && $('#ruinCY').html() != undefined ) {
		selectRuinZone($('#ruinmap #x'+$('#ruinCX').html()+'y'+$('#ruinCY').html()));
		data.crx = parseInt($('#ruinCX').html());
		data.cry = parseInt($('#ruinCY').html());
	}
	else {
		selectRuinZone($('#ruinmap #x0y1'));
		data.crx = 0;
		data.cry = 1;
	}
}
function generateRuinMapZone(i,j,ruin) {
  var ax = j;
  var ay = i;
  var mx = 'x' + j;
  var my = 'y' + i;
  var rx = j - 7;
  var ry = i;
  var rzd = null;
  var mapzone = $(document.createElement('li'));
      
  mapzone.addClass('mapzone').attr('rx',rx).attr('ry',ry).attr('ax',ax).attr('ay',ay);
  mapzone.attr('id','x'+rx+'y'+ry);
  if ( 7 == j && 0 == i ) {
    mapzone.addClass('ruinEntry');
  }
  else if ( 0 == i ) {
    mapzone.addClass('ruinFirstRow');
  }
  
  if ( ruin[my] != undefined && ruin[my][mx] != undefined ) {

    if ( ruin[my][mx]['items'] != undefined && ruin[my][mx]['items'].length > 0 && !(rx == 0 && ry == 0) ) {
      var zoneItems = ruin[my][mx]['items'];
      for ( zi in zoneItems ) {
        var zitem = zoneItems[zi];
        if ( data.items[zitem.id] != undefined ) {
          var ritem = data.items[zitem.id];
          if ( data.mapitems[ritem.category][ritem.id] != undefined ) {
            data.mapitems[ritem.category][ritem.id] += zitem.count;
          }
          else {
            data.mapitems[ritem.category][ritem.id] = zitem.count;
          }
        }           
      }         
    }     

    var zone = ruin[my][mx];
    
    if (ruin[my][mx]['tile'] != undefined) {
      mapzone.addClass('tile-'+ruin[my][mx]['tile']);
    }
    if (ruin[my][mx]['doorlock'] != undefined && ruin[my][mx]['doorlock'] != "undefined") {
      mapzone.addClass('doorlock-'+ruin[my][mx]['doorlock']);
    }
    else {
      if (ruin[my][mx]['door'] != undefined) {
        mapzone.addClass('door-'+ruin[my][mx]['door']);
      }
      if (ruin[my][mx]['lock'] != undefined) {
        mapzone.addClass('lock-'+ruin[my][mx]['lock']);
      }
    }
    if (ruin[my][mx]['z'] != undefined) {
      mapzone.attr('z',ruin[my][mx]['z']);
			mapzone.addClass('zombie-'+ruin[my][mx]['z']);
    }
    else {
      var zc = 0;
      mapzone.attr('z',0);
      mapzone.addClass('danger0');
    }
		if ( ruin[my][mx]['comment'] != undefined ) {
			mapzone.attr('comment',ruin[my][mx]['comment']);
			if (ruin[my][mx]['comment']!='') {
				mapzone.addClass('with-comment');
			}
		}
		else {
			mapzone.attr('comment','');
		}
    
    if ( ruin[my][mx]['updatedOn'] != undefined && !(rx == 0 && ry == 0) ) {
      var udate = new Date(ruin[my][mx]['updatedOn'] * 1000);
      var cdate = new Date();
      var ydate = new Date();
      ydate.setDate(ydate.getDate() - 1);
      var bdate = new Date();
      bdate.setDate(bdate.getDate() - 2);
      if ( udate.getDate() == cdate.getDate() && udate.getMonth() == cdate.getMonth() ) {
        var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-today').attr('title',__('Heute aktualisiert'));
        mapzone.append(utd);
      }
      else if ( udate.getDate() == ydate.getDate() && udate.getMonth() == ydate.getMonth() ) {
        var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-yesterday').attr('title',__('Gestern aktualisiert'));
        mapzone.append(utd);
      }         
      else if ( udate.getDate() == bdate.getDate() && udate.getMonth() == bdate.getMonth() ) {
        var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-b4yesterday').attr('title',__('Vorgestern aktualisiert'));
        mapzone.append(utd);
      }
    }
  }
  else if ( i > 0 ) {
    /*mapzone.addClass('nyv');*/
  }
  
  return mapzone;
}
function saveRoute() {
	if ($('input[name="routeSave-name"]').val().trim().length == 0) {
		$('input[name="routeSave-name"]').addClass('error');
		ajaxInfo(__('Bitte einen Namen für die Route eingeben.'));
		return false;
	}
	if ($('input[name="routeSave-no"]:checked').val() == undefined || $('input[name="routeSave-no"]:checked').val() == 0 || $('input[name="routeSave-no"]:checked').val() > 5) {
		ajaxInfo(__('Bitte eine Route wählen.'));
		return false;
	}
	eval("var coX = clickRX" + $('input[name="routeSave-no"]:checked').val() + ";");
	eval("var coY = clickRY" + $('input[name="routeSave-no"]:checked').val() + ";");
	var routeString = '';
	for (i in coX) {
		routeString = routeString + coX[i] + '-' + coY[i] + '_';
	}
	if (routeString == '') {
		ajaxInfo(__('Diese Route wurde nicht eingezeichnet.'));
		return false;
	}
	var token = secureKey;
	$.ajax({
		type: "POST",
		url: "/fatamorgana/map/updateRoutes",
		data: "key="+token+"&action=ADDROUTE&rname="+$('input[name="routeSave-name"]').val().trim()+"&route="+routeString,
		success: function(msg) {
			$('#dynascript').append(msg);
			/*protectRuinBox(false);*/
		}
	});
}

/*
 * ######################
 * # GENERATE THE MAP   #
 * # AND ALL INFO BOXES #
 * ######################
 */
$(document).ready(function() {
	var system = data['system'];
	var username = system['owner_name'];
	$('#owner-name').html(username);
	$('#townName').html(system['gamename']);
	$('#townDay').html(__('Tag')+' '+system['day']);
	$('#townID').html(__('ID')+': '+system['gameid']);
	$('#townSpy a').attr('href','http://dieverdammten.net/fatamorgana/spy/town/'+system['gameid']);
	for (i in system['days']) {
		var hislink = $(document.createElement('a')).attr('href','http://dieverdammten.net/fatamorgana/spy/town/'+system['gameid']+'/'+system['days'][i]).html(system['days'][i]);
		$('#townHistory').append(hislink);
	}
	$('#townBar').slideDown(500);
	
	if ( data.spy != undefined && data.spy == 1 ) {
		window.ajaxUpdate = function () { return false; }
	};
	
	if ( data.system.error_code != undefined ) {
		$('#box').remove();
		$('.mode-switch').remove();
		$('#fm-content').html('<p style="background:rgba(0,0,0,.7);padding:6px;border-radius:6px;color:#c00;">'+__('Es ist ein Fehler aufgetreten. Von DV wurde folgender Fehlercode gesendet')+': <strong>' + data.system.error_code + '</strong>.</p>');
	}
	$('#canvasDrawDiv').css('width', (data.width * 32)+'px');
  $('#canvasDrawDiv').css('height', (data.height * 32)+'px');
  $('#canvasPlanDiv').css('width', (data.width * 32)+'px');
  $('#canvasPlanDiv').css('height', (data.height * 32)+'px');
  
  if ( data.spy != undefined && data.spy == 1 ) {
     $('#ruinInfoBox').remove();
  }
	
	for ( i = 0; i < data['height']; i++ ) {
		var maprow = $(document.createElement('ul')).addClass('maprow');
		for ( j = 0; j < data['width']; j++ ) {
			var ax = j;
			var ay = i;
			var mx = 'x' + j;
			var my = 'y' + i;
			var rx = j - data['tx'];
			var ry = data['ty'] - i;
			var rzd = null;
			maprow.append(generateMapZone(i,j));
		}
		var maprulerF = $(document.createElement('li')).addClass('mapruler').addClass('ruler_y'+ry).addClass('first').html(ry);
		var maprulerL = maprulerF.clone().removeClass('first').addClass('last');
		maprow.prepend(maprulerF);
		maprow.append(maprulerL);
		$('#map').append(maprow);
	}
	var maprulebarT = $(document.createElement('ul')).addClass('maprow').addClass('maprulebar').addClass('maprulebar-top');
	for ( j = 0; j < data['width']; j++ ) {
		var maprulex = $(document.createElement('li')).addClass('mapruler').addClass('ruler_x'+(j - data['tx'])).html(j - data['tx']);
		maprulebarT.append(maprulex);
	}
	var mapruleoF = $(document.createElement('li')).addClass('mapcorner').addClass('first');
	var mapruleoL = mapruleoF.clone().removeClass('first').addClass('last');
	maprulebarT.prepend(mapruleoF);
	maprulebarT.append(mapruleoL);
	var maprulebarB = maprulebarT.clone().removeClass('maprulebar-top').addClass('maprulebar-bottom');
	$('#map').prepend(maprulebarT);
	$('#map').append(maprulebarB);
	
	// generate item data
	for ( c in data.mapitems ) {
		var itemsubbox = $('#item-info-'+data.mapitems[c]['cat']);
		//alert(data.mapitems[c]['cat']);
		for ( d in data.mapitems[c] ) {
			
			if ( d != 'cat' ) {
				var itemcount = data.mapitems[c][d];
				if ( data.items[Math.abs(d)] != undefined && itemcount > 0 ) {
					var raw_item = data.items[Math.abs(d)];
					var brokenItem = d < 0 ? ' broken' : '';
					var defItem = raw_item.category == 'Armor' ? ' defense' : '';
					itemsubbox.append('<div class="zone-item click'+brokenItem+defItem+'" state="0" ref="'+raw_item.id+'"><img src="'+data.system.icon+'item_'+raw_item.image+'.gif" title="'+raw_item.name+' (ID: '+Math.abs(raw_item.id)+')" />&nbsp;'+itemcount+'</div>');
				}
			}
		}
	}
	
	$('#map .mapzone').live({
			click: function() {
					data.cx = $(this).attr('rx');
					data.cy = $(this).attr('ry');
					selectZone($(this));
			},
			mouseover: function(e) {
					updateMapRulers($(this));
					if ( mapHoverActive ) {
						showMapHover(e, $(this).attr('id'));
					}
			},
			mouseout: function() {
					hideMapHover();
			},
			mousemove: function(e) {
					moveMapHover(e);
			}
	});
  $('#ruinmap .mapzone').live({
      click: function() {
          selectRuinZone($(this));
      },
      mouseover: function(e) {
          updateRuinMapRulers($(this));
      }
  });
	
	// fetch item clicks
	$('#item-info .zone-item, #bank-info .zone-item').live({
		click: function(e) {
			e.stopPropagation();
			$(this).attr('state', (parseInt($(this).attr('state')) + Math.pow(-1, $(this).attr('state'))));
			highlightZonesWithItem();
		}
	});
	
	// fetch category clicks
	$('#item-info .zone-item-cat, #bank-info .zone-item-cat').live({
		click: function() {
			var newState = parseInt($(this).attr('state')) + Math.pow(-1, $(this).attr('state'));
			$(this).attr('state', newState);
			$('#'+$(this).attr('id')+' .zone-item').attr('state', newState);
			highlightZonesWithItem();
		}
	});
	
	// item selector
	$('#item-selector .select-item').live({
		click: function() {
			data['saveItems'] = new zoneItemList(data.cx,data.cy);
			var selItemId = $(this).attr('ref');
			var zoneItemContainer = $('#zi_x'+data.cx+'_y'+data.cy);
			if ( zoneItemContainer != undefined ) {
				zoneItemContainer.children('.zone-item').each(function() {
					data.saveItems[$(this).attr('ref')] = $(this).attr('count');
				});
			}
			else {
				return false;
			}
			if ( data.saveItems[selItemId] != undefined ) {
				data.saveItems[selItemId]++;
				zoneItemContainer.children('.zone-item[ref="'+selItemId+'"]').attr('count', (data.saveItems[selItemId]));
				zoneItemContainer.children('.zone-item[ref="'+selItemId+'"]').children('.count').html(data.saveItems[selItemId]);
			}
			else {
				data.saveItems[selItemId] = 1;
				zoneItemContainer.append(createItemDisplay(selItemId,1,0));
			}
		}
	});
	$('.zone-items .zone-item.changeable').live({
		click: function() {
			data['saveItems'] = new zoneItemList(data.cx,data.cy);
			var selItemId = $(this).attr('ref');
			var zoneItemContainer = $('#zi_x'+data.cx+'_y'+data.cy);
			if ( zoneItemContainer != undefined ) {
				zoneItemContainer.children('.zone-item').each(function() {
					data.saveItems[$(this).attr('ref')] = $(this).attr('count');
				});
			}
			else {
				return false;
			}
			if ( parseInt(data.saveItems[selItemId]) > 0 ) {
				data.saveItems[selItemId]--;
			}
			zoneItemContainer.children('.zone-item[ref="'+selItemId+'"]').attr('count', (data.saveItems[selItemId]));
			zoneItemContainer.children('.zone-item[ref="'+selItemId+'"]').children('.count').html(data.saveItems[selItemId]);
		}
	});
	// manual item update
	$('a.toggle-item-update').live({
		click: function(e) {
			e.preventDefault();
			$('#item-selector').toggleClass('hideme');
			$('.zone-items-footer').slideToggle(500);
			$('.zone-items .zone-item').toggleClass('changeable');
		}
	});
	$('a.close-item-selector').live({
		click: function(e) {
			e.preventDefault();
			$('#item-selector').addClass('hideme');
			$('.zone-items-footer').slideUp(500);
			$('.zone-items .zone-item').removeClass('changeable');
		}
	});
	
	$('a#toggle-routeSave').live({
		click: function(e) {
			e.preventDefault();
			$('a#toggle-routeSave').hide();
			$('#routeSave-form').slideToggle(500);
		}
	});
	$('a#routeSave-cancel').live({
		click: function(e) {
			e.preventDefault();
			$('#routeSave-form').slideUp(500, function() {
				$('a#toggle-routeSave').show();
			});
		}
	});
	$('a#routeSave-save').live({
		click: function(e) {
			e.preventDefault();
			$('input[name="routeSave-name"]').removeClass('error');
			saveRoute();
		}
	});
	
	$('a.toggle-building-update').live({
		click: function(e) {
			e.preventDefault();
			$('#building-selector').toggleClass('hideme');
		}
	});
	
	$('a.constructions-xml').live({
		click: function(e) {
			e.preventDefault();
			$('.construction-table-man').addClass('hideme');
			$('.construction-table-xml').removeClass('hideme');
		}
	});
	$('a.constructions-man').live({
		click: function(e) {
			e.preventDefault();
			$('.construction-table-xml').addClass('hideme');
			$('.construction-table-man').removeClass('hideme');
		}
	});	
	
	$('a.ajaxsave').live({
		click: function(e) {
			e.preventDefault();
			$('#item-selector').addClass('hideme');
			$('.zone-items-footer').slideUp(500);
			$('.zone-items .zone-item').removeClass('changeable');
			if ( data.saveItems != undefined ) {
				//ajaxInfo('Einen Moment noch bitte');
				var pas = '';
				var pac = 0;
				for ( i in data.saveItems ) {
					if ( i != "x" && i != "y") {
						pas += 'i:'+i+';i:'+data.saveItems[i]+';';
						pac++;
					}
				}
				pas = 'a:'+pac+':{'+pas+'}';
				saveZoneItems(data.saveItems['x'], data.saveItems['y'], pas);
			}
			else {
				ajaxInfo(__('Keine Änderungen registriert.'));
			}
		}
	});
	
	$('div.select-building').live({
		click: function(e) {
			e.preventDefault();
			var bID = $(this).attr('ref');
			saveBuildingGuess(data.cx,data.cy,bID);
		}
	});
	
	$('div.ruinTile').live({
		click: function() {
			ajaxRuinUpdate('RUIN-TILE',$(this).attr('tile'));
		}
	});
  $('div.ruinDoorLock').live({
    click: function() {
      ajaxRuinUpdate('RUIN-DOORLOCK',$(this).attr('doorlock'));
    }
  });
	$('div.ruinDoor').live({
		click: function() {
			ajaxRuinUpdate('RUIN-DOOR',$(this).attr('door'));
		}
	});
	$('div.ruinLock').live({
		click: function() {
			ajaxRuinUpdate('RUIN-LOCK',$(this).attr('lock'));
		}
	});
	$('div.ruinZombie').live({
		click: function() {
			ajaxRuinUpdate('RUIN-ZOMBIE',$(this).attr('zombie'));
		}
	});
	$('#ruinComment-save').live({
		click: function() {
			ajaxRuinUpdate('RUIN-COMMENT',$('#ruinComment').val());
		}
	});
	
	// generate bank data
	for ( var a in data.bankSorted ) {
		var b = data.bankSorted[a];
		var item = data.bank[b];
		if ( data.items[b] != undefined ) {
			var raw_item = data.items[b];
			var brokenItem = item.broken == 1 ? ' broken' : '';
			var defItem = raw_item.category == 'Armor' ? ' defense' : '';
			$('#bank-info-'+raw_item.category).append('<div class="zone-item click'+brokenItem+defItem+'" state="0" ref="'+raw_item.id+'"><img src="'+data.system.icon+'item_'+raw_item.image+'.gif" title="'+raw_item.name+' ('+__('ID')+': '+Math.abs(raw_item.id)+')" />&nbsp;'+item.count+'</div>');
		}
	}
	
	// tab switcher box
	$("ul#box-tabs li.box-tab").click(function(e) { 
		e.preventDefault();
		$('li.box-tab').removeClass('active');
		$(this).addClass('active');
		var box = $(this).attr('ref');
		$('div.box-tab-content').addClass('hideme');
		$('div#'+box).removeClass('hideme');
		if ( box != 'zone-info') {
			$('#item-selector').addClass('hideme');
		}
	});
  $("ul#box-tabs li.box-spread").click(function(e) { 
    e.preventDefault();
    $('#map-wrapper').css('opacity',.1);
    $('#item-selector').addClass('hideme');
    $('li.box-tab').addClass('hideme');
    $('div.box-tab-content').each(function() {
      $(this).removeClass('hideme').addClass('spread-out');
    });
    $(this).addClass('hideme');
    $("ul#box-tabs li.box-unspread").removeClass('hideme');
  });
  $("ul#box-tabs li.box-unspread").click(function(e) { 
    e.preventDefault();
    $('div.box-tab-content').each(function() {
      $(this).removeClass('spread-out').addClass('hideme');
    });
    $('li.box-tab').removeClass('hideme');
    $('#map-wrapper').css('opacity',1);    
    $(this).addClass('hideme');
    $("ul#box-tabs li.box-spread").removeClass('hideme');
    $('#x'+(data.cx)+'y'+(data.cy)).click();
  });
	// tab switcher tools
	$("ul#tools-tabs li").click(function(e) { 
		e.preventDefault();
		$('li.tools-tab').removeClass('active');
		$(this).addClass('active')
		var box = $(this).attr('ref');
		$('div.tools-tab-content').addClass('hideme');
		$('div#'+box).removeClass('hideme');
	});
	
	// manual regeneration update
	$('a.ajaxlink').live({
		click: function(e) {
			e.preventDefault();
			ajaxUpdate($(this).attr('id'),$('#zombie-count-input').val());
		}
	});
	// manual zombie update
	$('a.toggle-zombie-update').live({
		click: function(e) {
			e.preventDefault();
			$('.zombie-count-change').fadeIn(250, function() { });
			$('.toggle-zombie-update').fadeOut(250, function() { $('#UPDATE-ZOMBIES, #UPDATE-SCOUTZOMBIES').fadeIn(500); });
		}
	});
	$('a#UPDATE-ZOMBIES').live({
		click: function(e) {
			e.preventDefault();
			$('.zombie-count-change').fadeOut(250, function() { });
			$('#UPDATE-ZOMBIES').fadeOut(250, function() { $('.toggle-zombie-update').fadeIn(500); });
			//ajaxUpdate($(this).attr('id'),$('#zombie-count-input').val());
		}
	});
	$('a#UPDATE-SCOUTZOMBIES').live({
		click: function(e) {
			e.preventDefault();
			$('.zombie-count-change').fadeOut(250, function() { });
			$('#UPDATE-SCOUTZOMBIES').fadeOut(250, function() { $('.toggle-zombie-update').fadeIn(500); });
		}
	});
  $('a#ENTER-BUILDING').live({
    click: function(e) {
      e.preventDefault();
      generateRuinMap($(this).attr('ocx'),$(this).attr('ocy'));
      $('#ruinmap-wrapper').slideDown(500);
    }
  });
  $('div#ruinmap-wrapper-close').click(function() {
    $('#ruinmap-wrapper').slideUp(500);
  });
	$('.zombie-count-change.minus').live({
		click: function(e) {
			var cval = $('#zombie-count-input').val();
			var nval = parseInt(cval) + 1;
			$('#zombie-count-input').val(nval);
			$('#zombie-count-display').html(nval);
		}
	});
	$('.zombie-count-change.plus').live({
		click: function(e) {
			var cval = $('#zombie-count-input').val();
			var nval = parseInt(cval) - 1;
			if ( nval < 0 ) { nval = 0; }
			$('#zombie-count-input').val(nval);
			$('#zombie-count-display').html(nval);
		}
	});
	
	$('a.ajaxupdate').live({
		click: function(e) {
			e.preventDefault();
			ajaxUpdate($(this).attr('id'),$('#storm-today').val());
		}
	});
	
	// fetch arrow keys
	$(document).keydown(function (e) {
			if ( $('#ruinmap-wrapper:visible').length == 1 ) {
				walkInTheRuin(e);
			}
			else {
				walkInTheDesert(e);
			}
	});
	
	// load color wheel
	$('#colorpicker').farbtastic('#opt-radius-color');

	// add radius
	$('#opt-radius-submit').click(function() {
		var color = $('input[name="opt-radius-color"]').val();
		var radius = $('input[name="opt-radius-number"]').val();
		var metric = $('input[name="opt-radius-metric"]:checked').val();
		addRadius(radius,metric,color);
	});
	
	// toggle display options
	$('.options-display-option').click(function() {
		var itemClass = $(this).attr('ref');
		$(this).toggleClass('active-option');
		$('.'+itemClass).toggleClass('hideme');
	});
	
	// toggle hover switch
	$('#options-display-zonehover.options-display-switch').click(function() {
		mapHoverActive = (mapHoverActive == true ? false : true);
		$(this).toggleClass('active-option');
	});
	// toggle geodir switch
	$('#options-display-geodir.options-display-switch').click(function() {
		toggleGeoDirDisplay();
		$(this).toggleClass('active-option');
	});
	
	// help switch
	$('.help-switch').click(function() {
		$('.help-switch').toggleClass('active');
		$('#help-section').toggleClass('hidefaq showfaq');
	});
	$('#help-section ul li').click(function() {
		$('#help-section ul li').removeClass('active');
		$(this).addClass('active');
	});
	// mode switch
	$('.mode-switch').click(function() {
		$('.mode-switch').removeClass('active-mode');
		$(this).addClass('active-mode');
		if ( $(this).attr('id') == 'mode-normal' ) {
			$('#canvasPlanDiv').addClass('hideme');
			$('#canvasDrawDiv').addClass('hideme');
			$('#tools').addClass('hideme');      
      $('#cape').addClass('hideme');
      $('#box').removeClass('hideme');
		}
		else if ( $(this).attr('id') == 'mode-planner' ) {
			$('#tab-tools-planner').click();
		}
		else if ( $(this).attr('id') == 'mode-draw' ) {
			$('#tab-tools-colors').click();
		}
		else if ( $(this).attr('id') == 'mode-cape' ) {
      $('#canvasPlanDiv').addClass('hideme');
      $('#canvasDrawDiv').addClass('hideme');
      $('#box').addClass('hideme');
      $('#tools').addClass('hideme');
      $('#cape').removeClass('hideme');
    }
	});
	$('#tab-tools-colors').click(function() {
		$('.mode-switch').removeClass('active-mode');
		$('#mode-draw').addClass('active-mode');
		$('#canvasPlanDiv').addClass('hideme');
		$('#canvasDrawDiv').removeClass('hideme');
		$('#box').addClass('hideme');
    $('#cape').addClass('hideme');
		$('#tools').removeClass('hideme');
	});
	$('#tab-tools-planner').click(function() {
		$('.mode-switch').removeClass('active-mode');
		$('#mode-planner').addClass('active-mode');
		$('#canvasDrawDiv').addClass('hideme');
		$('#canvasPlanDiv').removeClass('hideme');
		$('#box').addClass('hideme');
    $('#cape').addClass('hideme');
		$('#tools').removeClass('hideme');
	});
	
	// toggle display expeditions
	$('.exp-item').live({
		click: function() {
			$('.exp-item').removeClass('active-option');
			var rid = $(this).attr('id');
			$(this).toggleClass('active-option');
			highlightRoute(rid);
		}
	});
	
	// "click".current-zone
	data.cx = data.ox - data.tx;
	data.cy = data.ty - data.oy;
	$('#x'+(data.cx)+'y'+(data.cy)).click();
	
	$('#box').slideDown(500);
	
	$('li.city').live({
		mouseover: function() {
			toggleGeoDirDisplay();
		},
		mouseout: function() {
			toggleGeoDirDisplay();
		}
	});
	
	$('.ruinOption').live({
		mouseover: function() {
			$('#ruinHoverInfo').addClass('hovering').html($(this).attr('title'));
		},
		mouseout: function() {
			$('#ruinHoverInfo').removeClass('hovering').html('');
		}
	});
	
	// populate item selector
	populateItemSelector();
	// populate building selector
	populateBuildingSelector();
	
	// list storms & expeditions
	generateStormList();
	generateExpeditionList();
	generateRuinList();
	generateCitizenList();
  generateConstructionList();
  
  $('#x'+(data.cx)+'y'+(data.cy)).click();
  
  addRadius(11,"km","#00ffff");

}); // END GENERATE