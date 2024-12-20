class SubtrackerNavbar extends HTMLElement {
    constructor() {
        super();
        this.formVisible = false;
        this.total = 0; // Initialise la variable total
        this.render();
        this.setupIndexedDB();
    }

    setupIndexedDB() {
        const request = indexedDB.open("SubtrackerDB", 1); // Nom de la base confirmé

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("subscriptions")) { // Table "subscriptions"
                db.createObjectStore("subscriptions", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onerror = () => {
            console.error("Failed to open IndexedDB.");
        };

        this.dbPromise = new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    saveToIndexedDB(data) {
        console.log('Saving to IndexedDB:', data);  // Vérifie le contenu de 'data'
        this.dbPromise.then((db) => {
            const transaction = db.transaction("subscriptions", "readwrite");
            const store = transaction.objectStore("subscriptions");
            store.add(data);
            transaction.oncomplete = () => {
                console.log("Data saved to IndexedDB:", data);
                this.updateSubscriptionContainer(); // Met à jour le total et l'affichage après ajout
            };
            transaction.onerror = (error) => console.error("Error saving to IndexedDB:", error);
        });
    }

    updateSubscriptionContainer() {
        this.dbPromise.then((db) => {
            const transaction = db.transaction("subscriptions", "readonly");
            const store = transaction.objectStore("subscriptions");
            const request = store.getAll();
    
            request.onsuccess = () => {
                const subscriptions = request.result;
                console.log('Subscriptions retrieved:', subscriptions);  // Vérifie le contenu des abonnements
                const container = document.querySelector("subscription-container");
                if (container) {
                    container.updateSubscriptions(subscriptions);
                }

                // Calcul du total
                this.total = subscriptions.reduce((sum, sub) => {
                    const price = parseFloat(sub.price) || 0;  // Assurez-vous que le prix est un nombre
                    return sum + price;
                }, 0);

                // Mise à jour du total dans l'interface
                this.render();  // Rerender pour afficher le nouveau total
            };
    
            request.onerror = () => console.error("Error fetching data from IndexedDB.");
        });
    }

    toggleForm() {
        this.formVisible = !this.formVisible;
        this.render();
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get("platform"),      // Nom du type (actuellement "Perso")
            type: formData.get("name"),  // Nom de la plateforme (actuellement "Test 4")
            price: formData.get("price"),
            color: "#525252",
        };
        this.saveToIndexedDB(data);
        this.toggleForm();
    
        // Recharger la page après avoir enregistré les données
        setTimeout(() => {
            location.reload();  // Cela recharge la page
        }, 100);  // Un petit délai pour s'assurer que l'enregistrement soit effectué avant de recharger
    }

    render() {
        this.style.position = "fixed";
        this.style.bottom = "0";
        this.style.transition = "bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        this.style.width = "100dvw";
        this.style.height = "5rem";
        this.style.display = "flex";
        this.style.flexDirection = "row";
        this.style.justifyContent = "space-between";
        this.style.alignItems = "center";
        this.style.padding = "1rem";
        this.style.backgroundColor = "rgba(64, 64, 64, 1)";
        this.style.borderTopLeftRadius = "2rem";
        this.style.borderTopRightRadius = "2rem";
        this.style.border = "solid 1px rgba(80, 80, 80, 1)";

        this.innerHTML = `
            <div>
                <a href="documentation.html" style="    color: white;
    text-decoration: none;
    background-color: #242424;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;">Voir la documentation</a>
            </div>
            <div style="background-color: rgb(113, 113, 113);
                border-radius: 8px;
                border-top-right-radius: 16px;
                border: none;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                height: 100%;
                aspect-ratio: 1/1;
                display: flex;
                justify-content: center;
                align-items: center;
                border: solid 1px rgba(150, 150, 150, .5);
            " id="toggle-form-btn">
            <i class="fa ${this.formVisible ? 'fa-chevron-down' : 'fa-chevron-up'}" style="
                font-size: 1.5rem;
                color: white;
            "></i>
            </div>
            ${this.formVisible ? `
            <form id="subscription-form" style="
                position: fixed;
                bottom: 5rem; /* Position below navbar */
                left: 0;
                width: 100dvw; /* Full width */
                padding: 1rem;
                background-color: rgba(64, 64, 64, .9);
                border-top-left-radius: 1rem;
                border-top-right-radius: 1rem;
                box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.2);
            ">
                <input name="platform" placeholder="Netflix, Spotify, etc." style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem;" required />
                <input name="price" placeholder="9,99€, 12,99€, etc." type="number" step="0.01" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem;" required />
                <input name="name" placeholder="Personnel, Famille, etc." style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem;" required />
                <button type="submit" style="
                    width: 100%;
                    padding: 0.5rem;
                    background-color: rgb(113, 113, 113);
                    color: white;
                    font-weight: bold;
                    border: none;
                    border-radius: 0.5rem;
                ">Valider</button>
            </form>` : ''}
        `;

        this.querySelector('#toggle-form-btn').onclick = () => this.toggleForm();

        if (this.formVisible) {
            this.querySelector('#subscription-form').onsubmit = (e) => this.handleFormSubmit(e);
        }
    }
}

customElements.define("subtracker-navbar", SubtrackerNavbar);