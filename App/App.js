import inquirer from 'inquirer'
import * as prompt from './prompts.js'
import fs from 'fs'
import generate from './utils/generator.js'

const cli = inquirer.createPromptModule()
const SVG_DIR = '/Users/Zurg/Desktop/color-palet-tool/SVG/'

class App {
    constructor(props) {
        this.asset_name = null
        this.color_count = null
        this.class_2 = {
            brightness_offset: null,
            saturation_offset: null,
            base_hex: null,
            hue_offset: null
        }
        this.class_3 = {
            brightness_offset: null,
            saturation_offset: null,
            base_hex: null,
            hue_offset: null
        }
        this.class_4 = {
            brightness_offset: null,
            saturation_offset: null,
            base_hex: null,
            hue_offset: null
        }
    }
    init() {
        this.clear()
        cli(prompt.init).then(answer => answer.response ? this.asset_propmpt() : this.exit())
    }

    async asset_propmpt() {
        let files = fs.readdirSync(SVG_DIR)
        files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
        let answer = await cli(prompt.asset_prompt(files))
        this.asset_name = answer.asset
        this.color_count = parseInt(answer.asset.split('_').shift().split('').shift())
        this.class_options_prompt()
    }
    async class_options_prompt() {
        let i = 0
        while (i < this.color_count) {
            let class_num = i + 2
            let CLASS = this[`class_${class_num}`]
            let base_hex
           
            let color_palette = await cli(prompt.color_palette_range(`CLASS ${class_num}`))
            
            if(color_palette.type == 'Custom' ){
                base_hex = await cli(prompt.base_hex(`CLASS ${class_num}`))
                CLASS.base_hex = base_hex.value
            } else {
                CLASS.base_hex = color_palette.type.split(' ').pop()
            }

            let hue_offset = await cli(prompt.hue_offset(`CLASS ${class_num}`))
            hue_offset.hue_offset != NaN && hue_offset.hue_offset != ''? CLASS.hue_offset = parseInt(hue_offset.hue_offset) : CLASS.hue_offset = 0
             this.clear()
            
            let brightness = await cli(prompt.brightness_prompt(`CLASS ${class_num}`))
            
            brightness.value != NaN && brightness.value != ''? CLASS.brightness_offset = parseInt(brightness.value) : CLASS.brightness_offset = 0
            
             this.clear()
            let saturation = await cli(prompt.saturation_prompt(`CLASS ${class_num}`))
        
            saturation.value != NaN && saturation.value != ''? CLASS.saturation_offset = parseInt(saturation.value) : CLASS.saturation_offset = 0
             this.clear()
            
            i++
        }
        generate(this)
        this.init()
    }
    clear() {
        process.stdout.write('\x1Bc')
    }
    exit() {
        process.exit(0)
    }

}

let instance = new App
instance.init()
