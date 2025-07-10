import sys, os
sys.path.append(os.getcwd())
from tools.settings.jsonSettings_abstract import JsonSettings


class CategoriesManager(JsonSettings):
    def __init__(self):
        super().__init__()

        self.categoriesJsonPath = os.path.join(self.JSON_ROOT_PATH, "categories.json")
        self.categoriesDirectoryPath = os.path.join(self.JSON_ROOT_PATH, "categories")
    
    # 所有在 /json/catagories/ 下的 .json
    def traversal(self):
        for dirpath, dirnames, filenames in os.walk(self.categoriesDirectoryPath):
            for filename in filenames:
                if filename.endswith(".json"):
                    fullPath = os.path.join(dirpath, filename)
                    data = self.jsonController.jsonReader(self.categoriesJsonPath)
                    self.update(data, fullPath)

    # 更新
    def update(self, data, fullPath):
        tags = fullPath.split('/')[2:-1]
        newData = {
            "tags": tags,
            "year": 2025,
            "json": fullPath[1:]
        }
        # print(tags, fullPath)
        # 檢查重複元素
        if newData not in data["dataList"]:
            data["dataList"].append(newData)
            self.jsonController.jsonWriter(self.categoriesJsonPath, data)
        else:
            print(f"pass {fullPath}")


def main():
    CM = CategoriesManager()
    CM.traversal()

    data = CM.jsonController.jsonReader(CM.categoriesJsonPath)
    CM.jsonController.jsonViewer(data)


if __name__ == "__main__":
    main()
