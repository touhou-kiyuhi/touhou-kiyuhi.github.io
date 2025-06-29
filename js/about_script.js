document.addEventListener('DOMContentLoaded', function () { 
	const navLinks = document.querySelectorAll('header nav a');

	navLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			console.log(`Navigated to: ${link.textContent}`);
		});
	});

	customElements.whenDefined('user-card').then(() => {
		const cardWrapper = document.querySelector('.user-card-wrapper');
		const description = document.querySelector('.description-text');

		setTimeout(() => {
			cardWrapper.classList.add('slide-right');
			description.classList.add('show');

			// 新增自動滾動到 description
			description.scrollIntoView({ behavior: 'smooth', block: 'center' });

			setTimeout(() => {
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
				let lineIndex = 0;

				function typeLine(line, textEl, cursorEl, charIndex = 0) {
					if (charIndex < line.length) {
						textEl.textContent += line.charAt(charIndex);
						setTimeout(() => typeLine(line, textEl, cursorEl, charIndex + 1), 100);
					} else {
						cursorEl.remove();
						lineIndex++;
						if (lineIndex < lines.length) {
							setTimeout(() => typeNextLine(), 500);
						}
					}
				}

				function typeNextLine() {
					const line = lines[lineIndex];

                    if (line === "\n") {
                        // 直接換行，不打字
                        description.appendChild(document.createElement("br"));
                        lineIndex++;
                        if (lineIndex < lines.length) {
                            setTimeout(typeNextLine, 300); // 換行後稍微延遲再打下一行
                        }
                    } else {
                        const lineWrapper = document.createElement("div");
                        lineWrapper.classList.add("typing-line");

                        const textEl = document.createElement("span");
                        const cursorEl = document.createElement("span");
                        cursorEl.classList.add("typing-cursor");

                        lineWrapper.appendChild(textEl);
                        lineWrapper.appendChild(cursorEl);
                        description.appendChild(lineWrapper);

                        typeLine(line, textEl, cursorEl);
                    }
				}

				typeNextLine();
			}, 1000);
		}, 3000);
	});
});
