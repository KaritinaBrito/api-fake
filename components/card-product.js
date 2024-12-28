import { LitElement, html, css } from "lit";

class CardProduct extends LitElement {
    static get properties() {
        return {
            image: { type: String },
            name: { type: String },
            description: { type: String },
            price: { type: Number }
        }
    }

    static get styles() {
        return css`
            .card{
                display: flex;
                flex-direction: column;
                padding: 1rem;
                border-radius: 10px;
            }
            .card:hover{
                cursor: pointer;
                box-shadow: 0px 0px 50px 10px rgba(0,0,0,0.2);
            }
            .card-image{
                text-align: center;
            }
            .card-image img{
                width: 150px;
                height: 150px;
                object-fit: contain;
                border-radius: 10px;
                overflow: hidden;
            }
            .card-price-name{
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;                
            }
            .card-price-name p{
                font-size: 24px;
                width: 150px;
                text-align: end;
            }
        `;
    }

    constructor() {
        super();
        this.image = "";
        this.name = "";
        this.description = "";
        this.price = 0;
    }

    render() {
        return html`
                <div class="card">
                    <div class="card-image">
                        <img src=${this.image}>
                    </div>
    
                    <div class="card-price-name">
                        <h3>${this.name}</h3>
                        <p>$ ${this.price}</p>
                    </div>
                    <p class="card-description">${this.description}</p>
                </div>
        `;
    }
}

customElements.define('card-product', CardProduct);