// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

// 使用模組載入 HTML 與 CSS
async function loadTemplate(url) {
    const res = await fetch(url);
    return res.text();
}

class HomeHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    async connectedCallback() {
        const [html, css] = await Promise.all([
            loadTemplate(`${basePath}/pages/components/homeHeader.html`),
            loadTemplate(`${basePath}/css/components/homeHeader.css`)
        ]);
        // 替換 HTML 內的 logo 路徑
        const fixedHtml = html.replace(/src="\.?\/?images\/logo\.png"/g, `src="${basePath}/images/logo.png"`);
        this.shadowRoot.innerHTML = `<style>${css}</style>${fixedHtml}`;
        
        // #Home 
        const homeLink = this.shadowRoot.getElementById('home-link');
        homeLink.href = `${basePath}/pages/home.html`;
    }
}

customElements.define("home-header", HomeHeader);