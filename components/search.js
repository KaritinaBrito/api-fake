import { LitElement, html, css } from 'lit';
import './card-product';

export class SearchComponent extends LitElement {
    static get properties() {
        return {
            productList: { type: Array }, //Se recibe  la lista de productos desde Bodymain
            result: { type: Array }
        }
    }
    static styles = css`
        .search-container{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .input-container{
            border: 1px solid gray;
            padding: 0.5rem;
            width: 500px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;
        }
        .input-container input {
            border: none;
            width: 100%;
        }
        .input-container input:focus {
            outline: none;
            border: none;
        }
        .input-container button {
            border: none;
            background-color: white;
            cursor: pointer;
        }
        .cards-container{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                padding: 2rem;
            } 
    `;

    constructor() {
        super();

        this.productList = []; //Se inicializa en un array vacio 
        this.result = [];
    }

    updated(changeProperties) {
        if (changeProperties.has('productList')) {
            //Si productList cambia, se inicializa result con todos los productos
            this.result = [...this.productList];
        }
    }

    render() {
        return html`
            <div class="search-container">
                <div class="input-container">
                    <input @keyup=${this.filterData} type="text" id="form" placeholder="Buscar productos, marcas y más...">
                    <button @click=${this.filterData}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
                            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                        </svg>
                    </button>
                </div>
    
                ${this.result.length === 0 ? html`
                        <p>Producto no encontrado</p>
                    ` : html`
                    <div class="cards-container">
                        ${this.result.map(item => html`
                            <card-product 
                                image=${item.img} 
                                name=${item.name} 
                                description=${item.description} 
                                price=${item.price}>
                            </card-product>    
                        `)}
                    </div>
                    
                `}
            </div>
        `;
    }

    filterData() {
        const input = this.shadowRoot.querySelector('#form').value.toLowerCase();

        const filtered = this.productList.filter(product =>
            product.name.toLowerCase().includes(input) ||
            product.category.toLowerCase().includes(input)
        );
        this.result = filtered;

        this.dispatchEvent(new CustomEvent('search-data', {
            data: { filteredData: this.result },
            bubbles: true,
            composed: true
        }))
    }




}

customElements.define('search-component', SearchComponent);