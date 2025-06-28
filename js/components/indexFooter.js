// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = isLocalhost ? '' : '/github_webTest.github.io';

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
            loadTemplate(`${basePath}/pages/components/indexFooter.html`),
            loadTemplate(`${basePath}/css/components/indexFooter.css`)
        ]);
    
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    }
}

customElements.define("index-footer", IndexFooter);