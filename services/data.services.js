///import jsonwebtoken

const jwt = require('jsonwebtoken')

///////////import db

const dbm = require('./db')



users = {
  1000: {
    acno: 1000,
    uname: "n1",
    password: 1000,
    balance: 5000,
    transaction: []
  },
  1001: {
    acno: 1001,
    uname: "n2",
    password: 1001,
    balance: 5000,
    transaction: []
  },

  1002: {
    acno: 1002,
    uname: "n3",
    password: 1002,
    balance: 5000,
    transaction: []
  }


}

//////////////////////////////////
const register = (acno, password, uname) => {

  return dbm.User.findOne({ acno }).then(user => {
    if (user) {
      return {
        statusCode: 401,
        status: false,
        message: "account already exit!!!!!!pls login"
      }
    }
    else {
      const newUser = new dbm.User({
        acno,
        uname,
        password,
        balance: 0,
        transaction: []
      })
      newUser.save()
      return {
        statusCode: 200,
        status: true,
        message: "HELLO account successfully created!!!!!"
      }
    }
  })
  // let db = users
  // if (acno in db) {
  //   return {
  //     statusCode: 401,
  //     status: false,
  //     message: "account already exit!!!!!!pls login"
  //   }
  // }
  // else {
  //   db[acno] = {
  //     acno,
  //     uname,
  //     password,
  //     balance: 0,
  //     transaction: []
  //   }

  //   return {
  //     statusCode: 200,
  //     status: true,
  //     message: "account successfully created!!!!!"
  //   }
  // }

}



const login = (acno, password) => {
  ///asynchrounous

  return dbm.User.findOne({
    acno,
    password

  }).then(user => {
    if (user) {

      currentAcno = acno;
      currentUserName = user.uname;
      //     //token generation
      const token = jwt.sign({
        currentAcc: acno
      }, 'specialtoken')
      return {
        statusCode: 200,
        status: true,
        message: "logged in hello !!!!!",
        token,
        currentAcno,
        currentUserName

      }


    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "invalid Credential Pls check !!!!!"
      }
    }
  })


  // var acno = acno;
  // var password = pwd;
  // let database = users

  // if (acno in database) {
  //   if (password == database[acno]["password"]) {
  //     currentAcno = acno
  //     currentUserName = database[acno]["uname"]
  //     //token generation
  //     const token = jwt.sign({
  //       currentAcc: acno
  //     }, 'specialtoken')
  //     return {
  //       statusCode: 200,
  //       status: true,
  //       message: "logged in hello !!!!!",
  //       token
  //     }


  //   }
  //   else {
  //     return {
  //       statusCode: 401,
  //       status: false,
  //       message: "incorrect Password !!!!!"
  //     }
  //   }

  // }
  // else {
  //   return {
  //     statusCode: 401,
  //     status: false,
  //     message: "invalid account no !!!!!"
  //   }
  // }
}

////deposit

const deposit = (acno, password, amt) => {
  var amount = parseInt(amt)

  return dbm.User.findOne({
    acno,
    password
  }).then(user => {
    if (user) {
      user.balance = user.balance + amount;
      user.transaction.push({
        amount: amount,
        type: "credit"
      })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: amount + "Amount credited and the new balance is " + user.balance

      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "INVALID CREDENTIALS"

      }
    }
  })


  // let db = users;

  // if (acno in db) {
  //   if (password == db[acno]["password"]) {
  //     db[acno]["balance"] = db[acno]["balance"] + amount
  //     db[acno].transaction.push({
  //       amount: amount,
  //       type: "CREDIT"
  //     })
  //     return {
  //       statusCode: 200,
  //       status: true,
  //       message: amount + "Amount credited and the new balance is " + db[acno]["balance"]

  //     }
  //   }
  //   else {
  //     //alert("Incorrect Password")
  //     return {
  //       statusCode: 401,
  //       status: false,
  //       message: "Incorrect Password"

  //     }
  //   }

  // }
  // else {
  //   // alert("Account does not exit!!!!!!")
  //   return {
  //     statusCode: 401,
  //     status: false,
  //     message: "Account no does not exit"

  //   }
  // }
}

///withdraw

const withdraw = (req, acno, password, amt) => {
  var amount = parseInt(amt);

  return dbm.User.findOne({
    acno,
    password
  }).then(user => {
    if (req.currentAcc1 != acno) {
      return {
        statusCode: 401,
        status: false,
        message: "Acess Denied"

      }

    }
    if (user) {
      if (user.balance > amount) {
        user.balance = user.balance - amount
        user.transaction.push({
          amount: amount,
          type: "DEBIT"
        })
        user.save()
        return {
          statusCode: 200,
          status: true,
          message: amount + "Amount debited and the new balance is " + user.balance

        }
      }
      else {
        return {
          statusCode: 401,
          status: false,
          message: "Insufficient balance"

        }
      }

    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "INVALID CREDENTIAL"

      }
    }

  })


  //   let db = users;
  //   if (acno in db) {
  //     if (req.currentAcc1 == acno) {
  //       if (password == db[acno]["password"]) {
  //         var bal = db[acno]["balance"]
  //         if (bal >= amount) {
  //           db[acno]["balance"] = db[acno]["balance"] - amount
  //           db[acno].transaction.push({
  //             amount: amount,
  //             type: "DEBIT"
  //           })


  //           // return db[acno]["balance"];
  //           return {
  //             statusCode: 200,
  //             status: true,
  //             message: amount + "Amount debited and the new balance is " + db[acno]["balance"]

  //           }

  //         }
  //         else {
  //           return {
  //             statusCode: 401,
  //             status: false,
  //             message: "Insufficient balance"

  //           }
  //         }

  //       }
  //       else {
  //         return {
  //           statusCode: 401,
  //           status: false,
  //           message: "Incorrect Password"

  //         }
  //       }

  //     }

  //     else {

  //       return {
  //         statusCode: 401,
  //         status: false,
  //         message: "Acess Denied"

  //       }

  //     }

  //   }
  //   else {
  //     return {
  //       statusCode: 401,
  //       status: false,
  //       message: "Account no does not exit"

  //     }
  //   }

}




////////////transaction////////////
const getTransaction = (acno) => {
   //acno =  req.currentAcc1

  return dbm.User.findOne({
    acno
  }).then(user=>{
    if(user){
      return {
        statusCode: 200,
        status: true,
        transaction: user.transaction
      }
    }
    else{
      return {
        statusCode: 401,
        status: false,
        message: "invalid credentials!!!"
      }
    }
  })
  // if (acno in users) {
  //   return {
  //     statusCode: 200,
  //     status: true,
  //     transaction: users[acno].transaction
  //   }
  // }
  // else {
  //   return {
  //     statusCode: 401,
  //     status: false,
  //     message: "Account does not exit!!!"
  //   }

  // }
}

//export


//////////////////delete


const deleteAcc=(acno)=>{
  return dbm.User.deleteOne({
    acno
  }).then(user=>{
    if(user){
      return{
        statusCode:200,
        status:true,
        message:"Account deleted successfully!!!!!!!!!"
      }
    }
    else{
      return{
        statusCode:401,
        status:true,
        message:"Operation Denied"
      }

    }
  })
}


module.exports = {
  register, login, deposit, withdraw, getTransaction, deleteAcc
}