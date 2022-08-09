module.exports = (app) => {
  const Marchandiseurs = require('../controllers/Marchandiseur.controller.js');


  app.post('/marchandiseurs', Marchandiseurs.createMarchandiseur);


  app.get('/marchandiseurs/societe/:idSoc/', Marchandiseurs.getMarchandiseur);

 
  app.get('/marchandiseurs/:id', Marchandiseurs.getMarchandiseurByID);

  
  app.get('/marchandiseurs/ionic/:id', Marchandiseurs.getMarchandiseurByIDForIonicApp);


  app.get('/marchandiseurs/app/:email', Marchandiseurs.findOneByemail);

  app.get('/marchandiseurs/dashboard/:idSoc', Marchandiseurs.stats);

  
  app.put('/marchandiseurs/tache/:id', Marchandiseurs.updateTacheMarchandiseur);


  app.put('/marchandiseurs/tache/PreviousMerchandiser/:id', Marchandiseurs.updateTachePreviousMarchandiseur);


  app.put('/marchandiseurs/:id', Marchandiseurs.updateMarchandiseur);

  
  app.delete('/marchandiseurs/:id', Marchandiseurs.deleteMarchandiseur ); 

 
  
  
    
}
