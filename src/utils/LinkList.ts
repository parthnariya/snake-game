type SnakeNodeType = {
  row: number;
  col: number;
  cellValue: number;
};

export class LinkListNode {
  value: SnakeNodeType;
  next: LinkListNode | null;
  constructor(value: SnakeNodeType) {
    this.value = value;
    this.next = null;
  }
}
class LinkList {
  head: LinkListNode;
  tail: LinkListNode;
  constructor(value: SnakeNodeType) {
    const node = new LinkListNode(value);
    this.head = node;
    this.tail = node;
  }
}
export default LinkList;
