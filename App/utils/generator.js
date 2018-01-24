import RGB_to_HSL from '../conversion_functions/rgb_to_hsl'
import RGB_to_HSB from '../conversion_functions/rgb_to_hsb'
import RGB_to_HEX from '../conversion_functions/rgb_to_hex'

import HEX_to_RGB from '../conversion_functions/hex_to_rgb'
import HSB_to_RGB from '../conversion_functions/hsb_to_rgb'
import HSL_to_RGB from '../conversion_functions/hsl_to_rgb'

export default function generate(asset) {
    let { class_2, class_3, class_4 } = asset
    
    let class_2_progression = generator(class_2)
    let class_3_progression = class_3.base_hex != null ? generator(class_3) : null
    let class_4_progression = class_4.base_hex != null ? generator(class_4) : null

}

function generator(class_opt) {
    let { brightness_offset, saturation_offset, base_hex, hue_offset } = class_opt

    let base_rgb = HEX_to_RGB(base_hex)
    let {r,g,b} = base_rgb
    let base_hsb = RGB_to_HSB(r, g, b)
    let base_hsl = RGB_to_HSL(r, g, b)
    let { hue, bri, sat } = base_hsb
  
    let _offseted_hue = hue + hue_offset
    let _offseted_sat = sat + saturation_offset/100
    let _offseted_bri = bri + brightness_offset/100
 
    let hex_array = [base_hex]

    for(let i = 0 ; i < 10 ; i++){
       if( _offseted_hue >= 360){ _offseted_hue = Math.abs(360 - _offseted_hue)}
       else if(_offseted_hue < 0 ){_offseted_hue = 360 - Math.abs(hue_offset)}

        _offseted_sat > 1 ? _offseted_sat = 1 : null
        _offseted_sat < 0 ? _offseted_sat = 0 : null
        _offseted_bri > 1 ? _offseted_bri = 1 : null
        _offseted_bri < 0 ? _offseted_bri = 0 : null
   
        let _rgb = HSB_to_RGB(_offseted_hue, _offseted_sat.toFixed(2)*100, _offseted_bri.toFixed(2)*100)
        let _hex = RGB_to_HEX(_rgb.r, _rgb.g , _rgb.b)
        hex_array.push(_hex)
        _offseted_hue += hue_offset
        _offseted_sat += saturation_offset/100
        _offseted_bri += brightness_offset/100

    }

    return(hex_array)
}
