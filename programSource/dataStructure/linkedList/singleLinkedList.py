from typing import Optional, Iterator


class ListNode:
    def __init__(self, val: object) -> None:
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self) -> None:
        self.head = None

    def appendNode(self, data: object) -> None:
        newNode = ListNode(data)
        if self.head is None:
            self.head = newNode
        else:
            currentNode = self.head
            while currentNode.next is not None:
                currentNode = currentNode.next
            currentNode.next = newNode
    
    def insertNode(self, data: object, index: int) -> None:
        newNode = ListNode(data)
        if self.head is None and index > 0:
            raise IndexError("Insert index out of range on empty linked list")
        elif index == 0:
            newNode.next = self.head
            self.head = newNode
        else:
            currentNode = self.head
            i = 1
            while currentNode.next is not None and i < index:
                currentNode = currentNode.next
                i += 1
            if i < index:
                raise IndexError("Insert index out of range")
            else:
                newNode.next = currentNode.next
                currentNode.next = newNode
    
    def getNodeByIndex(self, index: int) -> Optional[ListNode]:
        if self.head is None:
            raise IndexError("Get index out of range on empty linked list")
        else:
            currentNode = self.head
            i = 0
            while currentNode is not None and i < index:
                currentNode = currentNode.next
                i += 1
            if currentNode is None:
                raise IndexError("Get index out of range")
            return currentNode
    
    def updateNode(self, data: object, index: int) -> None:
        if self.head is None:
            raise IndexError("Update index out of range on empty linked list")
        else:
            currentNode = self.head
            i = 0
            while currentNode is not None and i < index:
                currentNode = currentNode.next
                i += 1
            if currentNode is None:
                raise IndexError("Update index out of range")
            else:
                currentNode.val = data

    def deleteNode(self, index: int) -> None:
        if self.head is None:
            raise IndexError("Delete index out of range on empty linked list")
        elif index == 0:
            self.head = self.head.next
        else:
            previousNode = self.head
            currentNode = self.head.next
            i = 1
            while currentNode is not None and i < index:
                previousNode = currentNode
                currentNode = currentNode.next
                i += 1
            if currentNode is None:
                raise IndexError("Delete index out of range")
            else:
                previousNode.next = currentNode.next

    def reverseLinkedList(self) -> None:
        if self.head is None:
            raise ValueError("Cannot reverse an empty linked list")
        previousNode = None
        currentNode = self.head
        while currentNode is not None:
            nextNode = currentNode.next
            currentNode.next = previousNode
            previousNode = currentNode
            currentNode = nextNode
        self.head = previousNode
    
    def __len__(self) -> int:
        count = 0
        currentNode = self.head
        while currentNode is not None:
            count += 1
            currentNode = currentNode.next
        return count
    
    def __getitem__(self, index: int) -> object:
        if index < 0:
            index = len(self) + index
        return self.getNodeByIndex(index).val
    
    def __setitem__(self, index: int, data: object) -> None:
        self.getNodeByIndex(index).val = data

    def __iter__(self) -> Iterator[object]:
        currentNode = self.head
        while currentNode is not None:
            yield currentNode.val
            currentNode = currentNode.next

    def __str__(self) -> str:
        # first way
        return " -> ".join(str(val) for val in self) + " -> None" if self.head else "This linked list is empty"
        # # second way
        # if self.head is None:
        #     return "This linked list is empty"
        # currentNode = self.head
        # result = []
        # while currentNode is not None:
        #     result.append(str(currentNode.val))
        #     currentNode = currentNode.next
        # return " -> ".join(result) + " -> None"


def main():
    LL = LinkedList()
    LL.insertNode("B", 0)
    LL.insertNode("A", 0)
    LL.insertNode("C", 2)
    print(LL) # A -> B -> C -> None
    LL.updateNode("AA", 0)
    print(LL) # AA -> B -> C -> None
    print(LL[1]) # B
    print(LL[-1]) # C
    LL[2] = "CCC"
    print(LL) # AA -> B -> CCC -> None
    LL.reverseLinkedList()
    print(LL)


if __name__ == "__main__":
    main()