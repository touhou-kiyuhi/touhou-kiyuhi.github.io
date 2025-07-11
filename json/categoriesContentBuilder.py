import sys, os, requests
sys.path.append(os.getcwd())
from tools.settings.jsonSettings_abstract import JsonSettings
from tools.jsonClasses.jsonFileManager_abstract import JsonFileManager
from tools.ytCrawler.ytCrawler_abstract import YTCrawler


class CategoriesContentBuilder(JsonSettings):
    def __init__(self, parentPath, folder, fileName, jsonTitle, url):
        super().__init__()
        # Path 
        self.jsonFileManager = JsonFileManager(parentPath, folder, fileName)

        self.jsonTitle = jsonTitle

        # video crawler title
        self.ytCrawler = YTCrawler(url)

    # 更新 
    def update(self, data):
        self.ytCrawler.crawler()
        videoLabel = ' '.join(self.ytCrawler.ytTitle.split()[1:])
        print()
        if data == {}:
            pageLink = "/pages/" + '/'.join(self.jsonFileManager.filePath.split('/')[4:])[:-5] + ".html"
            print(self.jsonFileManager.filePath, pageLink)
            tags = self.jsonFileManager.folderPath.split('/')[3:]
            data = {
                "title": self.jsonTitle,
                "description": "紀錄 貓咪大戰爭 🐾 的地方 🐾🐾",
                "videos": [
                    {
                        "label": videoLabel,
                        "id": self.ytCrawler.ytVideoId
                    }
                ],
                "page": pageLink,
                "tags": tags,
                "year": 2025
            }
        else:
            newData = {
                "label": videoLabel,
                "id": self.ytCrawler.ytVideoId
            }
            if newData not in data["videos"]:
                data["videos"].append(newData)
            else:
                print(f"pass {self.jsonFileManager.filePath}")
        self.jsonController.jsonWriter(self.jsonFileManager.filePath, data)

    def builder(self):
        self.jsonFileManager.check()
        data = self.jsonController.jsonReader(self.jsonFileManager.filePath)
        self.update(data)


def main():
    category = "game"
    directory = "theBattleCats"
    parentPath = os.path.join(category, directory)
    folder = "lilCat"
    fileName = "lilCat"

    jsonTitle = "開眼小小貓咪"
    url = "https://youtu.be/M6mzeSkx3UY?si=P4NYyO9YSLU12mf5"

    CCB = CategoriesContentBuilder(parentPath, folder, fileName, jsonTitle, url)
    CCB.builder()

    data = CCB.jsonController.jsonReader(CCB.jsonFileManager.filePath)
    CCB.jsonController.jsonViewer(data)


if __name__ == "__main__":
    main()
