const express=require('express')
const cors=require('cors')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')



const app=express()

app.use(express.json())
app.use(cors())

//  data base connection
mongoose.connect('mongodb://localhost:27017/TejasOne')
.then(()=>console.log('mongoDb connected'))
.catch((err)=>console.log(err))

// schema-- which data whats to store in the mangoose
const userschema =new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})



// model- ini which model have to stores this all data

const user=mongoose.model('user',userschema)





// frontend-backend-api- carring data
app.get('/',(req,res)=>
{
    res.send('Bakend Running')

})
app.post('/register',async(req,res)=>{
  const{username,email,password}  =req.body
  if(!email||!username||!password){
    res.json({message:'All field must be complete'})
  }


//check that exist or not
const Exesting= await user.findOne({email})

if(Exesting){
    return res.json({message:'user already exist'})

}
// hash password
const hashpassword=await bcrypt.hash(password,10)



// save the data in mangoDB
const NewUser=new user({
    username,
    email,
    password:hashpassword
})
await NewUser.save()

res.json({Message:'Register Succesfully'})

})
// login 
app.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    //find the user

    const user=await user.findOne({email})
    if(!user){
        return res.json({message:'User Not Found- Register First'})
    }
    const valid= await bcrypt.compare(password,password.user)
    if(valid){
        res.json({message:'Login Succesfully'})
    }
    else{
        res.json({message:'Invalid password'})
    }

})


app.listen(5000,()=>
{
    console.log('server running http://localhost:5000')
})