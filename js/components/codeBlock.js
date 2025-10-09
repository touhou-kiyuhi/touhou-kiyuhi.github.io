// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

// 可達到【使用模組載入 HTML 與 CSS】，並讀取其他檔案
async function loadText(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`載入失敗：${url}`);
	return await res.text();
}

class CodeBlock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    async connectedCallback() {
        const src = this.getAttribute('src');
		const lang = this.getAttribute('lang') || this.detectLangFromExt(src) || 'plaintext';

		if (!src) {
			this.shadowRoot.innerHTML = '<p style="color:red;">⚠️ 缺少 src 屬性</p>';
			return;
		}

		let code = '';
		try {
			code = await loadText(`${basePath}${src}`);
		} catch (e) {
			code = `// ❌ 無法載入檔案：${src}`;
		}

        // 讀取 CSS 模板
		const componentCss = await loadText(`${basePath}/css/components/codeBlock.css`);
		// ⚡️ 關鍵修正：將 highlight.js 主題樣式載入到 Shadow DOM ⚡️
        // const themeUrl = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
        // const themeCss = await loadText(themeUrl); 

		// ⚡️ 修正：從本地路徑載入主題 CSS 內容 ⚡️
    	const themeCss = await loadText(`${basePath}/css/codeBlockTheme/github-dark.min.css`);
        const combinedCss = componentCss + '\n' + themeCss;

		this.render(code, combinedCss, lang);
	}

	render(code, css, lang) {
		const styleEl = document.createElement('style');
		styleEl.textContent = css;

		const wrapper = document.createElement('div');
		wrapper.innerHTML = `
			<div class="code-wrapper">
				<span class="lang-label">${lang}</span>  <!-- ✅ 保留你原本的位置 -->
				<button class="copy-btn">Copy</button>  <!-- ✅ Copy 移出 pre -->
				<pre>
					<code class="language-${lang}">${this.escapeHTML(code)}</code>
				</pre>
			</div>
		`;

		this.shadowRoot.appendChild(styleEl);
		this.shadowRoot.appendChild(wrapper);

		// 調用 highlight.js
		if (window.hljs) {
			const codeEl = this.shadowRoot.querySelector('code');
			hljs.highlightElement(codeEl);
		}

		this.shadowRoot.addEventListener('click', e => {
			const btn = e.target.closest('button.copy-btn');
			if (btn) {
				const code = this.shadowRoot.querySelector('code');
				navigator.clipboard.writeText(code.textContent).then(() => {
					btn.textContent = 'Copied!';
					setTimeout(() => {
						btn.textContent = 'Copy';
					}, 1000);
				});
			}
		});
	}

	escapeHTML(str) {
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	detectLangFromExt(path = '') {
		const ext = path.split('.').pop();
		const map = {
			js: 'javascript',
			ts: 'typescript',
			html: 'html',
			css: 'css',
			json: 'json',
			py: 'python',
			sh: 'bash',
			md: 'markdown', 
			java: 'java', 
			c: 'c',
			cpp: 'c++',
			rb: 'ruby'
		};
		return map[ext] || null;
	}
}

customElements.define("code-block", CodeBlock);