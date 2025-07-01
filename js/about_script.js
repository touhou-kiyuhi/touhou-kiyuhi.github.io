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
        const lines = [
            "Welcome to My Page",
            "\n",
            "I primarily program in Python and Java, ",
            "with occasional coding in Ruby, C, and HTML/CSS/JavaScript.",
            "\n",
            "This is my personal test website, ",
            "where I practice and record my learning journey, ",
            "including coding, language study, and anything else I explore."
        ];
        const typingSpeed = 50 
        const lineDelay = 500
        const lineBreakDelay = 300

		// 只有當螢幕寬度大於 1225px 時才執行滑動
		if (window.innerWidth > 1000) {
            setTimeout(() => {
                // user card 向右滑
                cardWrapper.classList.add('move-to-4');
                // 啟動打字效果
                startTyping(description, lines, typingSpeed, lineDelay, lineBreakDelay);
            // 等 1.5 秒再滑動
			}, 1500);
		} else {
            setTimeout(() => {
                // 下滑動畫
                description.scrollIntoView({
                    behavior: 'smooth'
                });
                // 啟動打字效果
                startTyping(description, lines, typingSpeed, lineDelay, lineBreakDelay);
            }, 1000);
        }
	});
});

// 打字動畫
function startTyping(descriptionEl, lines, typingSpeed = 100, lineDelay = 500, lineBreakDelay = 300) {
    // 第一行開始
    let lineIndex = 0;

    function typeLine(line, textEl, cursorEl, charIndex = 0) {
        if (charIndex < line.length) {
            textEl.textContent += line.charAt(charIndex); // 每次顯示一個字
            setTimeout(() => typeLine(line, textEl, cursorEl, charIndex + 1), typingSpeed);
        } else {
            cursorEl.remove();
            lineIndex++;
            if (lineIndex < lines.length) {
                // 下滑動畫
                descriptionEl.scrollIntoView({
                    behavior: 'smooth'
                });
                setTimeout(() => typeNextLine(), lineDelay); // 等待下一行開始
            }
        }
    }

    function typeNextLine() {
        const line = lines[lineIndex];

        if (line === "\n") {
            // 如果是換行符號，插入 <br> 並繼續下一行
            descriptionEl.appendChild(document.createElement("br"));
            lineIndex++;
            if (lineIndex < lines.length) {
                setTimeout(typeNextLine, lineBreakDelay); // 換行後稍微延遲再打下一行
            }
        } else {
            const lineWrapper = document.createElement("div");
            lineWrapper.classList.add("typing-line");

            const textEl = document.createElement("span");
            const cursorEl = document.createElement("span");
            cursorEl.classList.add("typing-cursor");

            lineWrapper.appendChild(textEl);
            lineWrapper.appendChild(cursorEl);
            descriptionEl.appendChild(lineWrapper);

            typeLine(line, textEl, cursorEl);
        }
    }

    setTimeout(() => {
        typeNextLine(); // 開始執行逐字打字效果
    }, 1000);
}