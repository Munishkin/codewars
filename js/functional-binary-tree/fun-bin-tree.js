// However, when dealing with immutable nodes, one has to take special steps to
// try to maintain efficiency. For example, to insert a node into a tree,
// one needs to create
// new nodes the whole way down to the insertion point, but one needn't
// create any more nodes than there are on the path from the root of the
// tree to the inserted node.

// In some binary search tree implementations, one stores a value with a given key.
// The key is used to decide where to place the item in the tree and where to look
// for the item in the tree. In this kata, we will only be concerned with a tree
// where the value also serves as the key. All values added to the tree will be
// (usefully) comparable with < to all other values placed in the same tree. If
// you are at a node n and you are looking for a value that is less than n.value,
// then you should only need to look in the n.left subtree.

// There are two classes involved here: EmptyBinaryTree and BinaryTreeNode.
// Each of these should support the following operations: isEmpty(), depth(),
// count(), inorder(), preorder(), postorder(), contains(), insert(), and remove().

// The isEmpty() method should return true for EmptyBinaryTree instances and false
// for BinaryTreeNode instances.

// The depth() method should return the maximum number of nodes one would need to visit
// to get from the current node to an empty node. In the above diagram, the depth
// at the 'c' node would be 3. The depth at the 'd' node would be 1.

// The count() method should return the number of non-empty nodes in the tree.

// The inorder(fn), preorder(fn), and postorder(fn) methods each call the given
// function fn with every value in the tree. The inorder(fn) should do the
// left subtree before calling fn for the current value and then do the right subtree.
// The preorder(fn) should call fn for the current value then do the left subtree
// and then do the right subtree. The postorder(fn) should do the left subtree then
// the right subtree and then call fn for the current value.

// The contains(x) function should return whether the given tree contains a node
// whose value is x. Note: this should not have to look at every node in the tree
// to decide.

// The insert(x) function returns a new tree that contains a new node with value x.
// If there is already a node containing x, this should still add another one,
// but it doesn't matter whether it is right or left of the existing one
// (or even if you just use a repeat-count in the BinaryTreeNode). Note:
// there are several ways one could write this function. For this kata,
// if the tree is non-empty, then inserting a new value should result in a
// tree with the same root value as the previous tree. With the above examples,
// this means:

function BinaryTree() {};

function BinaryTreeNode(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
  Object.freeze(this);
}
BinaryTreeNode.prototype = new BinaryTree();
BinaryTreeNode.prototype.constructor = BinaryTreeNode;

BinaryTreeNode.prototype.isEmpty = function() { /* implement this */ };
BinaryTreeNode.prototype.depth = function() { /* implement this */ };
BinaryTreeNode.prototype.count = function() { /* implement this */ };

BinaryTreeNode.prototype.inorder = function(fn) { /* implement this */ };
BinaryTreeNode.prototype.preorder = function(fn) { /* implement this */ };
BinaryTreeNode.prototype.postorder = function(fn) { /* implement this */ };

BinaryTreeNode.prototype.contains = function(x) { /* implement this */ };
BinaryTreeNode.prototype.insert = function(x) { /* implement this */ };
BinaryTreeNode.prototype.remove = function(x) { /* implement this */ };

////////////////////////////////////////////////////////////////////////
function EmptyBinaryTree() { Object.freeze(this); }
EmptyBinaryTree.prototype = new BinaryTree();
EmptyBinaryTree.prototype.constructor = EmptyBinaryTree;

EmptyBinaryTree.prototype.isEmpty = function() { /* implement this */ };
EmptyBinaryTree.prototype.depth = function() { /* implement this */ };
EmptyBinaryTree.prototype.count = function() { /* implement this */ };

EmptyBinaryTree.prototype.inorder = function(fn) { /* implement this */ };
EmptyBinaryTree.prototype.preorder = function(fn) { /* implement this */ };
EmptyBinaryTree.prototype.postorder = function(fn) { /* implement this */ };

EmptyBinaryTree.prototype.contains = function(x) { /* implement this */ };
EmptyBinaryTree.prototype.insert = function(x) { /* implement this */ };
EmptyBinaryTree.prototype.remove = function(x) { /* implement this */ };
