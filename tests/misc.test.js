const {OrangeColor} = require('./../index')

test('cloned object changes do not affect original object', () => {
  const color = new OrangeColor('ff8080')
  const color2 = color.clone();
  const color3 = color.clone();
  color2.h = 120
  color3.hex_string = '8080ff'
  expect(color.hex_string).toBe('ff8080')
  expect(color2.hex_string).toBe('80ff80')
  expect(color3.hex_string).toBe('8080ff')
})
