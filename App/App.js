import inquirer from 'inquirer'
import * as prompt from './prompts.js'
import fs from 'fs'
import generate from './utils/generator.js'

const cli = inquirer.createPromptModule()
const SVG_DIR = '/Users/Zurg/Desktop/color-palet-tool/SVG/'

class App {
    constructor(props) {
        this.asset_name = null
        this.brightness = null
        this.saturation = null
        this.class_2_palette = null
        this.class_3_palette = null
        this.class_4_palette = null
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
        this.brightness_prompt()
    }
    async  brightness_prompt() {
        let answer = await cli(prompt.brightness_prompt)
        let x = answer.brightness.split('-').pop().trim()
        if (x == '0%') {
            this.brightness = 100
        } else if (x == '100%') {
            this.brightness = 0
        } else {
            this.brightness = null
        }
        this.saturation_prompt()
    }
    async saturation_prompt() {
        let answer = await cli(prompt.saturation_prompt)
        let x = answer.saturation.split('-').pop().trim()
        if (x == '0%') {
            this.saturation = 100
        } else if (x == '100%') {
            this.saturation = 0
        } else {
            this.saturation = null
        }
        this.color_prompt()
    }
    async color_prompt() {
        let num = this.asset_name.split('_').shift().split('C').shift()
        if (num == 1) {
            let class2 = await cli(prompt.color_palette_range('CLASS 2'))
            this.class_2_palette = class2.color_palette

        } else if (num == 2) {
            let class2 = await cli(prompt.color_palette_range('CLASS 2'))
            let class3 = await cli(prompt.color_palette_range('CLASS 3'))
            this.class_2_palette = class2.color_palette
            this.class_3_palette = class3.color_palette

        } else if (num == 3) {
            let class2 = await cli(prompt.color_palette_range('CLASS 2'))
            let class3 = await cli(prompt.color_palette_range('CLASS 3'))
            let class4 = await cli(prompt.color_palette_range('CLASS 4'))
            this.class_2_palette = class2.color_palette
            this.class_3_palette = class3.color_palette
            this.class_4_palette = class4.color_palette
        }
        generate(this)
    }
    clear() {
        process.stdout.write('\x1Bc')
    }
    exit() {
        process.exit(0)
    }

}

let X = new App
X.init()