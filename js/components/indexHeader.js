// 使用模組載入 HTML 與 CSS
async function loadTemplate(url) {
    const res = await fetch(url);
    return res.text();
}

class IndexHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    async connectedCallback() {
        const [html, css] = await Promise.all([
            loadTemplate('./pages/components/indexHeader.html'),
            loadTemplate('./css/components/indexHeader.css')
        ]);
    
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    }
}

customElements.define("index-header", IndexHeader);