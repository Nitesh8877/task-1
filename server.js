const express=require('express');
const serverConfig=require('./configs/server.config');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const db=require('./models');
const user=db.user;

db.sequelize.sync({force:true})
.then(()=>{
    console.log("table dropped and created");
   
})




require('./routes/user.route')(app);

app.listen(serverConfig.PORT,()=>{
    console.log(`Application started onthe port no: ${serverConfig.PORT}`)
})