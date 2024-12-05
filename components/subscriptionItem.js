class SubscriptionItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.name = this.getAttribute('name') || 'Nom';
        this.type = this.getAttribute('type') || 'Type';
        this.price = this.getAttribute('price') || '0,00 €';
        this.color = this.getAttribute('color') || '#333';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: ${this.color};
                    padding: 16px;
                    border-radius: 8px;
                    color: #fff;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }

                .name {
                    font-weight: bold;
                    font-size: 16px;
                }

                .type {
                    display: inline-block;
                    background-color: rgba(255, 255, 255, 0.2);
                    padding: 4px 8px;
                    border-radius: 4px;
                    margin-left: 8px;
                    font-size: 12px;
                }

                .price {
                    margin-top: 8px;
                    font-size: 16px;
                    font-weight: bold;
                }
            </style>
            <div>
                <span class="name">${this.name}</span>
                <span class="type">${this.type}</span>
                <div class="price">${this.price} / mois</div>
            </div>
        `;
    }
}

customElements.define('subscription-item', SubscriptionItem);