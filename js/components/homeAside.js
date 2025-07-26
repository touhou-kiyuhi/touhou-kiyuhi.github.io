// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

// 使用模組載入 HTML 與 CSS
async function loadTemplate(url) {
    const res = await fetch(url);
    return res.text();
}

class HomeAside extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    async connectedCallback() {
        const [html, css] = await Promise.all([
            loadTemplate(`${basePath}/pages/components/homeAside.html`),
            loadTemplate(`${basePath}/css/components/homeAside.css`)
        ]);
        
        // 建立 <style>
        const styleEl = document.createElement('style');
        styleEl.textContent = css;
        
        // 包裝 HTML 為 element
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        
        // 加入所有內容進 shadow DOM
        this.shadowRoot.appendChild(styleEl);
        this.shadowRoot.appendChild(wrapper);

        // #Categories
        const categoriesLink = this.shadowRoot.getElementById('categories-link');
        categoriesLink.href = `${basePath}/pages/aside/categories.html`;
        // #TheBattleCatsPortfolio
        const theBattleCatsPortfolioLink = this.shadowRoot.getElementById('theBattleCatsPortfolio-link');
        theBattleCatsPortfolioLink.href = `${basePath}/pages/aside/theBattleCatsPortfolio.html`;
    }
}

customElements.define("home-aside", HomeAside);