import { LitElement, html } from "lit";

class GetData extends LitElement {
    static get properties() {
        return {
            url: { type: String },
            method: { type: String }
        }
    }

    constructor() {
        super();
        this.url = '';
        this.method = 'GET';
    }

    updated(changeProperties) {
        super.updated(changeProperties);

        if (changeProperties.has('url') || changeProperties.has('method')) {
            this.getData();
        }
    }

    firstUpdated() {
        this.getData();
    }

    _sendData(data) {
        this.dispatchEvent(new CustomEvent('api-data', {
            detail: { data }, bubbles: true, composed: true
        }))
    }

    getData() {
        if (!this.url) {
            console.log("The URL is not defined or is invalid");
            return;
        }

        fetch(this.url, { method: this.method })
            .then((response) => {
                if (response.ok) return response.json();
                return Promise.reject(response);
            })
            .then((data) => { this._sendData(data); })
            .catch((error) => console.warn('Shomething went wrong: ', error));
    }

    render() {
        return html`<slot></slot>`;
    }

}

customElements.define('get-data', GetData);