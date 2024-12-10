class SubscriptionContainer extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
        this.style.flexWrap = 'wrap';
        this.style.justifyContent = 'center';
        this.style.alignItems = 'center';
        this.style.gap = '1rem';
        this.style.margin = '0';
        this.style.padding = '16px';
        this.style.height = "max-content";
        this.style.fontFamily = 'DM Sans, sans-serif';
    } 
}

customElements.define('subscription-container', SubscriptionContainer);