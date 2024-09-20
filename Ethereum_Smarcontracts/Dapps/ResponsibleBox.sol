/**
 * Created on: 18-06-2018
 * @summary: ResponsibleBox Action counter
 * @author: Marco Crotta info@BlockchainCaffe.it
 */
pragma solidity ^0.4.19;
contract ResponsibleBox {

    // Master address
    address rbMaster;

    // Public Arrays
    string[]    public scadaName;
    uint[]      public milliActionCounter;
    address[]   public scadaAddress;

    // map addresses to theyr array iz
    mapping (address => uint) public positionOf;
    mapping (address => bool) public isAuthorized;

    modifier onlyMaster {
        require(msg.sender == rbMaster);
        _;
    }

    constructor () public {
        // "I'm your father"
        rbMaster = msg.sender;
    }


    // Setup funcions (onlyMaster)
    function addScada (string _name, address _adr) public onlyMaster  {
        scadaName.push(_name);
        milliActionCounter.push(0);
        scadaAddress.push(_adr);
        isAuthorized[_adr] = true;
        positionOf[_adr] = scadaName.length -1 ;

    }

    function setMacById (uint _id, uint _mac) onlyMaster public {
        milliActionCounter[_id] = _mac;
    }

    function setMacByAddr (address _adr, uint _mac) onlyMaster public {
        milliActionCounter[positionOf[_adr]] = _mac;
    }


    // Scada functions (only for whitelisted addresses)
    function addMac (uint _mac) public {
        // Allow only authorized addresses
        require ( isAuthorized[msg.sender]] == true);
        milliActionCounter[positionOf[msg.sender] += _mac;
    }

    function payMac (uint _mac, address _to) public {
        // Allow only authorized addresses
        require (isAuthorized[msg.sender]] == true);
        require (isAuthorized[_to] == true);
        require (milliActionCounter[positionOf[msg.sender]] >= _mac);

        milliActionCounter[positionOf[msg.sender] -= _mac;
        milliActionCounter[positionOf[_to]] += _mac;
    }


    // Call functions
    function getTotal () constant public returns (uint Total) {
        Total = 0;
        for (uint i=0; i < milliActionCounter.length; i++) {
            Total += milliActionCounter[i];
        }
    }

    function getScada (address _scada) constant public returns (uint Total) {
        Total = milliActionCounter[positionOf[_scada]];
    }

}
