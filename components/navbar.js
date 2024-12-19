class SubtrackerNavbar extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.style.position = "fixed";
        this.style.bottom = "0";
        this.style.width = "100dvw";
        this.style.height = "5rem";
        this.style.display = "flex";
        this.style.flexDirection = "row";
        this.style.justifyContent = "space-between";
        this.style.alignItems = "center";
        this.style.padding = "1rem";
        this.style.backgroundColor = "rgba(64, 64, 64, .5)";
        this.style.borderTopLeftRadius = "2rem";
        this.style.borderTopRightRadius = "2rem";
        this.style.border = "solid 1px rgba(80, 80, 80, .5)";
        this.style.borderBottom = "none";

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
            ">
            <i class="fa fa-plus" style="
                font-size: 1.5rem;
                color: white;
            "></i>
            </div>
        `;
    }

}

customElements.define('subtracker-navbar', SubtrackerNavbar);