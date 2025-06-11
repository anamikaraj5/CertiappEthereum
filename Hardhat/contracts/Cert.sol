// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.30;

contract CertiApp{

    struct Certificate{
        string name;
        string course;
        string grade;
        string date;
    }

    address admin;

    event Issued(string indexed,uint,string);

    constructor(){
        admin=msg.sender;
    }

    mapping (uint256=>Certificate) public Certificates;

    modifier onlyAdmin(){
        require(msg.sender==admin,"Unauthorized access....");
        _;
    }

    function issue(uint256 _id,string memory name,string memory course,string memory grade,string memory date) public onlyAdmin {
        Certificates[_id] = Certificate(name,course,grade,date);

        emit Issued(course,_id,grade);
    }
}