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
            color_palette: null,
            brightness: null,
            brightness_offset: null,
            saturation: null,
            saturation_offset: null,
            start_hex: null,
            hue_offset: null
        }
        this.class_3 = {
            color_palette: null,
            brightness: null,
            brightness_offset: null,
            saturation: null,
            saturation_offset: null,
            start_hex: null,
            hue_offset: null
        }
        this.class_4 = {
            color_palette: null,
            brightness: null,
            brightness_offset: null,
            saturation: null,
            saturation_offset: null,
            start_hex: null,
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
            let color_palette = await cli(prompt.color_palette_range(`CLASS ${class_num}`))
            this[`class_${class_num}`].color_palette = color_palette.type
            if (this[`class_${class_num}`].color_palette == 'Custom') {
                let hue_offset = await cli(prompt.hue_offset(`CLASS ${class_num}`))
                let start_hex = await cli(prompt.start_hex(`CLASS ${class_num}`))
                this[`class_${class_num}`].hue_offset = hue_offset.hue_offset
                this[`class_${class_num}`].start_hex = start_hex.hex
            }
            this.clear()
            let brightness = await cli(prompt.brightness_prompt(`CLASS ${class_num}`))
           
            if(brightness.value != 'NONE'){
                let offset = await cli(prompt.offset_prompt(class_num, 'BRIGHTNESS'))
                this[`class_${class_num}`].brightness = brightness.value.split(' ').shift()
                this[`class_${class_num}`].brightness_offset = parseInt(offset.value)     
            }
            this.clear()
            let saturation = await cli(prompt.saturation_prompt(`CLASS ${class_num}`))
            if(saturation.value != 'NONE'){
                let offset = await cli(prompt.offset_prompt(class_num, 'SATURATION'))
                this[`class_${class_num}`].saturation = brightness.value.split(' ').shift()
                this[`class_${class_num}`].saturation_offset = parseInt(offset.value)     
            }
            i++
        }
        console.log(this)
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
