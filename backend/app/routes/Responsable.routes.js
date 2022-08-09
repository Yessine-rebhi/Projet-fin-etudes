module.exports = (app) => {
    const responsables = require('../controllers/Responsable.controller.js');

    
    app.post('/responsables', responsables.create);


    app.post('/responsables/login', responsables.findOneToLogin);

    
    app.get('/responsables', responsables.findAll);


    app.get('/responsables/:responsableId', responsables.findOne);


    app.get('/responsables/profile/:email', responsables.findOneByemail);


    app.put('/responsables/:responsableId', responsables.update);

    
    app.delete('/responsables/:responsableId', responsables.delete); 


    
    
      
    
    
    
       



}
