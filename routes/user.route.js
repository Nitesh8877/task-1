const controller =require('../controllers/auth.controller')

module.exports=function(app){

    app.post("/api/v1/auth/signup",controller.singup);

    app.post("/api/v1/auth/signin",controller.signin);

    app.post('/api/v1/auth/forgot-password',controller.forgot);

    app.post('/api/v1/auth/forgot',controller.forgot_db);
}