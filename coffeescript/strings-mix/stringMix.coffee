constructMixMap = (mix_map, text, index) ->
  lowercase = 'abcdefghijklmnopqrstuvwxyz'
  for s in text
    if s in lowercase
      if mix_map[s]? and mix_map[s][index]?
        mix_map[s][index].count += 1
        mix_map[s][index].string += s
      else
        if !mix_map[s]?
          mix_map[s] = {}
        mix_map[s][index] = { count : 1, string : s }

mix = (s1, s2) ->
  # your code
  mix_map = {}
  # { 'a' : { '1' :  { 'count: 3, string: 'aaa' } }
  #           '2' :  { 'count: 1, string: 'b' } }
  #         }
  # }
  constructMixMap(mix_map, s1, 1)
  constructMixMap(mix_map, s2, 2)
  result = ""
  max_sort_map = []
  for k of mix_map
    if mix_map[k][1]? and mix_map[k][2]?
      if mix_map[k][1].count is mix_map[k][2].count and mix_map[k][1].count > 1
        max_sort_map.push ({ count: mix_map[k][1].count, position: 3, string: '=:' + mix_map[k][1].string })
      else if mix_map[k][1].count > mix_map[k][2].count and mix_map[k][1].count > 1
        max_sort_map.push ({ count: mix_map[k][1].count, position: 1, string: '1:' + mix_map[k][1].string })
      else 
        if mix_map[k][2].count > 1
          max_sort_map.push ({ count: mix_map[k][2].count, position: 2, string: '2:' + mix_map[k][2].string })
    else if mix_map[k][1]? and mix_map[k][1].count > 1
        max_sort_map.push ({ count: mix_map[k][1].count, position: 1, string: '1:' + mix_map[k][1].string })
    else if mix_map[k][2]? and mix_map[k][2].count > 1
        max_sort_map.push ({ count: mix_map[k][2].count, position: 2, string: '2:' + mix_map[k][2].string })

  max_sort_map.sort((a,b) ->
    if a.count isnt b.count then return (b.count - a.count)
    else # same count
      if a.position is b.position
        console.log (a.string[2].charCodeAt(0) - b.string[2].charCodeAt(0) )
        return (a.string[2].charCodeAt(0) - b.string[2].charCodeAt(0))
      else return (a.position - b.position)
  )
  console.log (max_sort_map)
  for e in max_sort_map
    if result isnt '' then result += '/'
    result += e.string
  result
