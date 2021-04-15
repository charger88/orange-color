const {OrangeColor} = require('./../index')

test('constructor parser hex', () => {
  const color = new OrangeColor('ff80cc')
  expect(color.hex_string).toBe('ff80cc')
})
test('constructor parser hex with spaces', () => {
  const color = new OrangeColor('     ff80cc')
  expect(color.hex_string).toBe('ff80cc')
})

test('constructor parser short hex', () => {
  const color = new OrangeColor('f8c')
  expect(color.hex_string).toBe('ff88cc')
})

test('constructor parser HEX', () => {
  const color = new OrangeColor('FF80CC')
  expect(color.hex_string).toBe('ff80cc')
})

test('constructor parser #hex', () => {
  const color = new OrangeColor('#ff80cc')
  expect(color.hex_string).toBe('ff80cc')
})

test('constructor parser rgb', () => {
  const color = new OrangeColor('rgb(255,128,0)')
  expect(color.hex_string).toBe('ff8000')
})

test('constructor parser rgba', () => {
  const color = new OrangeColor('rgb(255,128,0,1.0)')
  expect(color.hex_string).toBe('ff8000')
})

test('constructor parser rgba zero', () => {
  const color = new OrangeColor('rgb(255,128,0,0)')
  expect(color.hex_string).toBe('ff8000')
})

test('constructor parser rgba long', () => {
  const color = new OrangeColor('rgb(255,128,0,0.221576454)')
  expect(color.hex_string).toBe('ff8000')
})

test('constructor parser rgb spaces', () => {
  const color = new OrangeColor('rgb (255, 128, 0)')
  expect(color.hex_string).toBe('ff8000')
})

test('constructor parser hsv', () => {
  const color = new OrangeColor('hsv(0,50,100)')
  expect(color.hex_string).toBe('ff8080')
})

