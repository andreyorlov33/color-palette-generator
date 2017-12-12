import inquirer from 'inquirer'
import * as prompt from './prompts.js'
import * as _ from 'lodash'
import wait from './utils/wait_timer'
import fs from 'fs'
import dateformat from 'dateformat'
import HEX_to_RGB from './conversion_functions/hex_to_rgb'
import RGB_to_HSB from './conversion_functions/rgb_to_hsb'
import HSB_to_RGB from './conversion_functions/hsb_to_rgb'
import { palette_name } from './prompts.js';

const cli = inquirer.createPromptModule()

const App = {
    init: () => {
        App.clear()
        cli(prompt.color_input).then(answer => App.validate(answer.response.trim()))
    },
    palette_name_prompt: ()=>{
        cli(prompt.palette_name)
        .then(answer => {
            if (answer.response.trim() == undefined){
                App.palette_name_prompt()
            } else {
                App.palette_name = answer.response 
                App.prompt_hue()
            }   
        })
    },
    validate : (colors) => {
        colors = colors.split(/[ ]+/)
        colors.map( color => App.valid.test(color)? App.input_colors.push(color) : App.invalid_colors.push(color))
        App.invalid_colors.length > 0 ? App.invalid_prompt() : App.palette_name_prompt()
    },
    invalid_prompt: () => {
        App.clear()
        process.stdout.write('The following entrees are not valid HEX values ... \n')
        App.invalid_colors.map(i => process.stdout.write(i))
        App.invalid_colors = []
        cli(prompt.re_input).then(answer => answer.response.length > 1 ? App.validate(answer.response): App.palette_name_prompt())
    },
    prompt_hue: () => {       
        App.input_colors = _.sortedUniq(App.input_colors)
        cli(prompt.hue_input).then(answer => isNaN(answer.response)? App.prompt_hue() : App.generate_hue_pallet(parseInt(answer.response)))
    },
    generate_hue_pallet: (hue_offset) => { 
        let temp_array = []
        let palette_array = []
        App.input_colors.map(color => temp_array.push([App.calculate_hue_progression(color, hue_offset)]))
        temp_array = temp_array.map(row => row[0].split(','))
        for(let i =0 ; i < temp_array[0].length; i++){
            let value1 = temp_array[0][i].replace(',', '')
            let value2 = ''
            let value3 = ''

            temp_array[1] != undefined ? value2 = temp_array[1][i].replace(',', '') : value2 = ''
            temp_array[2] != undefined ? value3 = temp_array[2][i].replace(',', '') : value3 = ''

            let row = `"${value1},${value2},${value3}"`
            palette_array.push(row)
        }
        App.write_csv(palette_array.join(','))
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
    write_csv: (palette_array) => {
        let now = new Date()
        let time = dateformat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
        let csv = `${App.palette_name},${palette_array}`
        let name = `Palete-${App.palette_name}-${time}`
        fs.writeFileSync(`.CSV/${name}.csv`, csv, err => err? process.stdout.write(err): null)
        process.stdout.write(' CSV Generated! \n Please check the color-palet-tool directory for PALETTE.csv !')
        wait(2000)
        App.init()
    },
    valid : /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
    input_colors : [],
    invalid_colors : [],
    palette_name : null,
    clear : () => process.stdout.write('\x1Bc') 
}
App.init()

