/////////to connect mongodb with server

const mongoose=require('mongoose')
///////////connection string///

mongoose.connect('mongodb://localhost:27017/Bankserver',{
    useNewUrlParser:true
}
)

/////model


const User=mongoose.model('User',{
    acno:Number,
    uname:String,
    password:Number,
    balance:Number,
    transaction:[]
})



///////////////export module

module.exports={
    User
}
