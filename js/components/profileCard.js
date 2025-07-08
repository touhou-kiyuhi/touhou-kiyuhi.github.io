// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

// 使用模組載入 HTML 與 CSS
async function loadTemplate(url) {
    const res = await fetch(url);
    return res.text();
}

// 專門用來更新 Profile Card 資訊：按鈕、文字敘述
function updateProfileCardInfo(wrapper, basePath) {
    // ✅ 只在首頁把 Contact 改成 Home（不變動 CSS）
    const indexRegex = new RegExp(`^${basePath}/?(index\\.html)?$`);
    const isIndex = indexRegex.test(location.pathname);

    const fixedP = wrapper.querySelector('p:not(.title)');
    const button = wrapper.querySelector('button');
    if (isIndex) {
        if (fixedP) {
            fixedP.textContent = '🐾 小雪 🐾';
        }
        if (button) {
            button.textContent = 'Home';
            // 清除原本可能的事件（如果有）
            button.onclick = null;

            // 新增點擊事件：跳轉首頁
            button.addEventListener('click', () => {
                window.location.href = `${basePath}/pages/home.html`;
            });
        }
    } else {
        // 新增點擊事件：跳轉首頁
        button.addEventListener('click', () => {
            window.location.href = `
                mailto:dongfangjixuezhong@gmail.com?subject=Email from Kiyuhi-Touhou Website&body=Hello, I have something I'd like to ask you...
            `;
        });
    }
}

class ProfileCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    async connectedCallback() {
        const [html, css] = await Promise.all([
            loadTemplate(`${basePath}/pages/components/profileCard.html`),
            loadTemplate(`${basePath}/css/components/profileCard.css`)
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

        // 用外包函式來更新 User Card 資訊：按鈕、文字敘述
        updateProfileCardInfo(wrapper, basePath);

        // 加入所有內容進 shadow DOM
        this.shadowRoot.appendChild(fontAwesomeLink);
        this.shadowRoot.appendChild(styleEl);
        this.shadowRoot.appendChild(wrapper);
    }
}

customElements.define("profile-card", ProfileCard);