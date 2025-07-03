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
		const css = await loadText(`${basePath}/css/components/codeBlock.css`);

		this.render(code, css, lang);
	}

	render(code, css, lang) {
		const styleEl = document.createElement('style');
		styleEl.textContent = css;

		const wrapper = document.createElement('div');
		wrapper.innerHTML = `
			<pre>
                <button class="copy-btn">Copy</button>
                <code class="language-${lang}">${this.escapeHTML(code)}</code>
            </pre>
		`;

		this.shadowRoot.appendChild(styleEl);
		this.shadowRoot.appendChild(wrapper);

		// 調用 highlight.js
		if (window.hljs) {
			const codeEl = this.shadowRoot.querySelector('code');
			hljs.highlightElement(codeEl);
		}

        this.shadowRoot.addEventListener('click', e => {
            if (e.target.classList.contains('copy-btn')) {
                const code = this.shadowRoot.querySelector('code');
                navigator.clipboard.writeText(code.textContent).then(() => {
                    e.target.textContent = 'Copied!';
                    setTimeout(() => {
                        e.target.textContent = 'Copy';
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
			md: 'markdown'
		};
		return map[ext] || null;
	}
}

customElements.define("code-block", CodeBlock);