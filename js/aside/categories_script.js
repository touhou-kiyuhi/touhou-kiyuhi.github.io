document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('header nav a'); // 選擇所有導航鏈接

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // 防止頁面跳轉
            // 打印被點擊的鏈接
            console.log(`Navigated to: ${link.textContent}`);
            
            // 設置頁面跳轉
            window.location.href = link.getAttribute("href");  // 跳轉到 result.html  // 跳轉到 result.html
        });
    });

    
});