// 使用模組載入 HTML 與 CSS
async function loadTemplate(url) {
    const res = await fetch(url);
    return res.text();
}

class IndexFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    async connectedCallback() {
        const [html, css] = await Promise.all([
            loadTemplate('./pages/components/indexFooter.html'),
            loadTemplate('./css/components/indexFooter.css')
        ]);
    
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    }
}

customElements.define("index-footer", IndexFooter);