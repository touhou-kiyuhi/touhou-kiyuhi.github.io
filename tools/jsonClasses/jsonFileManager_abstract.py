import sys, os, requests
sys.path.append(os.getcwd())
from tools.settings.jsonSettings_abstract import JsonSettings


class JsonFileManager(JsonSettings):
    def __init__(self, parentPath=None, folder=None, fileName=None):
        super().__init__()
        # Path 
        # ./json/categories
        self.categoriesDirectoryPath = os.path.join(self.JSON_ROOT_PATH, "categories").replace('\\', '/')
        if parentPath == folder == fileName == None:
            self.folderPath = self.categoriesDirectoryPath
            # ./json/categories/categories.json
            self.filePath = os.path.join(self.JSON_ROOT_PATH, "categories.json").replace('\\', '/')
            pass
        else:
            self.parentPath = os.path.join(self.categoriesDirectoryPath, parentPath).replace('\\', '/')
            self.folderPath = os.path.join(self.parentPath, folder).replace('\\', '/')
            self.fileName = fileName
            self.filePath = os.path.join(self.folderPath, f"{self.fileName}.json").replace('\\', '/')

    # 所有在 /json/catagories/ 下的 .json
    def check(self):
        if not os.path.exists(self.folderPath):
            os.makedirs(self.folderPath)
        if not os.path.exists(self.filePath):
            self.jsonController.jsonWriter(self.filePath, {})
