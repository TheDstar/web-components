class SubscriptionContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin: 0;
                    padding: 16px;
                    background-color: #222;
                    border-radius: 8px;
                    color: #fff;
                    font-family: Arial, sans-serif;
                }

                ::slotted(subscription-item) {
                    margin-bottom: 8px;
                }
                
                ::slotted(subscription-item:last-child) {
                    margin-bottom: 0;
                }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('subscription-container', SubscriptionContainer);