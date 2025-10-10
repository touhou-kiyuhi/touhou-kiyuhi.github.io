import './codeBlock.js';

// 自動判斷 base 路徑（支援 localhost 和 GitHub Pages）
const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

// 可達到【使用模組載入 HTML 與 CSS】，並讀取其他檔案
async function loadText(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`載入失敗：${url}`);
	return await res.text();
}

async function loadJSON(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`載入失敗：${url}`);
	return res.json();
}

class CodeBlockTabs extends HTMLElement {
    // constructor() {
    //     super();
    //     this.attachShadow({
    //         mode: "open"
    //     });
    // }

    async connectedCallback() {
		const jsonUrl = this.getAttribute('data-json');
		if (!jsonUrl) {
			this.shadowRoot.innerHTML = '<p style="color:red;">缺少 data-list 屬性</p>';
			return;
		}

		// 讀取 CSS 模板
		// const componentUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
		// const componentCss = await loadText(componentUrl);
		// 讀取 JSON 資料
		const tabData = await loadJSON(jsonUrl);

		this.render(tabData);
	}

	render(tabData) {
		const wrapper = document.createElement('div');

		wrapper.innerHTML = `
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
			<section class="intro">
				<h1>${tabData.title}</h1>
				<p>${tabData.description}</p>
			</section>

			<!-- Nav tabs -->
			<ul class="nav nav-tabs" id="myTab" role="tablist">
				${tabData.data.map((theme, idx) => `
				<li class="nav-item" role="presentation">
					<button class="nav-link ${idx === 0? 'active':''}" id="${theme.title.split(' ').slice(-1)[0].toLowerCase()}-tab" data-bs-toggle="tab" data-bs-target="#${theme.title.split(' ').slice(-1)[0].toLowerCase()}" type="button" role="tab" aria-controls="${theme.title.split(' ').slice(-1)[0].toLowerCase()}" aria-selected="${idx === 0}">${theme.title.split(' ').slice(-1)[0]}</button>
				</li>
				`).join('')}
			</ul>
			
			<!-- Tab content -->
			<div class="tab-content" id="myTabContent">
				${tabData.data.map((themeData, idx) => `
				<div class="tab-pane fade ${idx === 0? 'show active':''}" id="${themeData.title.split(' ').slice(-1)[0].toLowerCase()}" role="tabpanel" aria-labelledby="${themeData.title.split(' ').slice(-1)[0].toLowerCase()}-tab">
					</br>
					<section>
						<h2>${themeData.title}</h2>
						</br>
						<h4>${themeData.description.node.theme.replace(/`([^`]+)`/g, '<code>$1</code>')}</h4>
						<p>${themeData.description.node.description.replace(/`([^`]+)`/g, '<code>$1</code>')}</p>
						<h4>${themeData.description.dataStructure.theme.replace(/`([^`]+)`/g, '<code>$1</code>')}</h4>
						<p>${themeData.description.dataStructure.description.replace(/`([^`]+)`/g, '<code>$1</code>')}</p>
						<code-block src="${themeData.codePath}"></code-block>
						</br>
						${themeData.description.dataStructure.methods.map(methodData => `
							<h5>${methodData.method.replace(/`([^`]+)`/g, '<code>$1</code>')}</h5>
							<p>${methodData.description.replace(/`([^`]+)`/g, '<code>$1</code>')}</p>
						`).join('')}
					</section>
				</div>
				`).join('')}
			</div>
		`;

		this.appendChild(wrapper);
	}

	escapeHTML(str) {
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}
}

customElements.define("code-block-tabs", CodeBlockTabs);