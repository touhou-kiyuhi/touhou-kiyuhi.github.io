// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

// 使用模組載入 HTML 與 CSS
async function loadTemplate(url) {
    const res = await fetch(url);
    return res.text();
}

class MusicPlayerButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    async connectedCallback() {
        const [html, css] = await Promise.all([
            loadTemplate(`${basePath}/pages/components/musicPlayerButton.html`),
            loadTemplate(`${basePath}/css/components/musicPlayerButton.css`)
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

        // 這邊註冊點擊事件（內部封裝的 toggleIcon）
        const button = this.shadowRoot.querySelector('.musicPlayer-button');
        button?.addEventListener('click', () => this.toggleIcon(button));
    }

    toggleIcon(button) {
        const icon = button.querySelector('.icon');
        const audio = document.querySelector('#my-audio'); // ✅ 指向外部 audio
        if (icon.classList.contains('play')) {
            icon.className = 'icon pause';
            icon.innerHTML = '<div></div><div></div>';
            audio.play();
        } else {
            icon.className = 'icon play';
            icon.innerHTML = '';
            audio.pause();
        }
    }
}

customElements.define("music-player-button", MusicPlayerButton);