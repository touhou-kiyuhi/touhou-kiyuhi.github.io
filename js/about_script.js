document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('header nav a'); // 選擇所有導航鏈接

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // 防止頁面跳轉
            // 打印被點擊的鏈接
            console.log(`Navigated to: ${link.textContent}`);
        });
    });
    // 確保 custom element 加載完成
    customElements.whenDefined('user-card').then(() => {
		const cardWrapper = document.querySelector('.user-card-wrapper');
        const description = document.querySelector('.description-text');

		// 只有當螢幕寬度大於 1225px 時才執行滑動
		if (window.innerWidth > 1000) {
            setTimeout(() => {
                // user card 向右滑
                cardWrapper.classList.add('move-to-4');
                descriptionShow(description);
            // 等 1.5 秒再滑動
			}, 1500);
		} else {
            setTimeout(() => {
                // 下滑動畫
                description.scrollIntoView({
                    behavior: 'smooth'
                });
                descriptionShow(description);
            }, 1000);
        }
	});
});

// 文字描述區塊出現
function descriptionShow(description) {
    setTimeout(() => {
        description.classList.add('show');
    }, 1000);
}