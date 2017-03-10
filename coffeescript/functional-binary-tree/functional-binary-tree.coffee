class BinaryTree
  constructor: () ->

class BinaryTreeNode extends BinaryTree
  constructor: (@value, @left, @right) -> Object.freeze(@)
  isEmpty: () -> false
  depth: () ->
    Math.max(@left.depth(), @right.depth()) + 1
  count: () ->
    @left.count() + @right.count() + 1

  inorder: (fn) ->
    @left.inorder(fn) + fn(@value) + @right.inorder(fn)

  preorder: (fn) ->
    fn(@value) + @left.preorder(fn) + @right.preorder(fn)

  postorder: (fn) ->
    @left.postorder(fn) + @right.postorder(fn) + fn(@value)

  contains: (x) ->
    if @value is x then true
    else if x < @value then @left.contains x else @right.contains x

  insert: (x) ->
    if x < @value
      new BinaryTreeNode @value, @left.insert(x), @right
    else
      new BinaryTreeNode @value, @left, @right.insert(x)

  remove: (x) ->

    minValue = (root) ->
      if root.left.isEmpty() then root.value else minValue root.left

    if not this.contains(x) then this

    if @value is x
        # empty tree after removal
        if @left.isEmpty() and @right.isEmpty() then @left
        else
          if not @left.isEmpty() and @right.isEmpty() then @left
          else if not @right.isEmpty() and @left.isEmpty() then @right
          else
            #replace root with smallest child of right subtree
            #remove smallest child of the right subtree
            @value = minValue @right
            new BinaryTreeNode @value, @left, @right.remove(@value)
    else if x < @value
      if not @left.isEmpty() then new BinaryTreeNode @value, @left.remove(x), @right
    else
      if not @right.isEmpty() then new BinaryTreeNode @value, @left, @right.remove(x)
    this;

class EmptyBinaryTree extends BinaryTree
  constructor: () -> Object.freeze(@)
  isEmpty: () -> true
  depth: () -> 0
  count: () -> 0
  inorder: (fn) -> ''
  preorder: (fn) -> ''
  postorder: (fn) -> ''
  contains: (x) -> false
  insert: (x) -> new BinaryTreeNode x, this, this
  remove: (x) -> this
