# touhou-kiyuhi.github.io
## 網站
### 連結：[link](https://touhou-kiyuhi.github.io/)
### 架構
```
/ (根目錄)
│
├── index.js
├── index.html                 # User Card 的引導頁面(進入首頁前的引導頁面)
├── services.html              # 服務頁面
├── contact.html               # 聯絡頁面
│
├── pages/                     # HTML 檔案
│   ├── home.html              # 首頁
│   ├── about.html             # 關於
│   ├── result.html            # 其他頁面
│   └── components             # Web Components: Header, Footer
│       ├── indexHeader.html    
│       └── indexFooter.html  
│
├── css/                       # CSS 檔案
│   ├── style.css              # 主樣式檔案
│   ├── home_style.css         # 首頁
│   ├── about_style.css        # 關於
│   ├── result_style.css       # 其他頁面的樣式檔案
│   └── components             # Web Components: Header, Footer
│       ├── indexHeader.css    
│       └── indexFooter.css    
│
├── js/                        # JavaScript 檔案
│   ├── script.js              # 主程式檔案
│   ├── home_script.js         # 首頁
│   ├── about_script.js        # 關於
│   ├── result_script.js       # 其他頁面的程式碼
│   └── components             # Web Components: Header, Footer
│       ├── indexHeader.js    
│       └── indexFooter.js    
│
├── images/                    # 圖片檔案
│   ├── logo.svg               # 網站logo
|   ├── userCard.gif           # 卡片gif
│   ├── background.jpg         # 背景圖片
│   └── icon.png               # 網頁圖示
│
├── json/                      # json檔案
│   └── about.json             # 關於
│
├── program_source/            # 程式檔案(用於網頁顯示)
│   └── helloWorld.java        # hello World!
|
└── fonts/                     # 字型檔案
    ├── custom-font.woff       # 自定義字型
    └── custom-font.ttf        # 字型檔案
```
### .json 下的 Python 檔案說明
* `categoriesContentBuilder.py` (模板)：
    生成 `/categories/【category】/【directory】` 下的 `.json` 檔案
    例如： `/categories/【game】/【theBattleCats】`
    其 `.json` 檔案經讀取後可做為一網頁內容
    * 其他：
        特定規格的 `.json` 檔案，會在在該根資料夾新增延伸 `.py` 檔案作為生成
        命名規則： `XXXcategoryContentBuilder.py`
        例如：`gameCategoryContentBuilder.py`
* `categoriesPortfolioManager.py`：
    生成 `/categories/【parentName】/【folderName】/【fileName】+Portfolio.json` 檔案
    例如： `/categories/【game】/【theBattleCats】/【theBattleCats】Portfolio.json`
    其 `.json` 檔案經讀取後可做為一 **網頁內容 (該 category 的分類表)**
* `categoriesManager.py`：
    生成 `/categories.json` 檔案
    其 `.json` 檔案經讀取後可做為一 **網頁內容 (所有 category 的分類表)**
---
## 參考資料
* [使用 GitHub Pages 架設個人網站](https://hackmd.io/@flagmaker/BkvQphP65)
* [[Day3] 完全免費! 一分鐘在GitHub建立個人網站!](https://ithelp.ithome.com.tw/articles/10259505)
* [如何使用 GitHub Pages 來架設網頁](https://lawrencechuang760223.medium.com/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-github-pages-%E4%BE%86%E6%9E%B6%E8%A8%AD%E7%B6%B2%E9%A0%81-662a089f4e4)
* [靜態網頁跟動態網頁的差別](https://eugene87222.github.io/2017/10/07/20171007-build-own-website/)
* [【个人网站搭建】GitHub pages+hexo框架下为next主题添加菜单分类页面](https://blog.csdn.net/wangqingchuan92/article/details/111933517)
* [Hexo-Next 主题博客个性化配置超详细，超全面(两万字)](https://blog.csdn.net/as480133937/article/details/100138838)
* [GitHub Pages的index.html無法顯示](https://siongui.github.io/zh/2017/03/13/github-pages-index-html-not-working/)
### HTML/CSS/JavaScript
* [從零開始用github架設靜態網站入門(2) - HTML & Bootstrap](https://ithelp.ithome.com.tw/articles/10257535)
* [從零開始用github架設靜態網站入門(3) - CSS客製化](https://ithelp.ithome.com.tw/articles/10257578)
* [從零開始用github架設靜態網站入門(4) - 其他小功能製作](https://ithelp.ithome.com.tw/articles/10257581)
* [從零開始用github架設靜態網站入門(5) - 部署到Github Pages](https://ithelp.ithome.com.tw/articles/10257673)
### Firebase
* [建立 Firebase RealTime Database](https://steam.oxxostudio.tw/category/python/example/firebase-1.html)
* [設定 Firebase RealTime Database 安全規則](https://steam.oxxostudio.tw/category/python/example/firebase-2.html)
* [串接 Firebase RealTime Database 存取資料](https://steam.oxxostudio.tw/category/python/example/firebase-3.html)
### Node.js
* [Download Node.js®](https://nodejs.org/en/download/)
* [Node.js安裝與NPM使用](https://easonwang.gitbook.io/class)
* [Node.jsのリリースサイクルを理解し、最適なバージョンを選択する方法](https://dev.classmethod.jp/articles/nodejs-release-choice/)
### W3Schools
* [How TO - Profile Card](https://www.w3schools.com/howto/howto_css_profile_card.asp)
* [How TO - Slideshow](https://www.w3schools.com/howto/howto_js_slideshow.asp)
* [How TO - Mobile Navigation Menu](https://www.w3schools.com/howto/howto_js_mobile_navbar.asp)
* [How TO - Tabs](https://www.w3schools.com/howto/howto_js_tabs.asp)