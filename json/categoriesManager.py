import sys, os
sys.path.append(os.getcwd())
from tools.settings.jsonSettings_abstract import JsonSettings
from tools.jsonClasses.jsonFileManager_abstract import JsonFileManager


class CategoriesManager(JsonSettings):
    def __init__(self):
        super().__init__()
        self.jsonFileManager = JsonFileManager()
        self.categoriesJsonPath = self.jsonFileManager.filePath
    
    # 所有在 /json/catagories/ 下的 .json
    def traversal(self):
        for dirpath, dirnames, filenames in os.walk(self.jsonFileManager.categoriesDirectoryPath):
            for filename in filenames:
                if filename.endswith(".json"):
                    fullPath = os.path.join(dirpath, filename).replace('\\', '/')
                    data = self.jsonController.jsonReader(self.categoriesJsonPath)
                    self.update(data, fullPath)

    # 更新
    def update(self, data, fullPath):
        tagList = fullPath.split('/')[3:-1]
        newData = {
            "tags": tagList,
            "year": 2025,
            "json": fullPath[1:]
        }
        print(tagList, fullPath)

        if data == {}:
            data = {
                "tagList": tagList,
                "yearList": [
                    2025
                ],
                "dataList": [
                    newData
                ]
            }
            self.jsonController.jsonWriter(self.categoriesJsonPath, data)
        else:
            # 檢查重複元素
            for tag in tagList:
                if tag not in data["tagList"]:
                    data["tagList"].append(tag)
            if newData not in data["dataList"]:
                data["dataList"].append(newData)
                self.jsonController.jsonWriter(self.categoriesJsonPath, data)
            else:
                print(f"pass {fullPath}")

    def builder(self):
        self.jsonFileManager.check()
        self.traversal()

        data = self.jsonController.jsonReader(self.jsonFileManager.filePath)
        self.jsonController.jsonViewer(data)


def main():
    CM = CategoriesManager()
    CM.builder()


if __name__ == "__main__":
    main()
