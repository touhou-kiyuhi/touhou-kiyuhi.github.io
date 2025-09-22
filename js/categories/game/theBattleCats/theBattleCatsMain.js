// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

// 使用模組載入 HTML 與 CSS
async function loadTemplate(url) {
    const res = await fetch(url);
    return res.text();
}

async function loadJSON(url) {
	const res = await fetch(url);
	return res.json();
}

class theBattleCatsMain extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({
            mode: 'open' 
        });
	}

	async connectedCallback() {
		const dataUrl = this.getAttribute('data-json');
		if (!dataUrl) {
			this.shadowRoot.innerHTML = '<p style="color:red;">缺少 data-json 屬性</p>';
			return;
		}

		// 讀取 CSS 模板
		const css = await loadTemplate(`${basePath}/css/categories/game/theBattleCats/theBattleCatsMain.css`);

		// 讀取 JSON 資料
		const data = await loadJSON(dataUrl);

		this.render(data, css);
	}

	render(data, css) {
		const styleEl = document.createElement('style');
		styleEl.textContent = css;

		const wrapper = document.createElement('div');
		wrapper.innerHTML = `
			<section class="intro">
				<h1>${data.title}</h1>
				<p>${data.description}</p>
			</section>
			${data.videos.map(video => `
			<section>
				<h2>${video.label}</h2>
				<div class="video-wrapper">
					<div class="video-container">
						<iframe src="https://www.youtube.com/embed/${video.id}"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen>
						</iframe>
					</div>
				</div>
			</section>
			`).join('')}
		`;

		this.shadowRoot.appendChild(styleEl);
		this.shadowRoot.appendChild(wrapper);
	}
}

customElements.define('the-battle-cats-main', theBattleCatsMain);
