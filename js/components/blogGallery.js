import './blogCard.js';

const isLocalhost = location.hostname === 'localhost';
const basePath = ''; // isLocalhost ? '' : '/kiyuhi.pageTest';

async function loadTemplate(url) {
	const res = await fetch(url);
	return res.text();
}

async function loadJSON(url) {
	const res = await fetch(url);
	return res.json();
}

class BlogGallery extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		const categoriesUrl = this.getAttribute('data-json');
		if (!categoriesUrl) {
			this.shadowRoot.innerHTML = '<p style="color:red;">缺少 data-list 屬性</p>';
			return;
		}

		const css = await loadTemplate(`${basePath}/css/components/blogGallery.css`);
		const categoriesData = await loadJSON(categoriesUrl);

		const blogDataList = await Promise.all(
			categoriesData.dataList.map(entry =>
				loadJSON(entry.json).then(data => ({
					...data,
					tags: entry.tags,
					year: entry.year,
					json: entry.json
				}))
			)
		);

		this.render(categoriesData.tagList, blogDataList, css);
	}

	render(tags, blogDataList, css) {
		const styleEl = document.createElement('style');
		styleEl.textContent = css;

		const wrapper = document.createElement('div');

		// 建立 tag 過濾按鈕
		const tagButtons = tags.map(tag => `
			<button class="btn" data-filter="${tag}">${tag}</button>
		`).join('');

		// 建立 blog-card 清單
		const cardList = blogDataList.map(blogData => `
        <div class="column show ${blogData.tags.join(' ')}">
            <blog-card data-json="${blogData.json}"></blog-card>
        </div>
        `).join('');

		wrapper.innerHTML = `
			<h2>PORTFOLIO</h2>
			<div id="myBtnContainer">
				<button class="btn active" data-filter="all">Show all</button>
				${tagButtons}
			</div>
			<div class="row">${cardList}</div>
		`;

		this.shadowRoot.appendChild(styleEl);
		this.shadowRoot.appendChild(wrapper);

		// 加入過濾功能（在 shadow DOM 中操作）
		this.addFilterEvents(wrapper);
	}

	addFilterEvents(wrapper) {
		const buttons = wrapper.querySelectorAll('#myBtnContainer .btn');
		const cards = wrapper.querySelectorAll('.column');

		buttons.forEach(btn => {
			btn.addEventListener('click', () => {
				const filter = btn.dataset.filter;

				// 切換按鈕樣式
				buttons.forEach(b => b.classList.remove('active'));
				btn.classList.add('active');

				// 顯示/隱藏卡片
				cards.forEach(card => {
					if (filter === 'all' || card.classList.contains(filter)) {
						card.style.display = '';
					} else {
						card.style.display = 'none';
					}
				});
			});
		});
	}
}

customElements.define('blog-gallery', BlogGallery);
