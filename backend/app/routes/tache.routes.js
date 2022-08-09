module.exports = (app) => {
    const Taches = require('../controllers/Tache.controller.js');
  
  
    app.post('/Tache', Taches.createTache);
  
    app.get('/Tache/societe/:idSoc', Taches.getAllTaches);
  
    app.get('/Tache/:id', Taches.getTacheByID);
  
    app.get('/Tache/dashboard/:idSoc', Taches.stats);

    app.put('/Tache/:id', Taches. updateTache);
  
    app.delete('/Tache/:id', Taches.deleteTache ); 
  
  
    
    
      
  }
  