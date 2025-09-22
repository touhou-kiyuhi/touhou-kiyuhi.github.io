import sys, os, datetime
sys.path.append(os.getcwd())
from tools.settings.jsonSettings_abstract import JsonSettings
from tools.jsonClasses.jsonFileManager_abstract import JsonFileManager
from tools.ytCrawler.ytCrawler_abstract import YTCrawler


class CategoriesContentBuilder(JsonSettings):
    def __init__(self, parentPath, folder, fileName, jsonTitle, description, data, url):
        super().__init__()
        # Path 
        self.jsonFileManager = JsonFileManager(parentPath, folder, fileName)

        self.jsonTitle = jsonTitle
        self.description = description
        self.data = data

        # video crawler title
        self.ytCrawler = YTCrawler(url)

    # 更新 
    def update(self, data, index=None):
        compareTwoThemes = {
            "title": self.data[0]["theme"].split("：")[0] + " vs " + self.data[1]["theme"].split("：")[0],
            "theme1": self.data[0]["theme"].replace("：", "は"),
            "theme2": self.data[1]["theme"].replace("：", "は")
        }
        self.data[0]["theme"] = self.data[0]["theme"].split("：")[0]
        self.data[1]["theme"] = self.data[1]["theme"].split("：")[0]
        self.ytCrawler.crawler()
        videoLabel = ' '.join(self.ytCrawler.ytTitle.split()[1:])
        print()
        if data == {}:
            pageLink = "/pages/" + '/'.join(self.jsonFileManager.filePath.split('/')[2:])[:-5] + ".html"
            print(self.jsonFileManager.filePath, pageLink)
            tags = self.jsonFileManager.folderPath.split('/')[3:]
            data = {
                "title": self.jsonTitle,
                "description": self.description,
                "data": {
                    "twoThemesData": self.data, 
                    "compareTwoThemes": compareTwoThemes,
                },
                "video": {
                    "label": videoLabel,
                    "id": self.ytCrawler.ytVideoId
                },
                "page": pageLink,
                "tags": tags,
                "year": datetime.datetime.now().year
            }
        else:
            print("the json already exists")
        self.jsonController.jsonWriter(self.jsonFileManager.filePath, data)

    def builder(self, index=None):
        self.jsonFileManager.check()
        data = self.jsonController.jsonReader(self.jsonFileManager.filePath)
        self.update(data, index)


def main(
        category, directory, parentPathList, folder, fileName,
        jsonTitle, description, data, url
    ):
    parentPath = ""
    for p in [category, directory] + parentPathList:
        if p == "":
            break
        parentPath = os.path.join(parentPath, p)
    CCB = CategoriesContentBuilder(parentPath, folder, fileName, jsonTitle, description, data, url)
    CCB.builder()

    data = CCB.jsonController.jsonReader(CCB.jsonFileManager.filePath)
    CCB.jsonController.jsonViewer(data)


if __name__ == "__main__":
    category = "languagesStudy"
    directory = "japanese"
    parentPathList = [
        "n2", "grammar"
    ]
    folder = "nihongoNoMori"
    fileName = "n2Grammar_nihongoNoMori1"

    jsonTitle = "日語學習 N2 文法：日本語の森 ～際 vs ～に際して．にあたって"
    description = "紀錄 日語學習 🐾 的地方 🐾🐾"
    data = [
        {
            "theme": "～際：過去でも未来でも",
            "usage": "接続：名詞+の+際．辞書/タ形+際",
            "meaning": "意味：～とき",
            "notice": "～とき」の硬い言い方＝友だちには使わない！",
            "sentence": [
                {
                    "japanese": "東京へ来た際は、ぜひ私に連絡してください。",
                    "chinese": "你來到東京的時候，請務必和我聯絡。"
                },
                {
                    "japanese": "受験の際に受験票を忘れないでください。",
                    "chinese": "要去應試的時候，請不要忘記准考證。"
                },
                {
                    "japanese": "海外へ行く際、気をつけるべきことはありますか？",
                    "chinese": "要出國的時候，有必須要注意的事情嗎？"
                }
            ]
        },
        {
            "theme": "～に際して．にあたって：これからのこと（準備する時に）",
            "usage": "接続：名詞、辞書形",
            "meaning": "意味：これから～するときに",
            "notice": "未来のことに向けて準備する",
            "sentence": [
                {
                    "japanese": "開会に際して、社長がスピーチをする。",
                    "chinese": "社長在開會之前致辭。"
                },
                {
                    "japanese": "猫を飼うにあたって必要なものをすべて揃えた。",
                    "chinese": "在養貓之前，把必要的東西先收集好。"
                },
                {
                    "japanese": "進学先を選ぶに際して、きちんと調べましょう。",
                    "chinese": "在選擇未來升學學校的時候，先好好地調查清楚吧。"
                }
            ]
        }
    ]
    url = "https://youtu.be/G9bE4StBgxs?si=XPo7KNMBAdrn3tyB"
    main(
        category, directory, parentPathList, folder, fileName,
        jsonTitle, description, data, url
    )
