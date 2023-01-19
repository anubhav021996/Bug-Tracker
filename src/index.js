const express= require("express");
const app= express();
const cors= require("cors");

const connect= require("./configs/db");
const signupController= require("./controllers/signup.controller");
const loginController= require("./controllers/login.controller");

app.use(cors());
app.use(express.json());

app.use("/signup",signupController);
app.use("/login",loginController);

let port= process.env.PORT || 2548;
app.listen(port,async()=>{
    try{
        await connect();
        console.log("Listening");
    }
    catch(e){
        console.log(e.message);
    }
});