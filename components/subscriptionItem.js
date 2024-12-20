class SubscriptionItem extends HTMLElement {
    constructor() {
        super();
        // Initialisation éventuelle
    }

    connectedCallback() {
        this.render();
        this.addStyles(); // Appel pour injecter les styles
    }

    render() {
        const name = this.getAttribute("name") || "Nom";
        const type = this.getAttribute("type") || "Type";
        const price = this.getAttribute("price") || "0,00 €";
        let color = this.getAttribute("color") || "82, 82, 82";
        if (color.startsWith("#")) {
            const hex = color.replace("#", "");
            const bigint = parseInt(hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            color = `${r}, ${g}, ${b}`;
        }

        this.style.border = `solid 1px rgba(${color}, .5)`;
        this.style.backgroundColor = `rgba(${color}, .1)`;
        this.style.width = "90dvw";
        this.style.padding = ".75rem 1rem";
        this.style.borderRadius = "8px";

        const formattedPrice = price.replace(/\s|€/g, '');
        const priceValue = parseFloat(formattedPrice.replace(',', '.'));
        let priceCategory;
        if (priceValue < 9.99) {
            priceCategory = 1;
        } else if (priceValue >= 10 && priceValue < 19.99) {
            priceCategory = 2;
        } else {
            priceCategory = 3;
        }

        // Ajout du priceCategory comme attribut sur un élément enfant
        this.innerHTML = `
            <div price-value=${priceCategory}>
                <span style="font-weight: bold; font-size: 16px;">${name}</span>
                <span style="
                    display: inline-block;
                    background-color: rgba(255, 255, 255, 0.2);
                    padding: 4px 8px;
                    border-radius: 4px;
                    margin-left: 8px;
                    font-size: 12px;
                ">${type}</span>
                <div style="margin-top: 8px; font-size: 16px;">
                    <span style="font-weight: bold; font-size: 24px;">${price}</span> / mois
                </div>
                <span class="price-category" price-value="${priceCategory}"></span>
            </div>
        `;
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Bordure fine pour les prix < 9.99 */
            subscription-item:has(div[price-value="1"]) {
                border-width: 1px !important;
            }

            /* Bordure plus épaisse pour les prix entre 10 et 19.99 */
            subscription-item:has(div[price-value="2"]) {
                border-width: 2px !important;
            }

            /* Bordure épaisse pour les prix >= 20 */
            subscription-item:has(div[price-value="3"]) {
                border-width: 4px !important;
            }
        `;
        document.head.appendChild(style); // Ajouter les styles à la tête du document
    }
}

customElements.define("subscription-item", SubscriptionItem);

// Création et ajout d'un 'subscription-item' dans le conteneur
const container = document.querySelector("subscription-container");
const subscriptionItem = document.createElement("subscription-item");
container.appendChild(subscriptionItem);