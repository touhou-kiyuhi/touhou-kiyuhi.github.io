package programSource.dataStructure.linkedList.singleLinkedList;

import java.util.ArrayList;
import java.util.List;

public class SingleLinkedListMain {
    public static void main(String[] args) {
        SingleLinkedList SLL = new SingleLinkedList();
        // 新增節點
        SLL.appendNode("B");
        SLL.appendNode("BC");
        System.out.println(SLL.toString()); // B -> BC -> None
        // 插入節點
        SLL.insertNode("A", 0);
        SLL.insertNode("C", 3);
        System.out.println(SLL.toString()); // A -> B -> BC -> C -> None
        // 更新節點
        SLL.updateNode("AA", 0);
        System.out.println(SLL.toString()); // AA -> B -> BC -> C -> None
        // 刪除節點
        SLL.deleteNode(2);
        System.out.println(SLL.toString()); // AA -> B -> C -> None
        // 反轉 Linked List
        SLL.reverseLinkedList();
        System.out.println(SLL.toString()); // C -> B -> AA -> None
        System.out.println("取得節點: " + SLL.getNodeByIndex(1).val);
        System.out.println("搜尋節點: " + SLL.findNode("B"));
        // 清空 Linked List
        SLL.clear();
        System.out.println(SLL.toString()); // This linked list is empty
    }
}

class ListNode {

    public Object val;
    public ListNode next;
    public ListNode() {}
    public ListNode(Object val) {
        this.val = val;
        this.next = null;
    }

}

class SingleLinkedList {

    ListNode head;
    public SingleLinkedList() {
        this.head = null;
    }
    // 新增節點
    public void appendNode(Object data) {
        ListNode newNode = new ListNode(data);
        if (this.head == null) {
            this.head = newNode;
        } else {
            ListNode currentNode = this.head;
            while (currentNode.next != null) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
    }
    // 插入節點
    public void insertNode(Object data, Integer index) {
        ListNode newNode = new ListNode(data);
        if (this.head == null && index > 0) {
            throw new IndexOutOfBoundsException("Insert index out of range on empty linked list");
        } else if (index == 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            ListNode currentNode = this.head;
            int i = 1;
            while (currentNode.next != null && i < index) {
                currentNode = currentNode.next;
                i++;
            }
            if (i < index) {
                throw new IndexOutOfBoundsException("Insert index out of range");
            } else {
                newNode.next = currentNode.next;
                currentNode.next = newNode;
            }
        }
    }
    // 取得節點
    public ListNode getNodeByIndex(Integer index) {
        if (this.head == null) {
            throw new IndexOutOfBoundsException("Get index out of range on empty linked list");
        } else {
            ListNode currentNode = this.head;
            int i = 0;
            while (currentNode != null && i < index) {
                currentNode = currentNode.next;
                i++;
            }
            if (currentNode == null) {
                throw new IndexOutOfBoundsException("Get index out of range");
            }
            return currentNode;
        }
    }
    public Integer findNode(Object data) {
        ListNode currentNode = this.head;
        int index = 0;
        while (currentNode != null) {
            if (currentNode.val == data) {
                return index;
            }
            currentNode = currentNode.next;
            index++;
        }
        return null;
    }
    // 更新節點
    public void updateNode(Object data, Integer index) {
        if (this.head == null) {
            throw new IndexOutOfBoundsException("Update index out of range on empty linked list");
        } else {
            ListNode currentNode = this.head;
            int i = 0;
            while (currentNode != null && i < index) {
                currentNode = currentNode.next;
                i++;
            }
            if (currentNode == null) {
                throw new IndexOutOfBoundsException("Update index out of range");
            } else {
                currentNode.val = data;
            }
        }
    }
    // 刪除節點
    public void deleteNode(Integer index) {
        if (this.head == null) {
            throw new IndexOutOfBoundsException("Delete index out of range on empty linked list");
        } else if (index == 0) {
            this.head = this.head.next;
        } else {
            ListNode previousNode = this.head;
            ListNode currentNode = this.head.next;
            int i = 1;
            while (currentNode != null && i < index) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                i++;
            }
            if (currentNode == null) {
                throw new IndexOutOfBoundsException("Delete index out of range");
            } else {
                previousNode.next = currentNode.next;
            }
        }
    }
    // 反轉 Linked List
    public void reverseLinkedList() {
        if (this.head == null) {
            throw new IllegalArgumentException("Cannot reverse an empty linked list");
        } else {
            ListNode previousNode = null;
            ListNode currentNode = this.head;
            while (currentNode != null) {
                ListNode nextNode = currentNode.next;
                currentNode.next = previousNode;
                previousNode = currentNode;
                currentNode = nextNode;
            }
            this.head = previousNode;
        }
    }
    // 清空 Linked List
    public void clear() {
        this.head = null;
    }

    public int size() {
        int count = 0;
        ListNode currentNode = this.head;
        while (currentNode != null) {
            count++;
            currentNode = currentNode.next;
        }
        return count;
    }

    public List<Object> toList() {
        ListNode currentNode = this.head;
        List<Object> resultList = new ArrayList<>();
        while (currentNode != null) {
            resultList.add(currentNode.val);
            currentNode = currentNode.next;
        }
        return resultList;
    }

    @Override
    public String toString() {
        return this.head != null? String.join(
            " -> ", 
            this.toList().stream().map(String::valueOf).toList()
        ) + " -> None":"This linked list is empty";
    }

}