class SubscriptionItem extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const name = this.getAttribute('name') || 'Nom';
        const type = this.getAttribute('type') || 'Type';
        const price = this.getAttribute('price') || '0,00 €';
        let color = this.getAttribute('color') || '82, 82, 82';
        if (color.startsWith('#')) {
            const hex = color.replace('#', '');
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
                <div style="margin-top: 8px; font-size: 16px;"><span style="font-weight: bold; font-size: 24px";>${price}</span> / mois</div>
            </div>
        `;
    }
}

customElements.define('subscription-item', SubscriptionItem);