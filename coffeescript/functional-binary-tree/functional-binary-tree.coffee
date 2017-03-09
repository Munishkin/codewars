class BinaryTree
  constructor: () ->

class BinaryTreeNode extends BinaryTree
  constructor: (@value, @left, @right) -> Object.freeze(@)
  isEmpty: () -> false
  depth: () ->
    Math.max(this.left.depth(), this.right.depth()) + 1
  count: () ->
    this.left.count() + this.right.count() + 1

  inorder: (fn) ->
    this.left.inorder fn + fn this.value + this.right.inorder fn

  preorder: (fn) ->
    fn this.value + this.left.preorder fn + this.right.preorder fn

  postorder: (fn) ->
    this.left.postorder fn + this.right.postorder fn + fn this.value

  contains: (x) -> # implement me
  insert: (x) -> # implement me
  remove: (x) -> # implement me

class EmptyBinaryTree extends BinaryTree
  constructor: () -> Object.freeze(@)
  isEmpty: () -> true
  depth: () -> 0
  count: () -> 0
  inorder: (fn) -> fn ''
  preorder: (fn) -> fn ''
  postorder: (fn) -> fn ''
  contains: (x) -> false
  insert: (x) -> new BinaryTreeNode x, this, this
  remove: (x) -> this
