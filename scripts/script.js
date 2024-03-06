import { updateInformations } from "./meteo.js";

async function compositionInformations(){
    //Récupérations des informations de la fonction updateInformations()
    const informationsMeteo = await updateInformations().then(function(result){
        return result
    });
    //Tri des informations à afficher sur la page
    const donneesPageweb = {
        VILLE: informationsMeteo.address,
        TEMPERATURE: (((informationsMeteo.currentConditions.temp)-32)/1.8).toPrecision(2),
        TMIN: (((informationsMeteo.days[0].tempmin)-32)/1.8).toPrecision(2),
        TMAX: (((informationsMeteo.days[0].tempmax)-32)/1.8).toPrecision(2),
        DATE: informationsMeteo.days[0].datetime,
        HUMIDITE: informationsMeteo.currentConditions.humidity
    }
    return donneesPageweb;    
}

//Update au démarrage de la page
function pageInit(donneesPageweb){
    let ville = document.getElementById("ville");
    let temperature = document.getElementById("temperatures");
    let minmax = document.getElementById("minmax");
    let date = new Date(Date.parse(donneesPageweb.DATE)).toLocaleDateString('fr-FR');
    let humidite = document.getElementById("humidite");
    ville.innerText = "🌆" + donneesPageweb.VILLE + ", le " + date;
    minmax.innerText = "➖ Min. " + donneesPageweb.TMIN + "°C - ➕ Max. " + donneesPageweb.TMAX + "°C"
    temperature.innerText = "🌡️ " + donneesPageweb.TEMPERATURE + "°C"
    humidite.innerText = "💧 Humidité à "+ donneesPageweb.HUMIDITE + "%"
}

pageInit(await compositionInformations())