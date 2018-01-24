import RGB_to_HSL from '../conversion_functions/rgb_to_hsl'
import RGB_to_HSB from '../conversion_functions/rgb_to_hsb'
import RGB_to_HEX from '../conversion_functions/rgb_to_hex'

import HEX_to_RGB from '../conversion_functions/hex_to_rgb'
import HSB_to_RGB from '../conversion_functions/hsb_to_rgb'
import HSL_to_RGB from '../conversion_functions/hsl_to_rgb'

export default function generate(asset){
    generator(asset.class_2)
}

function generator(class_opt){
     let base_hex
     let hue_offset

     let base_saturation_value
     let base_brightness_value
     let base_hue_value

     let brightness_offset
     let saturation_offset    
     // offset direction INCREMENT OR DECREMENT
     let b_o_d = class_opt.brightness
     let s_o_d = class_opt.saturation
     
     class_opt.start_hex == null ? base_hex = class_opt.color_palette.split(' ').pop() : base_hex = class_opt.start_hex
     s_o_d == null ? saturation_offset = null : saturation_offset = class_opt.saturation_offset/100
     b_o_d == null ? brightness_offset = null : brightness_offset = class_opt.brightness_offset /100
     class_opt.hue_offset == null ? hue_offset = 3 : hue_offset = class_opt.hue_offset

     
     let base_rgb = HEX_to_RGB(base_hex)
     let base_hsb = RGB_to_HSB(base_rgb.r, base_rgb.g, base_rgb.b)
     let base_hsl = RGB_to_HSL(base_rgb.r, base_rgb.g, base_rgb.b)
     
     base_saturation_value = base_hsb.sat
     base_brightness_value = base_hsb.bri

     base_hue_value = base_hsb.hue

     let _offseted_hue = base_hue_value + hue_offset
     let _offseted_sat
     let _offseted_bri

     if(s_o_d == 'SATURATE'){
         _offseted_sat = base_saturation_value + saturation_offset
     } else if( s_o_d == 'DESATURATE'){
         _offseted_sat = base_saturation_value - saturation_offset
     }
 
     console.log('BASE RGB ' + base_rgb.r, base_rgb.g, base_rgb.b)
     console.log('BASE HSB ' + base_hsb)
     console.log('BASE SAT ' + base_saturation_value)
     console.log('BASE BRI ' + base_brightness_value)
     console.log('SAT_OFF ' + saturation_offset)
     console.log('BRI OFF ' + brightness_offset)


    
     
}
