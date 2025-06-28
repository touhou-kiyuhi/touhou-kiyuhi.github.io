// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = isLocalhost ? '' : '/github_webTest.github.io';

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
    // 替換 HTML 內的 logo 路徑
    const fixedHtml = html.replace(/src="\.?\/?images\/logo\.png"/g, `src="${basePath}/images/logo.png"`);
    this.shadowRoot.innerHTML = `<style>${css}</style>${fixedHtml}`;
    }
}

customElements.define("index-header", IndexHeader);