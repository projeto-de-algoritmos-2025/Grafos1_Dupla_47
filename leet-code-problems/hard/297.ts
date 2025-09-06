/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}


/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  if (!root) return "";
  const queue: Array<TreeNode | null> = [root];
  const result: Array<string> = [];
  let lastLeftIsNull = false;
  let lastRightIsNull = false;
  while (queue.length > 0) {
    lastLeftIsNull = false;
    lastRightIsNull = false;
    const node = queue.shift();

    if (node) {
      result.push(node.val.toString());
      queue.push(node.left);
      queue.push(node.right);
      lastLeftIsNull = node.left === null;
      lastRightIsNull = node.right === null;
    } else {
      if (lastLeftIsNull && lastRightIsNull) break;
      result.push("null");
    }
  }

  return result.join(',');
};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  if (!data) return null;
  const valuesOfTree = data.split(',');

  if (valuesOfTree.length === 0 || valuesOfTree[0] === "null") return null;

  const root = new TreeNode(Number(valuesOfTree[0]));
  const queue: Array<TreeNode> = [root];
  let i = 1;

  while (queue.length > 0 && i < valuesOfTree.length) {
    const node = queue.shift();

    const leftValue = valuesOfTree[i];
    if (leftValue && leftValue !== "null") {
      node!.left = new TreeNode(Number(leftValue));
      queue.push(node!.left);
    }

    const rightValue = valuesOfTree[++i];
    if (rightValue && rightValue !== "null") {
      node!.right = new TreeNode(Number(rightValue));;
      queue.push(node!.right);
    }

    i++;
  }

  return root;
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
const tree = serialize(new TreeNode(1, new TreeNode(2)));

console.log(tree);

const node = deserialize(tree);

console.log(node);