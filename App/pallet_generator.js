import HEX_to_RGB from './conversion_functions/hex_to_rgb'
import HSB_to_RGB from './conversion_functions/hsb_to_rgb'
import RGB_to_HSB from './conversion_functions/rgb_to_hsb'

function generate_color_palette(hue_offset, color_array) {
   return color_array.map(color =>{
        let RGB = HEX_to_RGB(color)
        let HSB = RGB_to_HSB(RGB.r ,RGB.g ,RGB.b)
        return '\n'+color+','+calculate_hues(HSB.hue, HSB.sat, HSB.bri, hue_offset)
    })
}

function calculate_hues(hue , sat , bri, hue_offset){
    let HEX_ARRAY = []
    let x  = -180
    let offset = parseInt(hue_offset)
    for(let i = 0 ; i < 12 ; i++){
       if(x < 0){
           let h = reduce_hue(hue, x)
           let RGB = HSB_to_RGB(h,sat*100,bri*100)
            HEX_ARRAY.push(RGB)
           x += offset
       } else if( x > 0){
           let h = increase_hue(hue, x)
           let RGB = HSB_to_RGB(h,sat*100,bri*100)
           HEX_ARRAY.push(RGB)
           x += offset
       } else {
           let RGB = HSB_to_RGB(hue,sat*100,bri*100)
           HEX_ARRAY.push(RGB)
           x += offset
       }
   }  
   return HEX_ARRAY.toString()
}

function reduce_hue(hue, x){
    if(hue - x < 0){
        return hue - x + 360
    } else {
        return hue + x
    }
}

function increase_hue(hue, x){
    if(hue + x > 360){
        return Math.abs(hue-x)
    } else {
        return hue + x
    }
}

export default generate_color_palette