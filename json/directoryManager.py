import sys, os
sys.path.append(os.getcwd())
from tools.settings.jsonSettings_abstract import JsonSettings
from tools.jsonClasses.jsonFileManager_abstract import JsonFileManager

# 負責管理 /json/catagories/ 底下的 標籤目錄
class DirectoryManager(JsonSettings):
    def __init__(self, parentName, folderName, fileName):
        super().__init__()
        self.jsonFileManager = JsonFileManager(parentName, folderName, fileName)
        self.directoryJsonPath = self.jsonFileManager.filePath
    
    # 所有在 /json/catagories/【parentName】/【folderName】 下的 .json
    def traversal(self):
        for dirpath, dirnames, filenames in os.walk(self.jsonFileManager.folderPath):
            for filename in filenames:
                if filename.endswith(".json") and filename[:-5] != self.jsonFileManager.fileName:
                    fullPath = os.path.join(dirpath, filename).replace('\\', '/')
                    print(fullPath)
                    data = self.jsonController.jsonReader(self.directoryJsonPath)
                    self.update(data, fullPath)

    # 更新
    def update(self, data, fullPath):
        tagList = fullPath.split('/')[5:-1]
        year = self.jsonController.jsonReader(fullPath)["year"]
        newData = {
            "tags": tagList,
            "year": year,
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
            self.jsonController.jsonWriter(self.directoryJsonPath, data)
        else:
            # 檢查重複元素
            for tag in tagList:
                if tag not in data["tagList"]:
                    data["tagList"].append(tag)
            if newData not in data["dataList"]:
                data["dataList"].append(newData)
                self.jsonController.jsonWriter(self.directoryJsonPath, data)
            else:
                print(f"pass {fullPath}")

    def builder(self):
        self.jsonFileManager.check()
        self.traversal()

        data = self.jsonController.jsonReader(self.jsonFileManager.filePath)
        self.jsonController.jsonViewer(data)


def main():
    parentName = "game"
    folderName = "theBattleCats"
    fileName = "theBattleCats"
    DM = DirectoryManager(parentName, folderName, fileName)
    DM.builder()


if __name__ == "__main__":
    main()
