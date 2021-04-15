/**
 * Class instance represents one color and allows to modify and convert it
 * Static methods provide color format transformations functionality
 */
class OrangeColor {

  /**
   * Creates color object
   *
   * @param {string|{"h": number, "s": number, "v": number}|{"r": number, "g": number, "b": number}} input String in RRGGBB format or object with "h,s,v" or "r,g,b" properties
   */
  constructor (input) {
    this.rgb_data = {}
    this.hsv_data = {}
    if (typeof input === 'string') {
      input = this.constructor.parseInputString(input)
    }
    if (typeof input === 'string') {
      this.rgb = this.constructor.HEX2RGB(input)
    } else if (typeof input === 'object') {
      if (input.hasOwnProperty('r') && input.hasOwnProperty('g') && input.hasOwnProperty('b')) {
        this.rgb = input
      } else if (input.hasOwnProperty('h') && input.hasOwnProperty('s') && input.hasOwnProperty('v')) {
        this.hsv = input
      } else {
        throw new Error(`Unknown color format. Object should have (r,g,b) or (h,s,v) parameters`)
      }
    } else {
      throw new Error(`Incorrect input type: ${typeof input} is provided, string or object required`)
    }
  }

  /**
   * Parses input
   *
   * @param {string} input String in one of these formats: RRGGBB, #RRGGBB, rgb(R,G,B), hsv(H,S,V) (spaces allowed)
   *
   * @return {string|{"h": number, "s": number, "v": number}|{"r": number, "g": number, "b": number}} input String in RRGGBB format or object with "h,s,v" or "r,g,b" properties
   */
  static parseInputString (input) {
    input = input.replace(/\s/g, '')
    let match;
    match = input.match(/^#?([0-9a-fA-F]{3})$/)
    if (match) return `${match[1][0]}${match[1][0]}${match[1][1]}${match[1][1]}${match[1][2]}${match[1][2]}`
    match = input.match(/^#?([0-9a-fA-F]{6})$/)
    if (match) return match[1]
    match = input.match(/^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})(,[0-9]\.?[0-9]*)?\)$/)
    if (match) return {"r": parseInt(match[1]), "g": parseInt(match[2]), "b": parseInt(match[3])}
    match = input.match(/^hsv\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})\)$/)
    if (match) return {"h": parseInt(match[1]), "s": parseInt(match[2]), "v": parseInt(match[3])}
  }

  /**
   * Clones object
   *
   * @return {OrangeColor}
   */
  clone () {
    return new this.constructor(this.hex_string)
  }

  /**
   * Color hex RRGGBB representation
   *
   * @type {string}
   */
  set hex_string (value) {
    this.rgb = this.constructor.HEX2RGB(value)
  }

  /**
   * Color hex RRGGBB representation
   *
   * @type {string}
   */
  get hex_string () {
    return this.constructor.RGB2HEX(this.rgb_data)
  }

  /**
   * Color HSV (Hue Saturation Value) representation
   *
   * @type {{"h": number, "s": number, "v": number}}
   */
  set hsv (value) {
    this.hsv_data = value
    this._validateHSV()
    this.rgb_data = this.constructor.HSV2RGB(this.hsv_data)
  }

  /**
   * Color HSV (Hue Saturation Value) representation
   *
   * @type {{"h": number, "s": number, "v": number}}
   */
  get hsv () {
    return this.hsv_data
  }

  /**
   * Color hue component
   *
   * @type {number}
   */
  set h (value) {
    if (value < 0) {
      this.h = 360 + value
    } else {
      this.hsv_data.h = value % 360
      this._validateHSV()
      this.rgb_data = this.constructor.HSV2RGB(this.hsv_data)
    }
  }

  /**
   * Color hue component
   *
   * @type {number}
   */
  get h () {
    return this.hsv_data.h
  }

  /**
   * Color saturation component
   *
   * @type {number}
   */
  set s (value) {
    this.hsv_data.s = value
    this._validateHSV()
    this.rgb_data = this.constructor.HSV2RGB(this.hsv_data)
  }

  /**
   * Color saturation component
   *
   * @type {number}
   */
  get s () {
    return this.hsv_data.s
  }

  /**
   * Color value component
   *
   * @type {number}
   */
  set v (value) {
    this.hsv_data.v = value
    this._validateHSV()
    this.rgb_data = this.constructor.HSV2RGB(this.hsv_data)
  }

  /**
   * Color value component
   *
   * @type {number}
   */
  get v () {
    return this.hsv_data.v
  }

  /**
   * Color RGB (Red, Green, Blue) representation
   *
   * @type {{"r": number, "g": number, "b": number}}
   */
  set rgb (value) {
    this.rgb_data = value
    this._validateRGB()
    this.hsv_data = this.constructor.RGB2HSV(this.rgb_data)
  }

  /**
   * Color RGB (Red, Green, Blue) representation
   *
   * @type {{"r": number, "g": number, "b": number}}
   */
  get rgb () {
    return this.rgb_data
  }

  /**
   * Color red component
   *
   * @type {number}
   */
  set r (value) {
    this.rgb_data.r = value
    this._validateRGB()
    this.hsv_data = this.constructor.RGB2HSV(this.rgb_data)
  }

  /**
   * Color red component
   *
   * @type {number}
   */
  get r () {
    return this.rgb_data.r
  }

  /**
   * Color green component
   *
   * @type {number}
   */
  set g (value) {
    this.rgb_data.g = value
    this._validateRGB()
    this.hsv_data = this.constructor.RGB2HSV(this.rgb_data)
  }

  /**
   * Color green component
   *
   * @type {number}
   */
  get g () {
    return this.rgb_data.g
  }

  /**
   * Color blue component
   *
   * @type {number}
   */
  set b (value) {
    this.rgb_data.b = value
    this._validateRGB()
    this.hsv_data = this.constructor.RGB2HSV(this.rgb_data)
  }

  /**
   * Color blue component
   *
   * @type {number}
   */
  get b () {
    return this.rgb_data.b
  }

  /**
   * Validates HSV object
   *
   * @private
   */
  _validateHSV () {
    if (this.hsv_data.h >= 360) {
      throw new Error('HSV Hue is greater or equal to 360')
    } else if (this.hsv_data.h < 0) {
      throw new Error('HSV Hue is lesser than 0')
    }
    if (this.hsv_data.s > 100) {
      throw new Error('HSV Saturation is greater than 100')
    } else if (this.hsv_data.s < 0) {
      throw new Error('HSV Saturation is lesser than 0')
    }
    if (this.hsv_data.v > 100) {
      throw new Error('HSV Value is greater than 100')
    } else if (this.hsv_data.v < 0) {
      throw new Error('HSV Value is lesser than 0')
    }
  }

  /**
   * Validates RGB object
   *
   * @private
   */
  _validateRGB () {
    if (this.rgb_data.r > 255) {
      throw new Error('RGB Red is greater than 255')
    } else if (this.rgb_data.r < 0) {
      throw new Error('RGB Red is lesser than 0')
    }
    if (this.rgb_data.g > 255) {
      throw new Error('RGB Green is greater than 255')
    } else if (this.rgb_data.g < 0) {
      throw new Error('RGB Green is lesser than 0')
    }
    if (this.rgb_data.b > 255) {
      throw new Error('RGB Blue is greater than 255')
    } else if (this.rgb_data.b < 0) {
      throw new Error('RGB Blue is lesser than 0')
    }
  }

  /**
   * Converts RRGGBB string to RGB object
   *
   * @param rgb_hex_string
   * @return {{"r": number, "g": number, "b": number}}
   * @static
   */
  static HEX2RGB (rgb_hex_string) {
    const i = parseInt(`0x${rgb_hex_string}`)
    return {
      'r': (i & 0xff0000) >> 16,
      'g': (i & 0xff00) >> 8,
      'b': i & 0xff
    }
  }

  /**
   * Converts RGB object to RRGGBB string
   *
   * @param {{"r": number, "g": number, "b": number}} rgb
   * @return {string}
   * @static
   */
  static RGB2HEX (rgb) {
    const r = Math.round(rgb.r).toString(16)
    const g = Math.round(rgb.g).toString(16)
    const b = Math.round(rgb.b).toString(16)
    return `${r.length === 1 ? '0' : ''}${r}${g.length === 1 ? '0' : ''}${g}${b.length === 1 ? '0' : ''}${b}`
  }

  /**
   * Converts RGB object to HSV object
   *
   * @param {{"r": number, "g": number, "b": number}} rgb RGB object
   * @param {boolean} round Defines if values should be rounded
   * @return {{"h": number, "s": number, "v": number}}
   * @static
   */
  static RGB2HSV (rgb, round = true) {
    const rgb2 = {
      'r': rgb.r / 255,
      'g': rgb.g / 255,
      'b': rgb.b / 255
    }
    let c_max = 0
    if (rgb2.r > c_max) c_max = rgb2.r
    if (rgb2.g > c_max) c_max = rgb2.g
    if (rgb2.b > c_max) c_max = rgb2.b
    let c_min = 1
    if (rgb2.r < c_min) c_min = rgb2.r
    if (rgb2.g < c_min) c_min = rgb2.g
    if (rgb2.b < c_min) c_min = rgb2.b
    const c_delta = c_max - c_min
    let h = 0
    if (c_delta) {
      if (c_max === rgb2.r) {
        h = ((rgb2.g - rgb2.b) / c_delta) % 6
      } else if (c_max === rgb2.g) {
        h = ((rgb2.b - rgb2.r) / c_delta) + 2
      } else {
        h = ((rgb2.r - rgb2.g) / c_delta) + 4
      }
    }
    h = h * 60
    if (h < 0) {
      h = 360 + h
    }
    let s = 0
    if (c_max) {
      s = c_delta / c_max * 100
    }
    let v = c_max * 100
    if (round) {
      h = Math.round(h)
      s = Math.round(s)
      v = Math.round(v)
    }
    return {h, s, v}
  }

  /**
   * Converts HSV object to RGB object
   *
   * @param {{"h": number, "s": number, "v": number}} hsv
   * @param {boolean} round Defines if values should be rounded
   * @return {{"r": number, "g": number, "b": number}}
   * @static
   */
  static HSV2RGB (hsv, round = true) {
    const s = hsv.s / 100
    const v = hsv.v / 100
    let r = 0
    let g = 0
    let b = 0
    const c = v * s
    const x = c * (1 - Math.abs((hsv.h / 60) % 2 - 1))
    const m = v - c
    if (hsv.h < 0) {
      throw new Error(`HSV Hue is lesser than zero: ${hsv.h}`)
    } else if (hsv.h < 60) {
      r = c
      g = x
      b = 0
    } else if (hsv.h < 120) {
      r = x
      g = c
      b = 0
    } else if (hsv.h < 180) {
      r = 0
      g = c
      b = x
    } else if (hsv.h < 240) {
      r = 0
      g = x
      b = c
    } else if (hsv.h < 300) {
      r = x
      g = 0
      b = c
    } else if (hsv.h < 360) {
      r = c
      g = 0
      b = x
    } else {
      throw new Error('HSV Hue is greater or equal to 360')
    }
    r = (r + m) * 255
    g = (g + m) * 255
    b = (b + m) * 255
    if (round) {
      r = Math.round(r)
      g = Math.round(g)
      b = Math.round(b)
    }
    return {r, g, b}
  }

}

module.exports = OrangeColor