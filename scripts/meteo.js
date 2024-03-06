export async function updateInformations(){
    //Récupérations des informations du fichier config.json
    const config = await fetch(("../json/config.json"))
    .then(function(result){
        return result.json()
    })
    //Récupération de la date d'aujourd'hui
    const momentActuelle = new Date();
    const anneeActuelle = momentActuelle.getFullYear().toString();
    const moisActuelle = ("0" + (momentActuelle.getMonth() + 1)).slice(-2).toString();
    const jourActuelle = ("0" + (momentActuelle.getDate())).slice(-2).toString();

    //Récupération de la date du lendemain
    let lendemain = new Date(momentActuelle);
    lendemain.setDate(lendemain.getDate()+1)
    const anneeLendemain = lendemain.getFullYear().toString();
    const moisLendemain = ("0" + (lendemain.getMonth() + 1)).slice(-2).toString();
    const jourLendemain = ("0" + (lendemain.getDate())).slice(-2).toString();

    //Concaténation des deux dates
    const dateActuelle = anneeActuelle + "-" + moisActuelle + "-" + jourActuelle
    const dateLendemain = anneeLendemain + "-" + moisLendemain + "-" + jourLendemain

    const request = await fetch(("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + config.Ville +"/"+ dateActuelle +"/"+ dateLendemain +"?key=" + config.API), {
        method: "GET",
    }).then(function(result){
        return result
    });
    const data = await request.json();
    return data;
}