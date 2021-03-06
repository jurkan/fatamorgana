function updateMapRulers(mapZone) {
	var rx = mapZone.attr('rx');
	var ry = mapZone.attr('ry');
	$('#map .mapruler').removeClass('hoverzone');
	$('#map .mapruler.ruler_y'+ry+',#map .mapruler.ruler_x'+rx ).addClass('hoverzone');
}
function selectZone(mapZone) {
	var rx = mapZone.attr('rx');
	var ry = mapZone.attr('ry');
	$('#map .mapzone, #map .mapruler').removeClass('selectedZone');
	$('#map #x'+rx+'y'+ry+',#map .mapruler.ruler_y'+ry+',#map .mapruler.ruler_x'+rx).addClass('selectedZone');
	var ax = mapZone.attr('ax');
	var ay = mapZone.attr('ay');
	updateBox(ax,ay,rx,ry);
}
function updateBox(x,y,rx,ry) {
	var zone;
	var infoBox = $('#box-content #zone-info');
	infoBox.html('<h3>Zone ['+rx+'|'+ry+']</h3>');
	infoBox.append('<p>Entfernung: '+ calcAP(rx,ry) +'AP, '+ calcKM(rx,ry) +'km</p>');
	if ( zone = data.map['y'+y]['x'+x] ) {
		// building
		if ( zone.building != undefined ) {
			if ( zone.building.dried != undefined && zone.building.dried == 1 ) {
				infoBox.append('<p class="zone-building"><strong>'+ zone.building.name +'</strong><br/><span class="minus">Gebäude ist leer.</span> <a class="interactive plus ajaxlink" href="/fm/update/building/regenerate" id="BUILDING-REGENERATE" ocx="'+x+'" ocy="'+y+'">regenerieren</a></p>');
			}
			else {
				infoBox.append('<p class="zone-building"><strong>'+ zone.building.name +'</strong><br/><span class="plus">Gebäude ist durchsuchbar.</span> <a class="interactive minus ajaxlink" href="/fm/update/building/deplete" id="BUILDING-DEPLETE" ocx="'+x+'" ocy="'+y+'">leeren</a></p>');
			}
		}
		// regeneration
		if ( zone.dried != undefined && zone.dried == 1 ) {
			infoBox.append('<p class="zone-status zone-status-empty"><img src="'+data.system.icon+'tag_5.gif" /> <span class="minus">Zone ist leer.</span> <a class="interactive plus ajaxlink" href="/fm/update/zone/regenerate" id="ZONE-REGENERATE" ocx="'+x+'" ocy="'+y+'">regenerieren</a></p>');
		}
		else if ( !(rx == 0 && ry == 0) ) {
			infoBox.append('<p class="zone-status zone-status-full"><img src="'+data.system.icon+'small_gather.gif" /> <span class="plus">Zone ist regeneriert.</span> <a class="interactive minus ajaxlink" href="/fm/update/zone/deplete" id="ZONE-DEPLETE" ocx="'+x+'" ocy="'+y+'">leeren</a></p>');
		}
		// zombies
		if (zone.z > 0) {
			infoBox.append('<p class="zone-zombies">'+ zone.z +' Zombies <a class="interactive" href="javascript:void(0);">aktualisieren</a></p>');
		}
		else if ( !(rx == 0 && ry == 0) ) {
			infoBox.append('<p class="zone-zombies">0 Zombies <a class="interactive" href="javascript:void(0);">aktualisieren</a></p>');
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
				infoBox.append('<p class="zone-citizens">'+ cc +' Bürger: '+ clist +'</p>');
			}
		}
		// items
		if ( zone['items'] != undefined && !(rx == 0 && ry == 0) ) {
			infoBox.append('<div id="zi_x'+rx+'_y'+ry+'" class="zone-items clearfix"></div>');
			for ( i in zone.items ) {
				var item = zone.items[i];
				if ( data.items[item.id] != undefined ) {
					var raw_item = data.items[item.id];
					var brokenItem = item.broken == 1 ? ' broken' : '';
					var defItem = raw_item.category == 'Armor' ? ' defense' : '';
					$('#zi_x'+rx+'_y'+ry).append('<div class="zone-item click'+brokenItem+defItem+'" state="0" ref="'+raw_item.id+'"><img src="'+data.system.icon+'item_'+raw_item.image+'.gif" title="'+raw_item.name+' (ID: '+Math.abs(item.id)+')" />&nbsp;'+item.count+'</div>');
				}
			}
		}
		// update status
		var monat = new Array("Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember");
		var updText = 'Letzte Aktualisierung ';
		if ( zone.updatedOn != undefined ) {
			var date = new Date(zone.updatedOn * 1000);
			
			updText += 'am ' + date.getDate() + '. ' + monat[date.getMonth()] + ' ' + date.getFullYear() + ', ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ' Uhr ';
		}
		if ( zone.updatedBy != undefined ) {
			updText += 'durch ' + zone.updatedBy;
		}
		infoBox.append('<p class="zone-lastupdate">'+updText+'</p>');
	}
	else {
		
	}
}
function calcAP(x,y) {
	return Math.abs(x) + Math.abs(y);
}
function calcKM(x,y) {
	return Math.round(Math.sqrt(x * x + y * y));
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
function addRadius(range,metric,color) {
	$('#dynascript').append('<style type="text/css">li.mapzone.highlight-'+radiusCounter+'-border-n { border-top-color: '+color+'; } li.mapzone.highlight-'+radiusCounter+'-border-e { border-right-color: '+color+'; } li.mapzone.highlight-'+radiusCounter+'-border-s { border-bottom-color: '+color+'; } li.mapzone.highlight-'+radiusCounter+'-border-w { border-left-color: '+color+'; }</style>');
	$('.mapzone['+metric+'="'+range+'"]').each(function(e) {
		var change = $(this).attr(metric+'c');
		for ( c = 0; c < change.length; c++ ) {
			$(this).addClass('highlight-radius').addClass('highlight-'+radiusCounter+'-border-'+change.charAt(c));
		}
	});
	$('#radius-list').append('<div class="radius-delete hideme click" id="radius-delete-'+radiusCounter+'" onclick="removeRadius('+radiusCounter+');"><div class="radius-color-example" style="background-color:'+color+';"></div><span>[löschen]</span>Radius '+radiusCounter+': '+range+' '+metric+'</div>');
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
            $('#x'+(data.cx)+'y'+(data.cy)).click();
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
		if ( data.map['y'+ay]['x'+ax]['dried'] != undefined ) {
			if ( data.map['y'+ay]['x'+ax]['dried'] == 1 ) {
				$('#map-hover-status').html('<strong class="minus">Zone ist leer.</strong>');
			}
			else {
				$('#map-hover-status').html('<strong class="plus">Zone ist buddelbar.</strong>');
			}
		}
		else {
			$('#map-hover-status').html(' ');
		}
		if ( data.map['y'+ay]['x'+ax]['z'] != undefined ) {
			if ( data.map['y'+ay]['x'+ax]['z'] == 1 ) {
				$('#map-hover-zombies').html('<strong class="minus">1 Zombie</strong>');
			}
			else {
				$('#map-hover-zombies').html('<strong class="minus">'+data.map['y'+ay]['x'+ax]['z']+' Zombies</strong>');
			}
		}
		else {
			$('#map-hover-zombies').html(' ');
		}
		if ( data.map['y'+ay]['x'+ax]['items'] != undefined && data.map['y'+ay]['x'+ax]['items'].length > 0 ) {
			var zone = data.map['y'+ay]['x'+ax];
			var itemBox = $('#map-hover-items');
			itemBox.html('<p><strong>Gegenstände auf dem Boden</strong></p>');
			itemBox.append('<div id="zh_x'+rx+'_y'+ry+'" class="zone-items clearfix"></div>');
			for ( i in zone.items ) {
				var item = zone.items[i];
				if ( data.items[item.id] != undefined ) {
					var raw_item = data.items[item.id];
					var brokenItem = item.broken == 1 ? ' broken' : '';
					var defItem = raw_item.category == 'Armor' ? ' defense' : '';
					$('#zh_x'+rx+'_y'+ry).append('<div class="zone-item click'+brokenItem+defItem+'" state="0" ref="'+raw_item.id+'"><img src="'+data.system.icon+'item_'+raw_item.image+'.gif" title="'+raw_item.name+' (ID: '+Math.abs(item.id)+')" />&nbsp;'+item.count+'</div>');
				}
			}
		}
		else {
			$('#map-hover-items').html(' ');
		}
	}
	else {
		$('#map-hover-status').html(' ');
		$('#map-hover-zombies').html(' ');
		$('#map-hover-items').html(' ');
	}
}
function ajaxUpdate(ec) {
	var el = $('#'+ec);
	var token = secureKey;
	var ocX = el.attr('ocx');
	var ocY = el.attr('ocy');
	var ocAction = ec;
	
	$.ajax({
		type: "POST",
		url: "/fm/map/update",
		data: "key="+token+"&action="+ocAction+"&x="+ocX+"&y="+ocY,
		success: function(msg) {
			$('#dynascript').append(msg);
		}
	});
}
function ajaxInfo(msg) {
	var responseItem = $(document.createElement('p')).addClass('ajaxInfo').addClass('hideme').html(msg);
	$('#userInfoBox').append(responseItem);
	responseItem.slideDown(200).delay(1000).fadeOut(500);
}

/*
 * ######################
 * # GENERATE THE MAP   #
 * # AND ALL INFO BOXES #
 * ######################
 */
$(document).ready(function() {
	var fm_url = 'http://dv.sindevel.com/fm/';
	var system = data['system'];
	var username = system['owner_name'];
	$('#owner-name').html(username);
	
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
			var mapzone = $(document.createElement('li')).addClass('mapzone').attr('rx',rx).attr('ry',ry).attr('ax',ax).attr('ay',ay);
			mapzone.attr('id','x'+rx+'y'+ry);
			if ( data.ox == j && data.oy == i ) {
				mapzone.addClass('selectedZone');
			}
			
			var ap = calcAP(rx,ry);
			var km = calcKM(rx,ry);
			mapzone.attr('ap',ap).attr('km',km);
			
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
			
				if ( data.map[my][mx]['danger'] != undefined && data.map[my][mx]['danger'] != null ) {
					mapzone.addClass('danger'+ data.map[my][mx]['danger']);
					rzd = data.map[my][mx]['danger'];
				}
				else if ( data.map[my][mx]['z'] != undefined && data.map[my][mx]['z'] != null ) {
					mapzone.attr('z',data.map[my][mx]['z']);
					if ( data.map[my][mx]['z'] == 0 ) {
						mapzone.addClass('danger0');
					}
					else if ( data.map[my][mx]['z'] == 1 ) {
						mapzone.addClass('danger1');
						rzd = 1;
					}
					else if ( data.map[my][mx]['z'] >= 2 && data.map[my][mx]['z'] <= 4 ) {
						mapzone.addClass('danger2');
						rzd = 2;
					}
					else if ( data.map[my][mx]['z'] >= 5 && data.map[my][mx]['z'] <= 8 ) {
						mapzone.addClass('danger3');
						rzd = 3;
					}
					else if ( data.map[my][mx]['z'] > 8 ) {
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
					mapzone.append(building);
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
						var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-today').attr('title','Heute aktualisiert');
						mapzone.append(utd);
					}
					else if ( udate.getDate() == ydate.getDate() && udate.getMonth() == ydate.getMonth() ) {
						var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-yesterday').attr('title','Gestern aktualisiert');
						mapzone.append(utd);
					}					
					else if ( udate.getDate() == bdate.getDate() && udate.getMonth() == bdate.getMonth() ) {
						var utd = $(document.createElement('div')).addClass('zone-updated').addClass('zone-updated-b4yesterday').attr('title','Vorgestern aktualisiert');
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
			}
			if ( rx == 0 && ry == 0 ) {
				mapzone.addClass('city');
			}
			maprow.append(mapzone);
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
					showMapHover(e, $(this).attr('id'));
			},
			mouseout: function() {
					hideMapHover();
			},
			mousemove: function(e) {
					moveMapHover(e);
			}
	});
	
	// fetch item clicks
	$('#item-info .zone-item, #town-info .zone-item').live({
		click: function(e) {
			e.stopPropagation();
			$(this).attr('state', (parseInt($(this).attr('state')) + Math.pow(-1, $(this).attr('state'))));
			highlightZonesWithItem();
		}
	});
	
	// fetch category clicks
	$('#item-info .zone-item-cat, #town-info .zone-item-cat').live({
		click: function() {
			var newState = parseInt($(this).attr('state')) + Math.pow(-1, $(this).attr('state'));
			$(this).attr('state', newState);
			$('#'+$(this).attr('id')+' .zone-item').attr('state', newState);
			highlightZonesWithItem();
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
			$('#town-info-'+raw_item.category).append('<div class="zone-item click'+brokenItem+defItem+'" state="0" ref="'+raw_item.id+'"><img src="'+data.system.icon+'item_'+raw_item.image+'.gif" title="'+raw_item.name+' (ID: '+Math.abs(raw_item.id)+')" />&nbsp;'+item.count+'</div>');
		}
	}
	
	// tab switcher
	$("ul#box-tabs li").click(function(e) { 
		e.preventDefault();
		$('li.box-tab').removeClass('active');
		$(this).addClass('active')
		var box = $(this).attr('ref');
		$('div.box-tab-content').addClass('hideme');
		$('div#'+box).removeClass('hideme');
	});
	
	// manual update
	$('a.ajaxlink').live({
		click: function(e) {
			e.preventDefault();
			ajaxUpdate($(this).attr('id'));
		}
	});
	
	// fetch arrow keys
	$(document).keydown(function (e) {
			walkInTheDesert(e);
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
	
	// "click".current-zone
	data.cx = data.ox - data.tx;
	data.cy = data.ty - data.oy;
	$('#x'+(data.cx)+'y'+(data.cy)).click();

}); // END GENERATE