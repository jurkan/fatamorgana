<?php

class System_model extends CI_Model {

	public $secureXML = null;
	
	public function __construct() {
		parent::__construct();
	}
	
	public function check() {
		// Check login status
		$logged_in = $this->session->userdata('logged_in');
		return (isset($logged_in) && $logged_in == true ? $this->session->userdata('user_skey') : false);
	}
	
	public function status() {
		$okey = $this->session->userdata('user_okey');
		$skey = $this->session->userdata('user_skey');
		
		$status = array();
		
		if (isset($okey) && $okey != '') {
			$status[0] = 'Your standard external ID is present, open XML stream is available.';
		}
		else {
			$status[0] = 'Your standard external ID is <strong>not</strong> present, open XML stream is <strong>not</strong> available.';
		}
		
		if (isset($skey) && $skey != '') {
			$status[1] = 'Your secure ID is present, secure XML stream is available.';
		}
		else {
			$status[1] = 'Your secure ID is <strong>not</strong> present, secure XML stream is <strong>not</strong> available.';
		}
		
		return $status;
	}
	
	public function getXMLstamp() {
		$okey = $this->session->userdata('user_okey');
		$skey = $this->session->userdata('user_skey');
		
		#$status = simplexml_load_file('http://www.die2nite.com/xml/status');
		return time();
	}
	
	public function getXMLsecure() {
		if ( $this->secureXML !== null ) {
			return $this->secureXML;
		}
		else {
			return $this->retrieveXMLsecure();
		}
	}
	
	public function retrieveXMLsecure($skey = null) {
		if ( is_null($skey) ) {
			$skey = $this->session->userdata('user_skey');
			$sk = 'ad5f690eec8ab50665fd5343c263abaa';
		}
		else {
			$sk = '3bd1dce1c8794f56857664c25b053273';
		}
		$sk = '3bd1dce1c8794f56857664c25b053273';
		#$sk = 'ad5f690eec8ab50665fd5343c263abaa';
		$xml = simplexml_load_file('http://www.dieverdammten.de/xml/?k='.$skey.';sk='.$sk);
		$this->secureXML = $xml;
		return $xml;
	}
	
	public function getTownData($tid,$day = null) {
		$sql = "SELECT data FROM towndata WHERE tid = ? ".(!is_null($day) ? 'AND day = '.$day : '')." ORDER BY timestamp DESC LIMIT 1"; 
		$q = $this->db->query($sql, array($tid));
		if ($q->num_rows() > 0) {
			 $row = $q->row(); 
			 return unserialize($row->data);
		}
		return false;
	}
	public function saveTownData($tid,$day,$uid,$data) {
		#$sql = "INSERT INTO towndata VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE data = ?, timestamp = ?"; 
        $sql = "SELECT savetowndata(CAST(? AS INT),CAST(? AS SMALLINT),CAST(? AS INT),CAST(? AS TEXT),CAST(? AS INT))";
		#$q = $this->db->query($sql, array($tid,$day,$uid,$data,time(),$data,time()));
        $q = $this->db->query($sql, array($tid,$day,$uid,$data,time()));
		return $q;
	}
	public function getTownDays($tid) {
		$days = array();
		$sql = "SELECT DISTINCT day FROM towndata WHERE tid = ? ORDER BY day DESC LIMIT 45";
		$q = $this->db->query($sql, array($tid));
		if ($q->num_rows() > 0) {
			foreach ($q->result() as $row) {
				$days[] = $row->day;
			} 
			 return $days;
		}
		return false;
	}
	

}
