import sys, os
sys.path.append(os.getcwd())
from tools.jsonClasses.jsonController_abstract import JsonController


class JsonSettings:
    def __init__(self):
        # Json Path
        self.JSON_ROOT_PATH = "./json"
        # Json Controller
        self.jsonController = JsonController()