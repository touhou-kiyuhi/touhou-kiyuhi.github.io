// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

// 使用模組載入 HTML 與 CSS
async function loadTemplate(url) {
    const res = await fetch(url);
    return res.text();
}

class UserCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    async connectedCallback() {
        const [html, css] = await Promise.all([
            loadTemplate(`${basePath}/pages/components/userCard.html`),
            loadTemplate(`${basePath}/css/components/userCard.css`)
        ]);
        // 建立 Font Awesome 的 link 元素
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        
        // 替換圖片路徑
        const fixedHtml = html.replace(/src="\.?\/?images\/mikaEatingRollCake\.gif"/g, `src="${basePath}/images/mikaEatingRollCake.gif"`);
        
        // 建立 <style>
        const styleEl = document.createElement('style');
        styleEl.textContent = css;

        // 包裝 HTML 為 element
        const wrapper = document.createElement('div');
        wrapper.innerHTML = fixedHtml;

        // 加入所有內容進 shadow DOM
        this.shadowRoot.appendChild(fontAwesomeLink);
        this.shadowRoot.appendChild(styleEl);
        this.shadowRoot.appendChild(wrapper);
    }
}

customElements.define("user-card", UserCard);