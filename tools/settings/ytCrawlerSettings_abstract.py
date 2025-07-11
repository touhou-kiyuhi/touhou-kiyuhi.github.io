import sys, os
sys.path.append(os.getcwd())


class YTCrawlerSettings:
    def __init__(self):
        # Define the headers to mimic a real browser request
        self.HEADERS = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }