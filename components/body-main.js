import { LitElement, css, html } from "lit";
import './GetData';
import './search';
import './card-product';

export class BodyMain extends LitElement {
    static get properties() {
        return {
            productsList: { type: Array },
            filteredProducts: { type: Array }
        };
    }

    static get styles() {
        return css`
            :host {
                padding: 1rem;
            }   
            .cards-container{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                padding: 2rem;
            }         
        `;
    }

    constructor() {
        super();

        this.productsList = [];
        this.filteredProducts = [];

        this.addEventListener('api-data', (e) => {
            this._dataFormat(e);
        });

        this.addEventListener('search-data', this.handleSearchData)
    }

    _dataFormat(event) {
        //let products = [];
        const data = event.detail.data;

        this.productsList = data.map(product => ({
            name: product.title,
            category: product.category,
            description: product.description,
            img: product.image,
            price: product.price
        }));

        //Se inicializa filteredProducts con todos los productos que llegan desdela api
        this.filteredProducts = [...this.productsList];

    }

    handleSearchData(event) {
        this.filteredProducts = event.detail.filteredData;
        console.log(this.filteredProducts);
    }

    render() {
        return html`
            <get-data url="https://fakestoreapi.com/products" method="GET"></get-data>
            <search-component .productList="${this.productsList}"></search-component>
        `;
    }

    get dataTemplate() {
        return html`
            ${this.filteredProducts.map(item => html`
                <card-product 
                    image=${item.img} 
                    name=${item.name} 
                    description=${item.description} 
                    price=${item.price}>
                </card-product>
            `)}
        `;
    }

    get loadingTemplate() {
        return html`<p>Cargando productos...</p>`;
    }
}

customElements.define('body-main', BodyMain);
