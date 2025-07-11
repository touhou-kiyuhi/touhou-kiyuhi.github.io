import sys, os, requests
sys.path.append(os.getcwd())
from tools.settings.jsonSettings_abstract import JsonSettings


class JsonFileManager(JsonSettings):
    def __init__(self, parentPath=None, folder=None, fileName=None):
        super().__init__()
        # Path 
        self.categoriesDirectoryPath = os.path.join(self.JSON_ROOT_PATH, "categories")
        if parentPath == folder == fileName == None:
            self.filePath = os.path.join(self.JSON_ROOT_PATH, "categories.json")
            pass
        else:
            self.parentPath = os.path.join(self.categoriesDirectoryPath, parentPath)
            self.folderPath = os.path.join(self.parentPath, folder)
            self.fileName = fileName
            self.filePath = os.path.join(self.folderPath, f"{self.fileName}.json")

    # 所有在 /json/catagories/ 下的 .json
    def check(self):
        if not os.path.exists(self.filePath):
            os.makedirs(self.folderPath)
            self.jsonController.jsonWriter(self.filePath, {})
