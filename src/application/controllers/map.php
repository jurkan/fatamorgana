<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Map extends CI_Controller {

	public $debug = '';
	public $key = null;

	public function __construct() {
		parent::__construct();
		$this->load->model('System_model');
		$check = $this->System_model->check();
		if (!$check) {
			if ( $this->key = $this->input->post('key') ) {
				#redirect('login/skey/'.$skey);
			}
			elseif ( $this->key = $this->input->get('key') ) {
				#redirect('login/skey/'.$skey);
			}
			if ( !is_null($this->key) && $this->key != false  ) {
				redirect('login/skey/'.$this->key);
			}
			else {
				redirect('login');
			}
		}
		else {
			$this->key = $check;
		}
	}
	
	public function index() {
		$data['main_content'] = 'map_view';
		$data['secureKey'] = $this->key;
		$data['user_name'] = $this->session->userdata('user_name');
		$data['gamemap'] = $this->generateData();
		$data['debug'] = $this->System_model->getXMLsecure();
		$data['qrcode'] = $this->generateQR('http://fm.omameier.net/login/skey/'.$this->key);
		$data['bookmark'] = 'http://fm.omameier.net/login/skey/'.$this->key;		
		
		$this->load->view('includes/template', $data);
	}
	
	public function updateRoutes() {
		$xml = $this->System_model->getXMLsecure();
		$action = $this->input->post('action');
		$route = $this->input->post('route');
		$rname = $this->input->post('rname');
		$key = $this->input->post('key');
		$error = array();
		
		$game = $xml->headers->game;
		$day = (int) $game['days'];
		$gid = (int) $game['id'];
		$owner = $xml->headers->owner->citizen;
		$username = (string) $owner['name'];
		$userid = (string) $owner['id'];
		
		if ( $data = $this->System_model->getTownData($gid) ) {
			#$append .= ';ajaxInfo("Data unserialized from database")';
		}
		else {
			$error[] = 'Game data not found!';
			$action = '';
		}
		
		switch ( $action ) {
			case "ADDROUTE":
			{
				$path = array(array('x' => $data['tx'],'y' => $data['ty']));
				$curX = $data['tx'];
				$curY = $data['ty'];
				$rpoints = explode('_',$route);
				foreach ($rpoints AS $rp) {
					$rc = explode('-',$rp);
					if (count($rc) == 2) {
						if (!($rc[0] == $curX && $rc[1] == $curY)) {
							if ($rc[0] == $curX) {
								if ($rc[1] < $curY) {
									for ($i = $curY - 1; $i >= $rc[1]; $i--) {
										$path[] = array(
											'x' => (int) $rc[0],
											'y' => (int) $i,
										);
									}
									$curY = $rc[1];
								}
								else {
									for ($i = $curY + 1; $i <= $rc[1]; $i++) {
										$path[] = array(
											'x' => (int) $rc[0],
											'y' => (int) $i,
										);
									}
									$curY = $rc[1];
								}
							}
							elseif ($rc[1] == $curY) {
								if ($rc[0] < $curX) {
									for ($i = $curX - 1; $i >= $rc[0]; $i--) {
										$path[] = array(
											'x' => (int) $i,
											'y' => (int) $rc[1],
										);
									}
									$curX = $rc[0];
								}
								else {
									for ($i = $curX + 1; $i <= $rc[0]; $i++) {
										$path[] = array(
											'x' => (int) $i,
											'y' => (int) $rc[1],
										);
									}
									$curX = $rc[0];
								}
							}
						}
					}
				}
				array_shift($path);
				$newroute = array(
					'creator' => $userid,
					'day' => $day,
					'name' => 'Tag ' . $day . ': ' . $rname . ' ('.$username.' via FM) ['.(count($path)).'AP]',
					'route' => (object) $path,
				);
				
				$newroute['route'] = (object) $path;
				$data['expeditions']['fm.'.$userid.'.'.time()] = $newroute;
				$res_scr = '';
				$res_msg = 'Route wurde gespeichert. Bitte FM neu laden, um sie im Kartenmodus zu sehen.';
			}
		}
		
		$append = '';
		if ( count($error) == 0 ) { 
			$this->System_model->saveTowndata($gid,$data['system']['day'],$userid,serialize($data));
			$data['response'] = $res_scr."\n".'ajaxInfo("'.$res_msg.'");'.$append;
		}
		elseif ( count($error) > 0 ) {
			$msg = implode(" ", $error);
			$data['response'] = 'alert("'.$msg.'");';
		}
		$this->load->view('includes/ajaxtemplate', $data);
	}
	
	public function update() {
		$xml = $this->System_model->getXMLsecure();
		$action = $this->input->post('action');
		$x = $this->input->post('x');
		$y = $this->input->post('y');
		$z = $this->input->post('z');
		$key = $this->input->post('key');
		$error = array();
		
		$game = $xml->headers->game;
		$day = (int) $game['days'];
		$gid = (int) $game['id'];
		$owner = $xml->headers->owner->citizen;
		$username = (string) $owner['name'];
		$userid = (string) $owner['id'];
		
		if ( $data = $this->System_model->getTownData($gid) ) {
			#$append .= ';ajaxInfo("Data unserialized from database")';
		}
		else {
			$error[] = 'Game data not found!';
			$action = '';
		}
		$zoneUpdate = false;
		$scoutUpdate = false;
		
		$ruinInit = array(
			'tile' => 0,
			'z' => 0,
			'door' => 0,
			'lock' => 0,
			'comment' => ''
		);
		
		switch ( $action ) {
			case "ZONE-REGENERATE":
			{
				$data['map']['y'.$y]['x'.$x]['dried'] = 0;
				$res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["dried"] = 0;'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Zone wurde regeneriert.';
				$zoneUpdate = true;
				break;
			}
			case "ZONE-DEPLETE":
			{
				$data['map']['y'.$y]['x'.$x]['dried'] = 1;
				$res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["dried"] = 1;'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Zone wurde geleert.';
				$zoneUpdate = true;
				break;
			}
			case "BUILDING-REGENERATE":
			{
				$data['map']['y'.$y]['x'.$x]['building']['dried'] = 0;
				$res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["dried"] = 0;'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Gebäude wurde regeneriert.';
				$zoneUpdate = true;
				break;
			}
			case "BUILDING-DEPLETE":
			{
				$data['map']['y'.$y]['x'.$x]['building']['dried'] = 1;
				$res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["dried"] = 1;'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Gebäude wurde geleert.';
				$zoneUpdate = true;
				break;
			}
			case "BLUEPRINT-AVAILABLE":
			{
				$data['map']['y'.$y]['x'.$x]['building']['blueprint'] = 0;
				$res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["blueprint"] = 0;'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Blueprint ist wieder verfügbar.';
				$zoneUpdate = true;
				break;
			}
			case "BLUEPRINT-FOUND":
			{
				$data['map']['y'.$y]['x'.$x]['building']['blueprint'] = 1;
				$res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["blueprint"] = 1;'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Blueprint wurde gefunden.';
				$zoneUpdate = true;
				break;
			}
			case "BUILDING-GUESS":
			{
				$data['map']['y'.$y]['x'.$x]['building']['guess'] = $z;
				$res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["guess"] = '.$z.';'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Vermutung wurde eingetragen.';
				$zoneUpdate = true;
				break;
			}
			case "ZONE-ADDSOUL":
      {
        $data['map']['y'.$y]['x'.$x]['lostsoul'] = 1;
        $res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["lostsoul"] = 1;'
                  . '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
                  . '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
        $res_msg = 'Verlorene Seele hinzugefügt.';
        $zoneUpdate = true;
        break;
      }
      case "ZONE-DELSOUL":
      {
        $data['map']['y'.$y]['x'.$x]['lostsoul'] = 0;
        $res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["lostsoul"] = 0;'
                  . '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
                  . '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
        $res_msg = 'Verlorene Seele entfernt.';
        $zoneUpdate = true;
        break;
      }
      case "UPDATE-ZOMBIES":
			{
				$data['map']['y'.$y]['x'.$x]['z'] = $z;
				$res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["z"] = '.$z.';'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Zombies wurden gespeichert.';
				$zoneUpdate = true;
				break;
			}
			case "UPDATE-SCOUTZOMBIES":
			{
				if ( !isset($data['scout']['y'.$y.'x'.$x]['pbl']) ) {
					$data['scout']['y'.$y.'x'.$x]['pbl'] = 0;
				}
				$data['scout']['y'.$y.'x'.$x]['zom'] = $z;
				$res_scr = 'data.scout["y'.$y.'x'.$x.'"] = new Array();data.scout["y'.$y.'x'.$x.'"]["zom"] = '.$z.';data.scout["y'.$y.'x'.$x.'"]["pbl"] = '.$data['scout']['y'.$y.'x'.$x]['pbl'].';'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Zombies (Scout) wurden gespeichert.';
				$scoutUpdate = true;
				break;
			}
			case "BUILDING-PROBABLE":
			{
				if ( !isset($data['scout']['y'.$y.'x'.$x]['zom']) ) {
					$data['scout']['y'.$y.'x'.$x]['zom'] = 0;
				}
				$data['scout']['y'.$y.'x'.$x]['pbl'] = 1;
				$res_scr = 'data.scout["y'.$y.'x'.$x.'"] = new Array();data.scout["y'.$y.'x'.$x.'"]["pbl"] = 1;data.scout["y'.$y.'x'.$x.'"]["zom"] = '.$data['scout']['y'.$y.'x'.$x]['zom'].';';
				$res_msg = 'Gebäudevermutung wurde gespeichert.';
				$scoutUpdate = true;
				break;
			}
			case "BUILDING-NOTPROBABLE":
			{
				if ( !isset($data['scout']['y'.$y.'x'.$x]['zom']) ) {
					$data['scout']['y'.$y.'x'.$x]['zom'] = 0;
				}
				$data['scout']['y'.$y.'x'.$x]['pbl'] = 0;
				$res_scr = 'data.scout["y'.$y.'x'.$x.'"] = new Array();data.scout["y'.$y.'x'.$x.'"]["pbl"] = 0;data.scout["y'.$y.'x'.$x.'"]["zom"] = '.$data['scout']['y'.$y.'x'.$x]['zom'].';';
				$res_msg = 'Gebäudevermutung wurde gespeichert.';
				$scoutUpdate = true;
				break;
			}
			case "CITIZEN-LOCATION":
			{
				$oid = (string) $owner['id'];
				foreach ( $data['map'] AS $ly => $ydata ) {
					foreach ( $ydata AS $lx => $zone ) {
						if ( isset($zone['citizens'][$oid]) ) {
							unset($data['map'][$ly][$lx]['citizens'][$oid]);
						}
					}
				}
				$data['map']['y'.$y]['x'.$x]['citizens'][$oid] = array('name' => (string) $owner['name'], 'job' => (string) $owner['job']);
				$res_scr = 'reMoveCitizen("'.$oid.'");'
									. 'if ( data.map["y'.$y.'"]["x'.$x.'"]["citizens"] == undefined ) { data.map["y'.$y.'"]["x'.$x.'"]["citizens"] = new Array(); }'
									. 'data.map["y'.$y.'"]["x'.$x.'"]["citizens"]["'.$oid.'"] = new Array();'
									. 'data.map["y'.$y.'"]["x'.$x.'"]["citizens"]["'.$oid.'"]["name"] = "'.((string) $owner['name']).'";'
									. 'data.map["y'.$y.'"]["x'.$x.'"]["citizens"]["'.$oid.'"]["job"] = "'.((string) $owner['job']).'";'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Deine Position wurde gespeichert.';
				$zoneUpdate = true;
				break;
			}
			case "ZONE-ITEMS":
			{
				$jitems = unserialize($z);
				// a:1:{i:0;a:3:{s:2:"id";i:81;s:5:"count";i:1;s:6:"broken";i:0;}}
				$items = array();
				foreach ( $jitems AS $id => $count) {
					if ( $count > 0 ) {
						$items[] = array(
							'id' => $id,
							'count' => $count,
							'broken' => ($id < 0 ? 1 : 0),
						);
					}
				}
				#array_filter($items);
				$data['map']['y'.$y]['x'.$x]['items'] = $items;
				$res_scr = 'var newItems = '.json_encode($items).';'
									. 'data.map["y'.$y.'"]["x'.$x.'"]["items"] = newItems;'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").replaceWith(generateMapZone('.$y.','.$x.'));'
									. '$("#x'.$data['map']['y'.$y]['x'.$x]['rx'].'y'.$data['map']['y'.$y]['x'.$x]['ry'].'").click();';
				$res_msg = 'Gegenstände wurden gespeichert.';
				$zoneUpdate = true;
				break;
			}
			case "RUIN-TILE":
			{
				$zdata = explode("|",$z);
				$zdata[0] = $zdata[0] + 7;
				if ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]] = array(
						'x'.$zdata[0] => array(
							'tile' => 0,
							'z' => 0,
							'door' => 0,
							'lock' => 0
						)
					);
				}
				elseif ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]] = array(
							'tile' => 0,
							'z' => 0,
							'door' => 0,
							'lock' => 0
					);
				}
				$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]['tile'] = $zdata[2];
				
				$res_scr = 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] = new Array(); } '
									. 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] = new Array(); } '
									. 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"]["tile"] = '.$zdata[2].';'
									. 'generateRuinMap('.$x.','.$y.'); $("#ruinmap-wrapper").slideDown(500);';
				$res_msg = 'Ruinenfeld gespeichert.';
				$zoneUpdate = false;
				break;
			}
      case "RUIN-DOORLOCK":
      {
        $zdata = explode("|",$z);
        $zdata[0] = $zdata[0] + 7;
        if ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]) ) {
          $data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]] = array(
            'x'.$zdata[0] => $ruinInit
          );
        }
        elseif ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]) ) {
          $data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]] = $ruinInit;
        }
        $data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]['doorlock'] = $zdata[2];
        
        $res_scr = 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] = new Array(); } '
                  . 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] = new Array(); } '
                  . 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"]["doorlock"] = '.$zdata[2].';'
                  . 'generateRuinMap('.$x.','.$y.'); $("#ruinmap-wrapper").slideDown(500);';
        $res_msg = 'Ruinenfeld gespeichert.';
        $zoneUpdate = false;
        break;
      }
			case "RUIN-DOOR":
			{
				$zdata = explode("|",$z);
				$zdata[0] = $zdata[0] + 7;
				if ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]] = array(
						'x'.$zdata[0] => $ruinInit
					);
				}
				elseif ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]] = $ruinInit;
				}
				$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]['door'] = $zdata[2];
				
				$res_scr = 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] = new Array(); } '
									. 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] = new Array(); } '
									. 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"]["door"] = '.$zdata[2].';'
									. 'generateRuinMap('.$x.','.$y.'); $("#ruinmap-wrapper").slideDown(500);';
				$res_msg = 'Ruinenfeld gespeichert.';
				$zoneUpdate = false;
				break;
			}
			case "RUIN-LOCK":
			{
				$zdata = explode("|",$z);
				$zdata[0] = $zdata[0] + 7;
				if ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]] = array(
						'x'.$zdata[0] => $ruinInit
					);
				}
				elseif ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]] = $ruinInit;
				}
				$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]['lock'] = $zdata[2];
				
				$res_scr = 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] = new Array(); } '
									. 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] = new Array(); } '
									. 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"]["lock"] = '.$zdata[2].';'
									. 'generateRuinMap('.$x.','.$y.'); $("#ruinmap-wrapper").slideDown(500);';
				$res_msg = 'Ruinenfeld gespeichert.';
				$zoneUpdate = false;
				break;
			}
			case "RUIN-ZOMBIE":
			{
				$zdata = explode("|",$z);
				$zdata[0] = $zdata[0] + 7;
				if ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]] = array(
						'x'.$zdata[0] => $ruinInit
					);
				}
				elseif ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]] = $ruinInit;
				}
				$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]['z'] = $zdata[2];
				
				$res_scr = 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] = new Array(); } '
									. 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] = new Array(); } '
									. 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"]["z"] = '.$zdata[2].';'
									. 'generateRuinMap('.$x.','.$y.'); $("#ruinmap-wrapper").slideDown(500);';
				$res_msg = 'Ruinenfeld gespeichert.';
				$zoneUpdate = false;
				break;
			}
			case "RUIN-COMMENT":
			{
				$z = strip_tags($z);
				$z = str_replace(array("\n","\r",'"',"'",'`'),array('\n','\r','´','´','´'),$z);
				$zdata = explode("|",$z);
				$zdata[0] = $zdata[0] + 7;
				if ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]] = array(
						'x'.$zdata[0] => $ruinInit
					);
				}
				elseif ( !isset($data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]) ) {
					$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]] = $ruinInit;
				}
				$data['map']['y'.$y]['x'.$x]['building']['ruin']['y'.$zdata[1]]['x'.$zdata[0]]['comment'] = $zdata[2];
				
				$res_scr = 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"] = new Array(); } '
									. 'if (data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] == undefined) { data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"] = new Array(); } '
									. 'data.map["y'.$y.'"]["x'.$x.'"]["building"]["ruin"]["y'.$zdata[1].'"]["x'.$zdata[0].'"]["comment"] = "'.$zdata[2].'";'
									. 'generateRuinMap('.$x.','.$y.'); $("#ruinmap-wrapper").slideDown(500);';
				$res_msg = 'Ruinenfeld gespeichert.';
				$zoneUpdate = false;
				break;
			}
			case "UPDATE-STORM":
			{
				$data['storm'][$day] = $z;
				$res_scr = 'data.storm["'.$day.'"] = '.$z.';'
									. 'generateStormList();';
				$res_msg = 'Sturm wurde gespeichert.';
				$zoneUpdate = false;
				break;
			}
		}
		if ( $zoneUpdate == true ) {	
			$data['map']['y'.$y]['x'.$x]['updatedOn'] = time();
			$data['map']['y'.$y]['x'.$x]['updatedBy'] = $username;
			$res_scr = 'data.map["y'.$y.'"]["x'.$x.'"]["updatedOn"] = '.time().';'
				.	'data.map["y'.$y.'"]["x'.$x.'"]["updatedBy"] = "'.$username.'";'
				. $res_scr;
		}
		elseif ( $scoutUpdate == true ) {	
			$rx = $x - $data['tx'];
			$ry = $data['ty'] - $y;
			$data['scout']['y'.$y.'x'.$x]['updatedOn'] = time();
			$data['scout']['y'.$y.'x'.$x]['updatedBy'] = $username;
			$res_scr = $res_scr
				. 'data.scout["y'.$y.'x'.$x.'"]["updatedOn"] = '.time().';'
				.	'data.scout["y'.$y.'x'.$x.'"]["updatedBy"] = "'.$username.'";'
				. '$("#x'.$rx.'y'.$ry.'").replaceWith(generateMapZone('.$y.','.$x.'));'
				. '$("#x'.$rx.'y'.$ry.'").click();';
		}
		
		$append = '';
		if ( count($error) == 0 ) { 
			$this->System_model->saveTowndata($gid,$data['system']['day'],$userid,serialize($data));
			$data['response'] = $res_scr."\n".'ajaxInfo("'.$res_msg.'");'.$append;
		}
		elseif ( count($error) > 0 ) {
			$msg = implode(" ", $error);
			$data['response'] = 'alert("'.$msg.'");';
		}
		$this->load->view('includes/ajaxtemplate', $data);
	}
	
	public function generateData() {
		$xml = $this->System_model->getXMLsecure();
		#var_export($xml);
		#$oodata = unserialize('');	
		$error = $xml->error;
		$error_code = (string) $error['code'];
		if ( isset($error_code) && $error_code != '' ) {
			$headers = $xml->headers;
			$owner = $xml->headers->owner->citizen;
			$data = array();
			$data['system']['owner_name'] = (string) $owner['name'];
			$data['system']['error_code'] = $error_code;
			return json_encode($data);
		}
		
		$headers = $xml->headers;
		$game = $xml->headers->game;
		$owner = $xml->headers->owner->citizen;
		$myzone = $xml->headers->owner->myZone;
		
		$xmldata = $xml->data;
		$map = $xmldata->map;
		$city = $xmldata->city;
		$citizens = $xmldata->citizens;
    $cadavers = $xmldata->cadavers;
    $upgrades = $xmldata->upgrades;
		$bank = $xmldata->bank;
		$expeditions = $xmldata->expeditions;
		
		$day = (int) $game['days'];
		$gid = (int) $game['id'];
		 
		$append = '';
		if ( $data = $this->System_model->getTownData($gid) ) {
			#$append .= ';ajaxInfo("Data unserialized from database")';
			$data['system']['days'] = $this->System_model->getTownDays($gid);
		}
		else { 
			$data = array();
		}
		// Unset expeditions
		#unset($data['expeditions']['fm.3137.1348141432']);

		
		$item_stat = false;
		$item_file = dirname(dirname(dirname( __FILE__ ))) . '/data/common/items';
		if ( file_exists($item_file) ) {
			$item_stat = stat($item_file);
			$item_data = unserialize(file_get_contents($item_file));
		}		
		$updateItems = false;
		
		$building_stat = false;
		$building_file = dirname(dirname(dirname( __FILE__ ))) . '/data/common/buildings';
		if ( file_exists($building_file) ) {
			$building_stat = stat($building_file);
			$building_data = unserialize(file_get_contents($building_file));
		}		
		$updateBuildings = false;
		
		
		// owner update
		$data['system']['owner_name'] = (string) $owner['name'];
		$data['system']['owner_id'] = (string) $owner['id'];
		$data['ox'] = (int) $owner['x'];
		$data['oy'] = (int) $owner['y'];
		$data['system']['day'] = $day;
		$data['system']['gameid'] = $gid;
		$data['system']['gamename'] = (string) $city['city'];
		$data['system']['hard'] = $hard = (int) $city['hard'];
		$data['system']['chaos'] = $chaos = (int) $city['chaos'];
		$data['system']['devast'] = $devast = (int) $city['devast'];
		$data['system']['autoUpdateEnabled'] = $aue = ($hard == 0 && $chaos == 0 && $devast == 0 ? true : false);
		if ( !isset($data['storm']) ) {
			$data['storm'] = array();
			$data['stormnames'] = array('Norden','Nordosten','Osten','Südosten','Süden','Südwesten','Westen','Nordwesten');
		}
			
		if ( !isset($data['timestamp']) || (isset($data['timestamp']) && (time() - $data['timestamp']) > 30) || $data['system']['owner_id'] == 3137 ) {	
			$data['system']['icon'] = (string) $headers['iconurl'];
			$data['system']['avatar'] = (string) $headers['avatarurl'];
			$data['system']['secure'] = (int) $headers['secure'];
			$data['system']['xmlversion'] = (string) $headers['version'];
			
			$data['system']['quarantine'] = (int) $game['quarantine'];
			$data['system']['gametime'] = (string) $game['datetime'];
			$data['system']['datatime'] = (string) $xmldata['cache-date'];
			
			$data['height'] = (int) $map['hei'];
			$data['width'] = (int) $map['wid'];
			$data['tx'] = (int) $city['x'];
			$data['ty'] = (int) $city['y'];
			
			// zones
			foreach ( $map->children() AS $zdata ) {
				// core xml data
				$zx = (int) $zdata['x']; // x
				$zy = (int) $zdata['y']; // y
				$zv = (int) $zdata['nvt']; // visited (bool)
				
				$zz = (isset($zdata['z']) && !is_null($zdata['z']) ? (int) $zdata['z'] : null); // zombies
				$zt = (isset($zdata['tag']) && !is_null($zdata['tag']) ? (int) $zdata['tag'] : null); // tag
				$zd = (isset($zdata['danger']) && !is_null($zdata['danger']) ? (int) $zdata['danger'] : null); // danger
				if ( is_null($zd) && !is_null($zz) ) {
					if ( $zz == 0 ) { $zd = 0; }
					elseif ( $zz > 0 && $zz < 2 ) { $zd = 1; }
					elseif ( $zz > 1 && $zz < 5 ) { $zd = 2; }
					elseif ( $zz > 4 && $zz < 9 ) { $zd = 3; }
					elseif ( $zz > 8 ) { $zd = 4; }
				}
				elseif ( is_null($zd) && $zv == 0 ) {
					$zd = 0;
				}
        if ( !isset($data['map']['y'.((string) $zy)]['x'.((string) $zx)]) ) {
          $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['dried'] = 0;
        }
			
				// building data
				if ( $building = $zdata->building ) {
					if ( !isset($building_data[(int) $building['type']]) ) {
						$building_data[(int) $building['type']] = (string) $building['name'];
						$updateBuildings = true;
					}
					if ( !isset($data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']) ) {
						$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building'] = array('name' => (string) $building['name'], 'type' => (int) $building['type'], 'dig' => (int) $building['dig'], 'content' => (string) $building['content']);
            if (in_array((int) $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']['type'],array(17,100,101,102))) {
              $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']['ruin'] = array(
                'y0' => array(
                  'x7' => array(
                    'z' => 0,
                    'tile' => 5,
                  ),
                ),
              );
            }
					}
					else {
						$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']['name'] = (string) $building['name'];
						$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']['type'] = (string) $building['type'];
						$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']['dig'] = (string) $building['dig'];
						$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']['content'] = (string) $building['content'];
            if (in_array((int) $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']['type'],array(17,100,101,102)) && !isset($data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']['ruin'])) {
              $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']['ruin'] = array(
                'y0' => array(
                  'x7' => array(
                    'z' => 0,
                    'tile' => 3,
                  ),
                ),
              );
            }
					}
				}
				else {
					unset($data['map']['y'.((string) $zy)]['x'.((string) $zx)]['building']);
				}
				$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['nyv'] = 0;
				if ( !is_null($zz) ) { $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['z'] = $zz; }
				if ( !is_null($zv) ) { $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['nvt'] = $zv; }
				if ( !is_null($zt) ) { $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['tag'] = $zt; }
				if ( !is_null($zd) ) { $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['danger'] = $zd; }
				if ( is_null($zd) && !is_null($zv) && $zv == 1 ) { unset($data['map']['y'.((string) $zy)]['x'.((string) $zx)]['danger']); }
				if ( !is_null($zd) && $zd == 0 && !is_null($zv) && $zv == 0 && is_null($zz) && (!isset($data['map']['y'.((string) $zy)]['x'.((string) $zx)]['z']) || $data['map']['y'.((string) $zy)]['x'.((string) $zx)]['z'] > 0 && date("z",$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['updatedOn']) != date("z",time()) )) {
					$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['z'] = 0;
					#$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['updatedOn'] = time();
					#$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['updatedBy'] = "Wachturm";
				}
				if ( !$chaos ) {
					$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['citizens'] = array();
				}
				$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['rx'] = (int) $zx - $data['tx'];
				$data['map']['y'.((string) $zy)]['x'.((string) $zx)]['ry'] = $data['ty'] - (int) $zy;			
			}
			$data['map']['y'.($data['ty'])]['x'.($data['tx'])]['nyv'] = 0;
			
			// citizen
      $old_citizens = $data['citizens'];
			unset($data['citizens']);
			foreach ( $citizens->children() AS $ca ) {
				$data['citizens'][(int) $ca['id']] = array(
          'name' => (string) $ca['name'],
          'out' => (int) $ca['out'],
          'ban' => (int) $ca['ban'],
          'hero' => (int) $ca['hero'],
          'job' => (string) $ca['job'],
          'dead' => (int) $ca['dead'],
          'x' => (int) $ca['x'],
          'y' => (int) $ca['y'],
          'rx' => ((int) $ca['x']) - $data['tx'],
          'ry' => $data['ty'] - ((int) $ca['y']),
        );
        unset($old_citizens[(int) $ca['id']]);
        if ( !$chaos ) {
          $data['map']['y'.$data['citizens'][(string) $ca['id']]['y']]['x'.$data['citizens'][(string) $ca['id']]['x']]['citizens'][(string) $ca['id']] = array('name' => (string) $ca['name'], 'job' => (string) $ca['job']);
        }
			}
      // cadavers
      foreach ( $cadavers->children() AS $ca ) {
        if ( !isset($data['cadavers'][(int) $ca['day']][(int) $ca['id']]) ) {
          $data['cadavers'][(int) $ca['day']][(int) $ca['id']] = array(
            'name' => (string) $ca['name'],
            'dtype' => (int) $ca['dtype'],
          );
        }
        if ( isset($old_citizens[(int) $ca['id']]) ) {
          $data['cadavers'][(int) $ca['day']][(int) $ca['id']]['x'] = $old_citizens[(int) $ca['id']]['x'];
          $data['cadavers'][(int) $ca['day']][(int) $ca['id']]['y'] = $old_citizens[(int) $ca['id']]['y'];
          $data['cadavers'][(int) $ca['day']][(int) $ca['id']]['rx'] = $old_citizens[(int) $ca['id']]['x'] - $data['tx'];
          $data['cadavers'][(int) $ca['day']][(int) $ca['id']]['ry'] = $data['ty'] - $old_citizens[(int) $ca['id']]['x'];
        }
      }
		}
		
		if ( !$chaos && !$hard && isset($data['citizens'][$data['system']['owner_id']]) ) {
			// myZone update
			$items = array();
			if ( count((array) $myzone) > 0 ) {
				foreach ( $myzone->item AS $item ) {
					$items[] = array(
						'id' => pow(-1,((int) $item['broken'])) * ((int) $item['id']),
						'count' => (int) $item['count'],
						'broken' => (int) $item['broken'],
					);
					
					$brokenId = pow(-1,((int) $item['broken'])) * ((int) $item['id']);
					$defaultId = (int) $item['id'];
					if ( !isset($item_data[$defaultId]) ) {
						$item_data[$defaultId] = array(
							'id' => $defaultId,
							'name' => (string) $item['name'],
							'category' => (string) $item['cat'],
							'image' => (string) $item['img'],
							'broken' => (int) $item['broken'],				
						);
						$updateItems = true;
					}
					if ( ($brokenId == -$defaultId) && !isset($item_data[$brokenId]) && isset($item_data[$defaultId]) ) {
						$item_data[$brokenId] = $item_data[$defaultId];
						$item_data[$brokenId]['broken'] = 1;
						$item_data[$brokenId]['id'] = $brokenId;
						$updateItems = true;
					}
				}
			}
			
			$data['map']['y'.((int) $owner['y'])]['x'.((int) $owner['x'])]['items'] = $items;
			$data['map']['y'.((int) $owner['y'])]['x'.((int) $owner['x'])]['dried'] = (int) $myzone['dried'];
			$data['map']['y'.((int) $owner['y'])]['x'.((int) $owner['x'])]['z'] = (int) $myzone['z'];
			$data['map']['y'.((int) $owner['y'])]['x'.((int) $owner['x'])]['updatedOn'] = time();
			$data['map']['y'.((int) $owner['y'])]['x'.((int) $owner['x'])]['updatedBy'] = (string) $owner['name'];
		}
		

		// bank$item_data = array();
		$bankItems = array();
		$bankCount = array();
		foreach ( $bank->children() AS $bia ) {
			$bi_name = (string) $bia['name'];
			$bi_count = (int) $bia['count'];
			$bi_cat = (string) $bia['cat'];
			$bi_img = (string) $bia['img'];
			$bi_broken = (int) $bia['broken'];
			$bi_id = pow(-1,($bi_broken)) * ((int) $bia['id']);
			
			$bankItems[$bi_id] = array(
				'count' => $bi_count,
				'broken' => $bi_broken,				
			);
			$bankCount[(int) $bi_id] = (int) $bi_count;
			
			if ( !isset($item_data[$bi_id]) ) {
				$item_data[$bi_id] = array(
					'id' => $bi_id,
					'name' => $bi_name,
					'category' => $bi_cat,
					'image' => $bi_img,
					'broken' => $bi_broken,				
				);
				$updateItems = true;
			}
		}
		arsort($bankCount);
		$bankItemsSorted = array();
		$i = 0;
		foreach ( $bankCount AS $id => $cnt ) {
			$bankItemsSorted[$i] = $id;
			$i++;
		}
		$data['bank'] = $bankItems;
		$data['bankSorted'] = $bankItemsSorted;
		
		if ( !$chaos && !$hard && isset($data['citizens'][$data['system']['owner_id']]) ) {
			foreach ( $items AS $item ) {
				if ( $item['id'] < 0 && !isset($item['id'])) {
					$unbrokenid = abs($item['id']);
					if ( isset($item_data[$unbrokenid]) ) {
						$unbrokenitem = $item_data[$unbrokenid];
						$unbrokenitem['id'] = $unbrokenitem['id'] * -1;
						$item_data[$item['id']] = $unbrokenitem;
						$updateItems = true;
					}
				}
			}
		}
		
		if ( $updateItems === true ) {
			if ( !$item_stat ) {
				touch($item_file, time());
			}
			ksort($item_data);
			file_put_contents($item_file, serialize($item_data), LOCK_EX);
		}
		$data['items'] = $item_data;
		
		if ( $updateBuildings === true ) {
			if ( !$building_stat ) {
				touch($building_file, time());
			}
			ksort($building_data);
			file_put_contents($building_file, serialize($building_data), LOCK_EX);
		}
		$data['buildings'] = $building_data;
		
		$data['mapitems'] = array("Rsc" => array("cat" => "Rsc"),"Food" => array("cat" => "Food"),"Armor" => array("cat" => "Armor"),"Drug" => array("cat" => "Drug"),"Weapon" => array("cat" => "Weapon"),"Misc" => array("cat" => "Misc"),"Furniture" => array("cat" => "Furniture"),"Box" => array("cat" => "Box"));
		
		// expeditions
		$e = 0;
		#unset($data['expeditions']);
		foreach ( $expeditions->children() AS $exp ) {
			$e = $data['system']['day'] . '.' . ((int) $exp['authorId']);
			if ( !isset($data['expeditions'][$e]) ) {
				$data['expeditions'][$e] = array(
					'day' => $data['system']['day'],
					'creator' => (int) $exp['authorId'],
					'length' => (int) $exp['length'],
					'name' => 'Tag ' . $data['system']['day'] . ': ' . (string) $exp['name'],
					'route' => array(),
				);
				
				$i = 0;
				$ox = $data['tx'];
				$oy = $data['ty'];
				foreach ( $exp->children() AS $pa ) {
					$px = (int) $pa['x'];
					$py = (int) $pa['y'];
					
					if ( $i != 0 && !($px == $ox && $py == $oy) ) {
						if ( abs($px - $ox) > 1 ) {
							if ( $px > $ox ) {
								for ( $tx = ($ox + 1); $tx <= $px; $tx++ ) {
									$data['expeditions'][$e]['route'][$i] = array('x' => $tx, 'y' => $py);
									$i++;
								}
							}
							else {
								for ( $tx = ($ox - 1); $tx >= $px; $tx-- ) {
									$data['expeditions'][$e]['route'][$i] = array('x' => $tx, 'y' => $py);
									$i++;
								}
							}
						}
						elseif ( abs($py - $oy) > 1 ) {
							if ( $py > $oy ) {
								for ( $ty = ($oy + 1); $ty <= $py; $ty++ ) {
									$data['expeditions'][$e]['route'][$i] = array('x' => $px, 'y' => $ty);
									$i++;
								}
							}
							else {
								for ( $ty = ($oy - 1); $ty >= $py; $ty-- ) {
									$data['expeditions'][$e]['route'][$i] = array('x' => $px, 'y' => $ty);
									$i++;
								}
							}
						}
						else {
							$data['expeditions'][$e]['route'][$i] = array('x' => $px, 'y' => $py);
							$i++;
						}
					}
					else {
						#$data['expeditions'][$e]['route'][$i] = array('x' => $px, 'y' => $py);
						$i++;
					}	
					$ox = $px;
					$oy = $py;
				}
			}
		}

    // Constructions & Votes
    unset($data['constructions']);
    foreach ($city->children() AS $con) {
      if ((int) $con['id'] > 0 ) {
        $data['constructions'][(int) $con['id']] = array(
          'name' => (string) $con['name'],
          'temp' => (int) $con['temporary'],
          'image' => (string) $con['img']
        );
      }
    }
    if (isset($data['constructions'])) {
      foreach ($upgrades->children() AS $up) {
        if ((int) $up['buildingId'] > 0 ) {
          $data['constructions'][(int) $up['buildingId']]['level'] = (int) $up['level'];
        }
      }
    }

		$data['timestamp'] = time();
		if ( $this->System_model->saveTowndata($data['system']['gameid'],$data['system']['day'],$data['system']['owner_id'],serialize($data)) ) {
			#$append .= ';ajaxInfo("Database updated!")';
		}
		if (!isset($data['citizens'][$data['system']['owner_id']])) {
			$data['spy'] = 1;
		}
		return json_encode($data) . $append;
		#$this->debug = $data['map'];
	}
	
	# Order array by date 
	static function cmp($a,$b) { 
		if ($a['count'] == $b['count']) return 0; 
		return ($a['count'] < $b['count'])? -1 : 1; 
	}
	
	public function generateQR($chl,$widthHeight ='200',$EC_level='L',$margin='0') {
    $url = urlencode($chl); 
    return '<img src="http://chart.apis.google.com/chart?chs='.$widthHeight.
'x'.$widthHeight.'&cht=qr&chld='.$EC_level.'|'.$margin.
'&chl='.$url.'" alt="QR code" width="'.$widthHeight.
'" height="'.$widthHeight.'"/>';
	}
	
}

/* End of file map.php */
/* Location: ./application/controllers/map.php */
