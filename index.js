//import express

const express = require('express')


///////import register

const databaseServices = require('./services/data.services')

//create app using express 

const app = express()

////////import token

const jwt = require('jsonwebtoken')


///////////jwtMiddleware creation

const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.headers["x-m-l"]
        const data=jwt.verify(token,'specialtoken')
        req.currentAcc1=data.currentAcc
        next()

    }
    catch{
        res.json({
            statusCode:401,
            status:false,
            message:"please log in "
        })
    }
}







//////json converter

app.use(express.json())
//set port number for server 

app.listen(3000, () => {
    console.log("server started at 3000");
})

/////////////////middleware- application specific/////////////////////
//////1st method//////////////////
app.use((req,res,next)=>{
    console.log("APPLICATION SPECIFIC MIDDLEWARE");
    next()
})

//////2nd method///////////////
const appMid=(req,res,next)=>{
    console.log("application specific middleware 2");
    next()

}
app.use(appMid)

///////////////////////////////////////////////////////////////////////////












///resolving http request  
//get Request - to fetch    

// app.get('/',(req, res)=>{
// res.status(201).send("GET REQUEST")
// })

///resolving http request 
//POST  Request - to create 

// app.post('/',(req, res)=>{
//     res.send("POST REQUEST")
//     })

///resolving http request
//PUT  Request - to modify entirely

// app.put('/',(req, res)=>{
//     res.send("PUT REQUEST")
//     })

///resolving http request
//PATCH  Request - to modify partially

// app.patch('/',(req, res)=>{
//     res.send("PATCH REQUEST")
//     })

///resolving http request
//DELETE  Request - to DELETE

// app.delete('/',(req, res)=>{
//     res.send("DELETE REQUEST")
//     })






/////////////client request resolve

app.post('/register', (req, res) => {
    // console.log(req.body.acno);
    const result = databaseServices.register(req.body.acno, req.body.password, req.body.uname)
    res.status(result.statusCode).json(result)

})



////////login

app.post('/login', (req, res) => {
    console.log(req.body);
    const result = databaseServices.login(req.body.acno, req.body.password)
    res.status(result.statusCode).json(result)
})

///////deposit


app.post('/deposit',jwtMiddleware, (req, res) => {
    console.log(req.body);
    const result = databaseServices.deposit(req.body.acno, req.body.password, req.body.amt)
    res.status(result.statusCode).json(result)
})    ///////////router specific middleware

///////withdraw 

app.post('/withdraw',jwtMiddleware, (req, res) => {
    console.log(req.body);
    const result = databaseServices.withdraw(req,req.body.acno, req.body.password, req.body.amt)
    res.status(result.statusCode).json(result)
})   ///////////router specific middleware

/////////transaction

app.post('/getTransaction', (req, res) => {
    //console.log(req.body);
    const result = databaseServices.getTransaction(req)
    res.status(result.statusCode).json(result)
})