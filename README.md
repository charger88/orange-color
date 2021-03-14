# Orange Color

Library for working with colors: RGB to HSV and HSV to RGB transformations; color modification by any component. 

## Classes

### OrangeColor

Class instance represents one color and allows to modify and convert it.

Static methods provide color format transformations functionality.
 
| Element | Name | Description | Arguments | Return type |
|---|---|---|---|---|
| constructor |  | Creates color object | `input` |  |
| method | `clone` | Clones object |  | `OrangeColor` |
| property | `hex_string` | Color hex RRGGBB representation |  | `string` |
| property | `rgb` | Color HSV (Hue Saturation Value) representation |  | `{"h": number, "s": number, "v": number}` |
| property | `h` | Color hue component |  | `number` |
| property | `s` | Color saturation component |  | `number` |
| property | `v` | Color value component |  | `number` |
| property | `rgb` | Color RGB (Red, Green, Blue) representation |  | `{"r": number, "g": number, "b": number}` |
| property | `r` | Color red component |  | `number` |
| property | `g` | Color green component |  | `number` |
| property | `b` | Color blue component |  | `number` |
| static method | `HEX2RGB` | Converts RRGGBB string to RGB object | `rgb_hex_string` | `{"r": number, "g": number, "b": number}` |
| static method | `RGB2HEX` | Converts RGB object to RRGGBB string | `rgb` | `string` |
| static method | `RGB2HSV` | Converts RGB object to HSV object | `rgb`, `round` | `{"h": number, "s": number, "v": number}` |
| static method | `HSV2RGB` | Converts HSV object to RGB object | `hsv`, `round` | `{"r": number, "g": number, "b": number}` |

## Examples

Let's say you have some color you like. You need to generate few more colors with the same saturation and value (black color component in [HSV model](https://en.wikipedia.org/wiki/HSL_and_HSV)) the same, but use different hue.

```javascript
const {OrangeColor} = require('orange-color')
const my_favorite_color = 'ffb765' 
const color = new OrangeColor(my_favorite_color)
const colors = [my_favorite_color]
for (let i = 0; i < 4; i++){
  color.h += 15
  colors.push(color.hex_string)
}
console.log(colors) // [ 'ffb765', 'ffde66', 'faff66', 'd4ff66', 'adff66' ]
```
