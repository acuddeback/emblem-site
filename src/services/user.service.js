// handles all the logic between the controller and the repository
//

/*
Written by Andy Cuddeback for EmblemEDU
Github: acuddeback
Updated 07/23/18
Property of EmblemEDU
*/


const userRepository = require('../repositories/user.repository')
const guidanceRepository = require('../repositories/guidance.repository')
const studentRepository = require('../repositories/student.repository')
const transcriptRepository = require('../repositories/transcript.repository')
const keccak256 = require('js-sha3').keccak256;


//just in case we need it later
const schoolRepository = require('../repositories/school.repository')

const userService = {}

/////////////////////////////////////////////////////
// CODE FOR USER ACCOUNT INFO STARTS HERE //////////
///////////////////////////////////////////////////

//get user
userService.getUser = (username) => {
    return userRepository.getUser(username)
}

//create user
userService.storeUser = (userInfo) => {
    if(userInfo.accountType === 'guidance') {
        if(userInfo.code === null) {
            throw new Error('Guidance counselor code not valid')
        }

        return userRepository.storeUser(userInfo)
    } else if(userInfo.accountType === 'student') {


        return userRepository.storeUser(userInfo)
    } else {
        throw new Error('userType must be "student" or "guidance"')
    }
}

//update user
userService.updateUser = (userInfo) => {
    return userRepository.updateUser(userInfo)
}

userService.loginUser = (userInfo) => {
    console.log('SERVICE')
    return userRepository.loginUser(userInfo)
    .then( (passwordMatch) => {
        
        if(!passwordMatch) {
            throw new Error("Password doesn't match") //ends here bcause it's throwing an error (i.e. it has a return)
        }
        //here is where you send a token back to the user
        //but we don't know how to do this right now
        return passwordMatch
    })
}

//delete user
userService.deleteUser = (username) => {
    return userRepository.deleteUser(username)
}
////////////////////////////////////////////////////
// CODE FOR USER ACCOUNT INFO ENDS HERE ///////////
//////////////////////////////////////////////////


//-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x
// ------------- account-guidance Demilitarized Zone----------------
//-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x


////////////////////////////////////////////////////
// CODE FOR GUIDANCE INFO STARTS HERE /////////////
//////////////////////////////////////////////////


//get guidance
userService.getGuidance = (username) => {
    return guidanceRepository.getGuidance(username)
}

//createguidance
userService.storeGuidance = (userInfo) => {
     return guidanceRepository.storeGuidance(userInfo)   
}

//updateguidance
userService.updateGuidance = (userInfo) => {
    return guidanceRepository.updateGuidance(userInfo)
}    
//deleteguidance
userService.deleteGuidance = (username) => {
    return guidanceRepository.deleteGuidance(username)

}


///////////////////////////////////////////////////
// CODE FOR GUIDANCE INFO ENDS HERE //////////////
/////////////////////////////////////////////////


////////////////////////////////////////////////////
// CODE FOR STUDENT INFO STARTS HERE /////////////
//////////////////////////////////////////////////


//get student
userService.getStudent = (username) => {
    return studentRepository.getStudent(username)
}

//createstudent
userService.storeStudent = (userInfo) => {
     return studentRepository.storeStudent(userInfo)   
}

//updatestudent
userService.updateStudent = (userInfo) => {
    return studentRepository.updateStudent(userInfo)
}    
//deletestudent
userService.deleteStudent = (username) => {
    return studentRepository.deleteStudent(username)
}


//////////////////////////////////////////////////
// CODE FOR STUDENT INFO ENDS HERE //////////////
////////////////////////////////////////////////


///////////////////////////////////////////////
// CODE FOR HASH INFO STARTS HERE ////////////
/////////////////////////////////////////////

/*
In this document, 'hash' refers to thw whole hash JS object whereas 'pdfContent' refers to the hash itself. 

Example: 

const guidance1 ={
    pdfContent: 'cbe3d16cc9f5cef09648e350a1abfbd4a3fb02b7a7f1cd6c02c23b5ee9857e58',
    username: 'euler@python.com'
    studentUsername: 'student@emblemEDU.com'

}
*/


//get transcript
userService.getTranscript = (pdfContent) => {
    return transcriptRepository.getTranscript(pdfContent)
}

//create transcript
userService.storeTranscript = (transcriptInfo) => {
    //get hashValue from transcriptInfo and hash it, then resave it here
    transcriptInfo.hashValue = keccak256(transcriptInfo.hashValue)
    return transcriptRepository.storeTranscript(transcriptInfo)   
}

//update transcript
userService.updateTranscript = (transcriptInfo) => {
    return transcriptRepository.updateTranscript(transcriptInfo)
}    
//delete transcript
userService.deleteTranscript = (pdfContent) => {
    return transcriptRepository.deleteTranscript(pdfContent)
}



// userService.getTranscriptByUsername = (username) => {
//     return transcriptRepository.getTranscriptByUsername(username)
// }

///////////////////////////////////////////////
// CODE FOR transcript INFO ENDS HERE //////////////
/////////////////////////////////////////////

module.exports = userService

