const {OrangeColor} = require('./../index')

const my_favorite_color = 'ffb765'
const color = new OrangeColor(my_favorite_color)
const colors = [my_favorite_color]
for (let i = 0; i < 4; i++){
  color.h += 15
  colors.push(color.hex_string)
}

const data = [
  ['ff0000', 0, 100, 100],
  ['800000', 0, 100, 50],
  ['ff8080', 0, 50, 100]
]

test.each(data)('RGB hex to HSV', (hex, h, s, v) => {
  const color = new OrangeColor(hex)
  expect(color.h).toBe(h)
  expect(color.s).toBe(s)
  expect(color.v).toBe(v)
})

test.each(data)('HSV to RGB hex', (hex, h, s, v) => {
  const color = new OrangeColor({h, s, v})
  expect(color.hex_string).toBe(hex)
})

test('modify HSV', () => {
  const color = new OrangeColor('ff8080')
  color.h = 120
  expect(color.hex_string).toBe('80ff80')
  color.s = 100
  expect(color.hex_string).toBe('00ff00')
  color.v = 50
  expect(color.hex_string).toBe('008000')
  color.h = 150
  expect(color.hex_string).toBe('008040')
  color.v = 100
  expect(color.hex_string).toBe('00ff80')
})
