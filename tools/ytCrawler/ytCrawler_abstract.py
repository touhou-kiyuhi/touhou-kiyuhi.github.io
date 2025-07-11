import sys, os, requests, re
sys.path.append(os.getcwd())
from tools.settings.ytCrawlerSettings_abstract import YTCrawlerSettings


class YTCrawler(YTCrawlerSettings):
    def __init__(self, url):
        super().__init__()
        self.url = url
        # "videoPrimaryInfoRenderer": {
        #     "title": {
        #         "runs": [
        #             {
        #                 "text": "20250711 絕·鐵子的部屋 進擊的鐵屑 極難"
        #             }
        #         ]
        #     }
        # }
        # ...
        # "videoId": ""
        self.regularExpressionRule = r'"videoPrimaryInfoRenderer":{.*?"title":\{"runs":\[\{"text":"(.*?)"\}\]\}.*?"videoId":"(.*?)"'
        self.ytTitle = ""
        self.ytVideoId = ""

    def crawler(self):
        response = requests.get(self.url, headers=self.HEADERS)
        if response.status_code == 200:
            match = re.search(self.regularExpressionRule, response.text)
            try:
                if match:
                    self.ytTitle = match.group(1)
                    self.ytVideoId = match.group(2)
                else:
                    print("No title found in the JSON response.")
            except Exception as e:
                 print(f"An error occurred while extracting the title: {e}")
        else:
            print(f"Request failed with status code: {response.status_code}")
        print(self.ytTitle, self.ytVideoId)

