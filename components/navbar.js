class SubtrackerNavbar extends HTMLElement {
    constructor() {
        super();
        this.formVisible = false;
        this.render();
        this.setupIndexedDB();
    }

    setupIndexedDB() {
        const request = indexedDB.open('SubtrackerDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('subscriptions')) {
                db.createObjectStore('subscriptions', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onerror = () => {
            console.error('Failed to open IndexedDB.');
        };

        this.dbPromise = new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    saveToIndexedDB(data) {
        this.dbPromise.then((db) => {
            const transaction = db.transaction('subscriptions', 'readwrite');
            const store = transaction.objectStore('subscriptions');
            store.add(data);
            transaction.oncomplete = () => console.log('Data saved to IndexedDB:', data);
            transaction.onerror = (error) => console.error('Error saving to IndexedDB:', error);
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
            platform: formData.get('platform'),
            price: formData.get('price'),
            name: formData.get('name'),
        };
        this.saveToIndexedDB(data);
        this.toggleForm();
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
                <span>Total :</span>
                <span style="font-weight: bold; font-size: 1.5rem;">0,00 €</span>
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

customElements.define('subtracker-navbar', SubtrackerNavbar);