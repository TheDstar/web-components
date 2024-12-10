class SubscriptionItem extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const name = this.getAttribute('name') || 'Nom';
        const type = this.getAttribute('type') || 'Type';
        const price = this.getAttribute('price') || '0,00 €';
        const color = this.getAttribute('color') || '#333';

        this.style.border = "solid 1px rgba(82, 82, 82, .25)";
        this.style.width = "80dvw";
        this.style.padding = "1rem";
        this.style.borderRadius = "8px";

        this.innerHTML = `
            <div>
                <span style="font-weight: bold; font-size: 16px;">${name}</span>
                <span style="
                    display: inline-block;
                    background-color: rgba(255, 255, 255, 0.2);
                    padding: 4px 8px;
                    border-radius: 4px;
                    margin-left: 8px;
                    font-size: 12px;
                ">${type}</span>
                <div style="margin-top: 8px; font-size: 16px; font-weight: bold;">${price} / mois</div>
            </div>
        `;
    }
}

customElements.define('subscription-item', SubscriptionItem);