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

		// 只有當螢幕寬度大於 1225px 時才執行滑動
		if (window.innerWidth > 1000) {
			setTimeout(() => {
                const parent = cardWrapper.parentElement;
                const moveDistance = parent.offsetWidth * 0.3; // 父容器寬度的 30%
                cardWrapper.style.transform = `translateX(${moveDistance}px)`; // 使用 JS 設定 transform
				cardWrapper.classList.add('slide-right');
            // 等 3 秒再滑動
			}, 3000);
		}
	});
});