class Node:
    def __init__(self, data) -> None:
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self) -> None:
        self.head = self.tail = None
    
    def isEmpty(self) -> bool:
        return self.head is None
    
    def __len__(self) -> int:
        count = 0
        currentNode = self.head
        while currentNode is not None:
            currentNode = currentNode.next
            count += 1
        return count
    
    def __str__(self) -> str:
        currentNode = self.head
        if self.isEmpty():
            return "This list is empty!"
        result = []
        while currentNode is not None:
            result.append(str(currentNode.data))
            currentNode = currentNode.next
        return " -> ".join(result) + " -> None"

    def appendNode(self, data: int) -> None:
        newNode = Node(data)
        if self.isEmpty():
            self.head = self.tail = newNode
        else:
            self.tail.next = newNode
            self.tail = newNode

    def insertNode(self, index: int, data: int) -> None:
        linkedListLen = len(self)
        if index > linkedListLen or index < 0:
            print("your index is out of range!")
            return
        newNode = Node(data)
        if index == 0:
            newNode.next = self.head
            self.head = newNode
            if self.tail == None:
                self.tail = newNode
        else:
            count = 0
            currentNode = self.head
            previousNode = None
            while count != index:
                previousNode = currentNode
                currentNode = currentNode.next
                count += 1
            previousNode.next = newNode
            newNode.next = currentNode
            if newNode.next == None:
                self.tail = newNode
    
    def deleteNode(self, index: int) -> None:
        linkedListLen = len(self)
        if self.isEmpty():
            print("This list is empty!")
            return
        if index >= linkedListLen or index < 0:
            print("your index is out of range!")
            return
        elif index == 0:
            self.head = self.head.next
            if self.head is None:  # list is now empty
                self.tail = None
        else:
            count = 0
            currentNode = self.head
            previousNode = None
            while count != index:
                previousNode = currentNode
                currentNode = currentNode.next
                count += 1
            previousNode.next = currentNode.next
            if previousNode.next == None:
                self.tail = previousNode
    
    def clear(self) -> None:
        self.head = self.tail = None

    def search(self, value: int) -> int:
        currentNode = self.head
        index = 0
        while currentNode:
            if currentNode.data == value:
                return index
            currentNode = currentNode.next
            index += 1
        return -1  # 找不到


def main():
    LL = LinkedList()
    LL.appendNode(10)
    LL.appendNode(20)
    LL.insertNode(2, 30)   # 尾部插入
    LL.insertNode(0, 5)    # 頭部插入
    LL.insertNode(2, 15)   # 中間插入
    print(LL)              # 5 -> 10 -> 15 -> 20 -> 30 -> None

    LL.deleteNode(0)       # 刪頭
    LL.deleteNode(2)       # 刪中
    LL.deleteNode(len(LL)-1)  # 刪尾
    print(LL)              # 應為：10 -> 15 -> None

    print("Search 15:", LL.search(15))  # 1
    print("Search 100:", LL.search(100))  # -1
    # print("As list:", LL.toList())  # [10, 15]

    LL.clear()
    print(LL)              # This list is empty!


if __name__ == "__main__":
    main()