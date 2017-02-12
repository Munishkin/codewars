pushAtom = (stack, atom, index) ->
    # push previous element if exists
    a = {}
    a[atom] = Number(index) if atom isnt '' and index isnt ''
    a[atom] = 1 if atom isnt '' and index is ''
    stack.push (a) if a[atom]

pushMoleculeBtwBrackets = (stack, openBracket, closeBracket, index) ->
  moculeStack = []
  for i in [stack.length - 2..0] by -1
    if stack[i] is openBracket then break
    else moculeStack.push(stack[i])
  moculeStack = moculeStack.reverse()
  for i in [0...index]
    stack.push (openBracket)
    for e in moculeStack
      stack.push (e)
    stack.push (closeBracket)
  
pushAtomOrMolecule = (stack,atom, index) ->
  if atom isnt ''  then pushAtom(stack, atom, index)
  # push complex molecule
  else if atom is '' and index isnt ''
    closeBracket = stack[stack.length - 1]
    repeatedCount = (Number(index) - 1)
    if closeBracket is ']'
      pushMoleculeBtwBrackets stack, '[', ']', repeatedCount
    else if closeBracket is ')'
      pushMoleculeBtwBrackets stack, '(', ')', repeatedCount
    else if closeBracket is '}'
      pushMoleculeBtwBrackets stack, '{', '}', repeatedCount

parseMolecule = (formula) ->
# do your science here
  openBrackets = [ '[', '{', '(' ]
  closeBrackets = [ ']', '}', ')' ]
  molecules = {}
  atom = ''
  index = ''
  stack = []
  for i in [0...formula.length]
    token = formula[i]
    if token in openBrackets
      # push previous atom or complex mocule if exists
      pushAtomOrMolecule(stack, atom, index)
      atom = ''
      index = ''
      # push bracket in
      stack.push (token)
    else if token in closeBrackets
      pushAtomOrMolecule(stack, atom, index)
      atom = ''
      index = ''
      stack.push (token)
    else if token in '01234567890'
      # number. maybe it is more than 1 digit
      index = index + token
    else if token in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      # push previous atom or complex mocule if exists
      pushAtomOrMolecule(stack, atom, index)
      atom = token
      index = ''
    else if token in 'abcdefghijklmnopqrstuvwxyz'
      # part of element name
      atom = atom + token
  pushAtomOrMolecule(stack, atom, index)
  for e in stack
    if e not in openBrackets and e not in closeBrackets
      for k,v of e
        molecules[k] = molecules[k] + v if molecules[k]?
        molecules[k] = v if !molecules[k]?
  molecules
