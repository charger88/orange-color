const {OrangeColor} = require('./../index')

test('transformation consistency test', () => {
  for (let i = 0; i < 16777216; i += Math.round(Math.random() * 10000)) {
  // for (let i = 0; i < 16777216; i++) { // Use this line for the full level of insanity
    const s = i.toString(16)
    const rgb_hex_string = "000000".slice(s.length) + s
    const rgb = OrangeColor.HEX2RGB(rgb_hex_string)
    const hsv = OrangeColor.RGB2HSV(rgb, false)
    const rgb2 = OrangeColor.HSV2RGB(hsv, false)
    const rgb_hex_string_res = OrangeColor.RGB2HEX(rgb2)
    expect(rgb_hex_string_res).toBe(rgb_hex_string)
  }
})
