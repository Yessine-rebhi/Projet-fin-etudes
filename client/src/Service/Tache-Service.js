import pfe from "Axios/pfe";
const Tache_pfe = "/Tache"

const fetchTaches = async () => {
    return await pfe.get(Tache_pfe+'/societe/'+localStorage.getItem("id"));
}

const fetchTacheById = async (tacheId) => {
    return await pfe.get(Tache_pfe + '/' + tacheId);
}

const deleteTache = async (tacheId) => {

    return await pfe.delete(Tache_pfe + '/' + tacheId);
}

const addTache = async (tache) => {

    return await pfe.post(Tache_pfe, tache);

}
const editTache = (tache) => {

    return pfe.put(Tache_pfe + '/' + tache._id, tache);

}


export const TacheService = {
    fetchTaches,
    fetchTacheById,
    deleteTache,
    addTache,
    editTache,
   
}