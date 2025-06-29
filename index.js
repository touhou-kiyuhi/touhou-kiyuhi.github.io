const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 1. 指定 public 為靜態資源目錄（像 CSS/JS/圖片）
app.use(express.static(path.join(__dirname, 'public')));

// 2. 提供首頁（可選）
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});