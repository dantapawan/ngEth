pragma solidity ^0.4.24;

library StudentLib {
    struct Student{
        address owner;
        string certificateId;
        string studentId;
        string collegeId;
        string firstName;
        string lastName;
        string middleName;
        uint256 certificateDate;
    }    
}



contract StudCertRegistry { 
 
 mapping(address => StudentLib.Student) studentCertificate;
 event studContractCreated(address contractAddress);
 /* this runs when the contract is executed */
 function createStudCert(string _certificateId, string _firstName, string _lastName
        , string _middleName, string _studentId, string _collegeId, uint256 _certificateDate) public {
     address studCert = new StudCert(_certificateId, _firstName, _lastName, _middleName
                , _studentId, _collegeId, msg.sender, _certificateDate);

    studentCertificate[studCert].owner = msg.sender;
        studentCertificate[studCert].certificateId = _certificateId;
        studentCertificate[studCert].studentId = _studentId;
        studentCertificate[studCert].collegeId = _collegeId;
        studentCertificate[studCert].firstName = _firstName;
        studentCertificate[studCert].lastName = _lastName;
        studentCertificate[studCert].middleName = _middleName;
        studentCertificate[studCert].certificateDate = _certificateDate;

     emit studContractCreated(studCert);
    
 }


 function getStudentCert(address certAddress) public view 
        returns(address, string, string, string, string, string, string, uint256) {
            StudentLib.Student memory student = studentCertificate[certAddress];
            return ( student.owner
                , student.certificateId 
                , student.studentId
                , student.collegeId
                , student.firstName
                , student.lastName
                , student.middleName
                , student.certificateDate );
    }


}


contract StudCert {


 StudentLib.Student student;

 

 constructor(string _certificateId, string _firstName, string _lastName
        , string _middleName, string _studentId, string _collegeId, address _owner, uint256 _certificateDate)  public{      
     student.certificateId = _certificateId;
     student.firstName = _firstName;
     student.lastName = _lastName;
     student.middleName = _middleName;
     student.studentId = _studentId;
     student.collegeId = _collegeId;
     student.owner = _owner;
     student.certificateDate = _certificateDate;
    }

}