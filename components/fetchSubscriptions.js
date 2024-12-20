// Importation de knownPlatforms
import knownPlatforms from '../known_platforms.js';

// Fonction pour ouvrir la base de données IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("SubtrackerDB", 1);

        request.onsuccess = (event) => {
            resolve(event.target.result);
            console.log("IndexedDB ouverte avec succès");
        };

        request.onerror = (event) => {
            console.error("Erreur avec IndexedDB : ", event);
            reject(event.target.error);
        };
    });
}

// Fonction pour récupérer les abonnements de la base de données
function getSubscriptions(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["subscriptions"], "readonly");
        const objectStore = transaction.objectStore("subscriptions");
        const request = objectStore.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            console.error("Erreur lors de la récupération des données :", request.error);
            reject(request.error);
        };
    });
}

// Fonction pour afficher les abonnements
// Fonction pour afficher les abonnements
async function logSubscriptions() {
    try {
        const db = await openDB();
        const subscriptions = await getSubscriptions(db);
        const container = document.querySelector("subscription-container");
        container.innerHTML = ""; // Efface tout contenu précédent

        if (subscriptions.length === 0) {
            // Aucun abonnement trouvé, afficher un message
            const message = document.createElement("p");
            message.textContent = "Veuillez d'abord créer un abonnement en appuyant sur la flèche haute";
            message.style.textAlign = "center";
            message.style.color = "gray";
            message.style.fontSize = "1.2rem";
            message.style.marginTop = "2rem";
            container.appendChild(message);
            return; // Fin de la fonction si aucun abonnement
        }

        // Sinon, afficher les abonnements
        subscriptions.forEach((sub) => {
            const name = sub.name || "Plateforme inconnue";
            const type = sub.type || "Nom inconnu";
            const price = sub.price || "Prix inconnu";

            // Recherche de la plateforme dans knownPlatforms
            const platformData = knownPlatforms.find(p => p.name.toLowerCase() === name.toLowerCase());

            // Création de l'élément subscription-item
            const item = document.createElement("subscription-item");
            item.setAttribute("name", name);
            item.setAttribute("type", type);
            item.setAttribute("price", `${price} €`);

            // Si la plateforme est trouvée, ajouter l'attribut color
            if (platformData) {
                item.setAttribute("color", platformData.color);
            }

            container.appendChild(item);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des abonnements : ", error);
    }
}

// Écouteur d'événement pour le chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    logSubscriptions();
});