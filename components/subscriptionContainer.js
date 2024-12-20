class SubscriptionContainer extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    updateSubscriptions(subscriptions) {
        this.innerHTML = ""; // Vider le conteneur avant de réinsérer les éléments
        subscriptions.forEach((sub) => {
            const item = document.createElement("subscription-item");
            item.setAttribute("name", sub.platform); // Utiliser 'platform' pour le nom
            item.setAttribute("type", sub.type || "Type inconnu"); // S'assurer d'un fallback
            item.setAttribute("price", sub.price || "0,00 €"); // Idem pour le prix
            item.setAttribute("color", sub.color || "#525252"); // Idem pour la couleur
            this.appendChild(item);
        });
    }

    render() {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.flexWrap = "wrap";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        this.style.gap = "1rem";
        this.style.width = "60dvw";
        this.style.height = "max-content";
        this.style.fontFamily = "DM Sans, sans-serif";
        this.style.marginRight = "30dvw";
        this.style.marginTop = "2rem";
    }
}

customElements.define("subscription-container", SubscriptionContainer);