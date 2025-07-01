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
                cardWrapper.classList.add('move-to-4');
                setTimeout(() => {
                    description.classList.add('show');
                }, 1000);
            // 等 3 秒再滑動
			}, 3000);
		}
	});
});