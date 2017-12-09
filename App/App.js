import inquirer from 'inquirer'
import * as promp from './messages.js'
import * as _ from 'lodash'
import fs from 'fs'
import HEX_to_RGB from './conversion_functions/hex_to_rgb'
import RGB_to_HSB from './conversion_functions/rgb_to_hsb'
import HSB_to_RGB from './conversion_functions/hsb_to_rgb'

const prompt = inquirer.createPromptModule()

const App = {
    init: () => {
        App.clear()
        prompt(promp.init).then(answer=> App.validate(answer.response.trim()))
    },
    validate : (colors) => {
        colors = colors.split(/[ ]+/)
        colors.map( color => App.valid.test(color)? App.input_colors.push(color) : App.invalid_colors.push(color))
        App.invalid_colors.length > 0 ? App.invalid_promp() : App.prompt_hue()
    },
    invalid_promp: () => {
        App.clear()
        process.stdout.write('The following entrees are not valid HEX values ... \n')
        App.invalid_colors.map(i => process.stdout.write(i))
        App.invalid_colors = []
        prompt(promp.re_input).then(answer=> answer.response.length > 1 ? App.validate(answer.response): App.prompt_hue())
    },
    prompt_hue: () => {       
        App.input_colors = _.sortedUniq(App.input_colors)
        prompt(promp.hue_input).then(answer => isNaN(answer.response)? App.prompt_hue() : App.generate_hue_pallet(parseInt(answer.response)))
    },
    generate_hue_pallet: (hue_offset) => { 
        let hue_palette = App.input_colors.map(color => App.calculate_hue_progression(color, hue_offset))
        App.generate_csv(hue_palette)
    },
    calculate_hue_progression: (color, hue_offset) => {
        let RGB = HEX_to_RGB(color)
        let HSB = RGB_to_HSB(RGB.r ,RGB.g ,RGB.b)
        let { bri , sat } = HSB
        let offset_hue = Math.floor(HSB.hue) + hue_offset
        let hex_array = [color]
        let i = 0 
        while(i < 360/hue_offset){ 
            offset_hue > 360 ? offset_hue = 360 - offset_hue + hue_offset : null
            let offset_rgb = HSB_to_RGB(offset_hue, sat*100, bri*100)
            hex_array.push(offset_rgb)
            offset_hue += hue_offset
            i ++
        }
        return hex_array.toString()
    },
    generate_csv: (palette_array) => {
        let csv = ''
        let header = ['Base Color']
        let row_length = palette_array[0].split(',').length - 1
        let offset = 360/row_length
        let i = 0
        let offset_degree = 0

        while(i < row_length){
            if(i == row_length - 1){
                header.push(`- ${offset}˚`)
            } else {
                offset_degree + offset 
                offset_degree += offset
                header.push(`+${offset_degree}˚`)
            }
            i++
        }   
        header = header.join(',')
        csv += header+'\r\n'
        palette_array.map(line => csv += line+'\r\n')
        fs.writeFile('./PALETTE.csv', csv, err => err? process.stdout.write(err): process.stdout.write('written'), App.init())
    },
    valid : /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
    input_colors : [],
    invalid_colors : [],
    clear : () => process.stdout.write('\x1Bc') 
}
App.init()

