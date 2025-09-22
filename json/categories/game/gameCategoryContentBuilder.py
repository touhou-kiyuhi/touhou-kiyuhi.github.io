import sys, os, datetime
sys.path.append(os.getcwd())
from tools.settings.jsonSettings_abstract import JsonSettings
from tools.jsonClasses.jsonFileManager_abstract import JsonFileManager
from tools.ytCrawler.ytCrawler_abstract import YTCrawler


class CategoriesContentBuilder(JsonSettings):
    def __init__(self, parentPath, folder, fileName, jsonTitle, description, url):
        super().__init__()
        # Path 
        self.jsonFileManager = JsonFileManager(parentPath, folder, fileName)

        self.jsonTitle = jsonTitle
        self.description = description

        # video crawler title
        self.ytCrawler = YTCrawler(url)

    # 更新 
    def update(self, data, index=None):
        self.ytCrawler.crawler()
        videoLabel = ' '.join(self.ytCrawler.ytTitle.split()[1:])
        print()
        if data == {}:
            pageLink = "/pages/" + '/'.join(self.jsonFileManager.filePath.split('/')[4:])[:-5] + ".html"
            print(self.jsonFileManager.filePath, pageLink)
            tags = self.jsonFileManager.folderPath.split('/')[3:]
            data = {
                "title": self.jsonTitle,
                "description": self.description,
                "videos": [
                    {
                        "label": videoLabel,
                        "id": self.ytCrawler.ytVideoId
                    }
                ],
                "page": pageLink,
                "tags": tags,
                "year": datetime.datetime.now().year
            }
        else:
            newData = {
                "label": videoLabel,
                "id": self.ytCrawler.ytVideoId
            }
            if newData not in data["videos"]:
                if index == None:
                    data["videos"].append(newData)
                else:
                    data["videos"].insert(index, newData)
            else:
                print(f"pass {self.jsonFileManager.filePath}")
        self.jsonController.jsonWriter(self.jsonFileManager.filePath, data)

    def builder(self, index):
        self.jsonFileManager.check()
        data = self.jsonController.jsonReader(self.jsonFileManager.filePath)
        self.update(data, index)


def main():
    category = "game"
    directory = "theBattleCats"
    parentPath = os.path.join(category, directory)
    folder = "manicCat"
    fileName = "manicCat"

    index = 3
    jsonTitle = "大狂亂貓咪"
    description = "紀錄 貓咪大戰爭 🐾 的地方 🐾🐾"
    url = "https://youtu.be/WSLufl_qA6I?si=q6H0Upl2hWpZ5gg5"

    CCB = CategoriesContentBuilder(parentPath, folder, fileName, jsonTitle, description, url)
    CCB.builder(index)

    data = CCB.jsonController.jsonReader(CCB.jsonFileManager.filePath)
    CCB.jsonController.jsonViewer(data)


if __name__ == "__main__":
    main()
