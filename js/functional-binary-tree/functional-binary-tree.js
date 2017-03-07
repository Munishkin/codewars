// There are two classes involved here: EmptyBinaryTree and BinaryTreeNode.
// Each of these should support the following operations: isEmpty(), depth(),
// count(), inorder(), preorder(), postorder(), contains(), insert(), and remove().

function BinaryTree() {};

function BinaryTreeNode(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
  Object.freeze(this);
}
BinaryTreeNode.prototype = new BinaryTree();
BinaryTreeNode.prototype.constructor = BinaryTreeNode;

BinaryTreeNode.prototype.isEmpty = function() { return false; };
BinaryTreeNode.prototype.depth = function() {
  // return the maximum number of nodes one would need to visit
  // to get from the current node to an empty node
  return Math.max(this.left.depth(), this.right.depth()) + 1;
};

BinaryTreeNode.prototype.count = function() {
  // count non-empty tree node in the tree
  return this.left.count() + this.right.count() + 1;
};

BinaryTreeNode.prototype.inorder = function(fn) {
  // The inorder(fn) should do the left subtree before calling fn for the
  // current value and then do the right subtree.
  return this.left.inorder(fn) + fn(this.value) + this.right.inorder(fn);
};

BinaryTreeNode.prototype.preorder = function(fn) {
  // The preorder(fn) should call fn for the current value then do the left subtree
  // and then do the right subtree.
  return fn(this.value) + this.left.preorder(fn) + this.right.preorder(fn);
};

BinaryTreeNode.prototype.postorder = function(fn) {
  // The postorder(fn) should do the left subtree then
  // the right subtree and then call fn for the current value.
  return this.left.postorder(fn) + this.right.inorder(fn) + fn(this.value);
};

BinaryTreeNode.prototype.contains = function(x) {
  // The contains(x) function should return whether the given tree contains a node
  // whose value is x.
  if (this.value === x) { return true; }
  if (x < this.value) { return this.left.contains(x); }
  return this.right.contains(x);
};
BinaryTreeNode.prototype.insert = function(x) {
  // The insert(x) function returns a new tree that contains a new node with value x.
  // If there is already a node containing x, this should still add another one,
  // but it doesn't matter whether it is right or left of the existing one
  if (this.value <= x) {
    this.left = this.left.insert(x);
  } else {
    this.right = this.right.insert(x);
  }
  return this;
};
BinaryTreeNode.prototype.remove = function(x) {
  if (this.value === x) {
      // empty tree after removal
      if (this.left instanceof EmptyBinaryTree &&
          this.right instanceof EmptyBinaryTree) {
        let tempRoot = this.left;
        this.left = this.right = null;
        return tempRoot;
      } else {
        if (this.left instanceof BinaryTreeNode && this.right instanceof EmptyBinaryTree) {
          return this.left;
        } else if (this.right instanceof BinaryTreeNode && this.left instanceof EmptyBinaryTree) {
          return this.right;
        } else {
          // replace root with smallest child of right subtree
          // remove smallest child of the right subtree
        }
      }
  } else if (x < this.value) {
    this.left = this.left.remove(x);
  } else {
    this.right = this.right.remove(x);
  }
  return this;
};

////////////////////////////////////////////////////////////////////////
function EmptyBinaryTree() { Object.freeze(this); }
EmptyBinaryTree.prototype = new BinaryTree();
EmptyBinaryTree.prototype.constructor = EmptyBinaryTree;

EmptyBinaryTree.prototype.isEmpty = function() { return true; };
EmptyBinaryTree.prototype.depth = function() { return 0; };
EmptyBinaryTree.prototype.count = function() { return 0; };

EmptyBinaryTree.prototype.inorder = function(fn) { return ''; };
EmptyBinaryTree.prototype.preorder = function(fn) { return ''; };
EmptyBinaryTree.prototype.postorder = function(fn) { return ''; };

EmptyBinaryTree.prototype.contains = function(x) { return false; };
EmptyBinaryTree.prototype.insert = function(x) {
  return new BinaryTreeNode(x, this, this);
};
EmptyBinaryTree.prototype.remove = function(x) { return this; };
