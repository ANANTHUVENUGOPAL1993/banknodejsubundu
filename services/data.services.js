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
  let db = users
  if (acno in db) {
    return {
      statusCode:401,
      status:false,
      message:"account already exit!!!!!!pls login"
    }
  }
  else {
    db[acno] = {
      acno,
      uname,
      password,
      balance: 0,
      transaction: []
    }

    return {
      statusCode:200,
      status: true,
      message: "account successfully created!!!!!"
    }
  }

} 



  const login=(acno,pwd)=>{
   

    var acno=acno;
    var password=pwd;
    let database=users
    
    if(acno in database){
      if(password==database[acno]["password"]){
        currentAcno=acno
        currentUserName=database[acno]["uname"]
        return {
          statusCode:200,
          status: true,
          message: "logged in !!!!!"
        }
  

      }
      else{
        return {
          statusCode:401,
          status: false,
          message: "incorrect Password !!!!!"
        }
      }

    }
    else{
      return {
        statusCode:401,
        status: false,
        message: "invalid account no !!!!!"
      }
    }
  }

////deposit

const deposit=(acno, password, amt)=> {
  var amount = parseInt(amt)
  let db = users;

  if (acno in db) {
    if (password == db[acno]["password"]) {
      db[acno]["balance"] = db[acno]["balance"] + amount
      db[acno].transaction.push({
        amount:amount,
        type:"CREDIT"
      })
      return{
        statusCode:200,
        status:true,
        message:amount+"Amount credited and the new balance is "+db[acno]["balance"]

      } 
    }
    else {
      //alert("Incorrect Password")
      return{
        statusCode:401,
        status:false,
        message:"Incorrect Password"

      } 
    }

  }
  else {
   // alert("Account does not exit!!!!!!")
    return{
      statusCode:401,
      status:false,
      message:"Account no does not exit"

    } 
  }
}

///withdraw

const withdraw=(acno, password, amt)=> {
  var amount = parseInt(amt);
  let db = users;
  if (acno in db) {
    if (password == db[acno]["password"]) {
      var bal = db[acno]["balance"]
      if (bal >=amount) {
        db[acno]["balance"] = db[acno]["balance"] - amount
        db[acno].transaction.push({
          amount:amount,
          type:"DEBIT"
        })
        
        
       // return db[acno]["balance"];
       return{
        statusCode:200,
        status:true,
        message:amount+"Amount debited and the new balance is "+db[acno]["balance"]

      } 

      }
      else {
        return{
          statusCode:401,
          status:false,
          message:"Insufficient balance"
  
        }
      }

    }
    else {
      return{
        statusCode:401,
        status:false,
        message:"Incorrect Password"

      }
    }

  }
  else {
    return{
      statusCode:401,
      status:false,
      message:"Account no does not exit"

    } 
  }

}

  //export

module.exports={
  register,login,deposit,withdraw
}