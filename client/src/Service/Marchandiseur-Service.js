import pfe from "Axios/pfe";
const Marchandiseur_pfe = "/marchandiseurs"

const fetchMarchandiseurs = async () => {
    return await pfe.get(Marchandiseur_pfe+'/societe/'+localStorage.getItem("id"));
}

const fetchMarchandiseurById = async (marchandiseurId) => {
    return await pfe.get(Marchandiseur_pfe + '/' + marchandiseurId);
}

const deleteMarchandiseur = async (marchandiseurId) => {

    return await pfe.delete(Marchandiseur_pfe + '/' + marchandiseurId);
}

const addMarchandiseur = async (marchandiseur) => {

    return await pfe.post(Marchandiseur_pfe, marchandiseur);

}
const editMarchandiseur = (marchandiseur) => {

    return pfe.put(Marchandiseur_pfe + '/' + marchandiseur._id, marchandiseur);

}
const editTacheMarchandiseur = (marchandiseur) => {

    return pfe.put(Marchandiseur_pfe + '/tache/' + marchandiseur._id, marchandiseur);

}
const editTachePreviousMerchandiser = (marchandiseur) => {

    return pfe.put(Marchandiseur_pfe + '/tache/PreviousMerchandiser/' + marchandiseur._id, marchandiseur);

}
export const MarchandiseurService = {
    fetchMarchandiseurs,
    fetchMarchandiseurById,
    deleteMarchandiseur,
    addMarchandiseur,
    editMarchandiseur,
    editTacheMarchandiseur,
    editTachePreviousMerchandiser
   
}