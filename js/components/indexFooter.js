// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

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
        const fixedHtml = html;
        // 建立 Font Awesome 的 link 元素
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        // 建立 <style>
        const styleEl = document.createElement('style');
        styleEl.textContent = css
        // 包裝 HTML 為 element
        const wrapper = document.createElement('div');
        wrapper.innerHTML = fixedHtml;
        
        this.shadowRoot.appendChild(fontAwesomeLink);
        this.shadowRoot.appendChild(styleEl);
        this.shadowRoot.appendChild(wrapper);

        // #Home 
        const homeLink = this.shadowRoot.getElementById('home-link');
        homeLink.href = `${basePath}/`;
    }
}

customElements.define("index-footer", IndexFooter);