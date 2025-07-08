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
        const fixedHtml = html.replace(/src="\.?\/?images\/logo\.svg"/g, `src="${basePath}/images/logo.svg"`);

        // 建立 Font Awesome 的 link 元素
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        
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

        // #Home 
        const homeLink = this.shadowRoot.getElementById('home-link');
        homeLink.href = `${basePath}/pages/home.html`;

        // #About
        const aboutLink = this.shadowRoot.getElementById('about-link');
        aboutLink.href = `${basePath}/pages/about.html`;

        // ✅ 響應式 menu toggle
        const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
        const navLinks = this.shadowRoot.querySelector('#myLinks');

        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });
        }

        const body = document.body;
        const themeToggle = this.shadowRoot.getElementById('toggle-theme');

        // 檢查 localStorage 是否有主題設定
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            // 有記錄就用記錄的
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        } else {
            // 沒記錄，根據系統偏好
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        }

        // 點擊 logo 切換模式
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
}

customElements.define("home-header", HomeHeader);