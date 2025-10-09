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
        if data == {}:
            # 文法比較
            compareThemes = {
                "title": self.data[0]["theme"].split("：")[0],
                "themes": [
                    self.data[0]["theme"].replace("：", "は")
                ]
            }
            # 該文法標題修改
            self.data[0]["theme"] = self.data[0]["theme"].split("：")[0]
            # YT 爬蟲，擷取 ID
            self.ytCrawler.crawler()
            videoLabel = ' '.join(self.ytCrawler.ytTitle.split()[1:])
            print()
            # HTML 路徑
            pageLink = "/pages/" + '/'.join(self.jsonFileManager.filePath.split('/')[2:])[:-5] + ".html"
            print(self.jsonFileManager.filePath, pageLink)
            # 標籤
            tags = self.jsonFileManager.folderPath.split('/')[3:]
            # 該文法資料
            data = {
                "title": self.jsonTitle,
                "description": self.description,
                "data": {
                    "themesData": self.data, 
                    "compareThemes": compareThemes,
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
            if self.data[0]["theme"].split("：")[0] not in [data["data"]["themesData"][i]["theme"] for i in range(len(data["data"]["themesData"]))]:
                # 文法比較修改，加入新增的資料
                data["data"]["compareThemes"]["title"] += f"vs {self.data[0]["theme"].split("：")[0]}"
                data["data"]["compareThemes"]["themes"].append(self.data[0]["theme"].replace("：", "は"))
                # 該文法標題修改，修改新增的資料
                self.data[0]["theme"] = self.data[0]["theme"].split("：")[0]
                # 該文法資料
                data["data"]["themesData"].append(self.data[0])
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
    fileName = "n2Grammar_nihongoNoMori3"

    jsonTitle = "日語學習 N2 文法：日本語の森 ～か～ないかのうちに vs ～次第"
    description = "紀錄 日語學習 🐾 的地方 🐾🐾"
    data = [
        {
            "theme": "～次第：何かが完了してから",
            "usage": "接続：" + "マス形",
            "meaning": "意味：" + "～したら（すぐに）",
            "notice": "なにかがひとつ終わったら、その後すぐ！",
            "sentence": [
                {
                    "japanese": "雨が止み次第、出発だ。",
                    "chinese": "雨一停就出發。"
                },
                {
                    "japanese": "準備ができ次第すぐにお呼びします。",
                    "chinese": "一準備好就立刻叫我。"
                },
                {
                    "japanese": "明日の予定がわかり次第、連絡しますね。",
                    "chinese": "明天的行程一了解後就連絡我哦！"
                }
            ]
        }
    ]
    url = "https://youtu.be/KUAiYVArqg8?si=t4qhiJZJ-NY1jBZJ"
    main(
        category, directory, parentPathList, folder, fileName,
        jsonTitle, description, data, url
    )
