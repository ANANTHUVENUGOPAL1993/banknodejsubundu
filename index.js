//import express

const express=require('express')


///////import register

const databaseServices=require('./services/data.services')

//create app using express 

const app=express()
//////json converter

app.use(express.json())
//set port number for server 

app.listen(3000,()=>{
    console.log("server started at 3000");
})

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

    app.post('/register',(req,res)=>{
       // console.log(req.body.acno);
        const result=databaseServices.register(req.body.acno,req.body.password,req.body.uname)
        res.status(result.statusCode).json(result)

    })



    ////////login

    app.post('/login',(req,res)=>{
        console.log(req.body);
        const result = databaseServices.login(req.body.acno,req.body.password)
        res.status(result.statusCode).json(result)
    })

    ///////deposit


    app.post('/deposit',(req,res)=>{
        console.log(req.body);
        const result = databaseServices.deposit(req.body.acno,req.body.password,req.body.amt)
        res.status(result.statusCode).json(result)
    })

///////withdraw 

app.post('/withdraw',(req,res)=>{
    console.log(req.body);
    const result = databaseServices.withdraw(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result)
})
