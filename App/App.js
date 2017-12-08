import inquirer from 'inquirer'
import * as promp from './messages.js'
import * as _ from 'lodash'
import generate_color_palette from './pallet_generator'
import fs from 'fs'

const prompt = inquirer.createPromptModule()


const valid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i
let input_colors = []
let invalid_colors = []


const App = {
    init: ()=> {
        console.log('\x1Bc')
        prompt(promp.init)
        .then( answer=> App.validate(answer.response.trim()))
    },
    validate : (colors) => {
        colors = colors.split(/[ ]+/)
        colors.map( color => {
            valid.test(color)? input_colors.push(color) : invalid_colors.push(color)
        })
        invalid_colors.length > 0 ? App.invalid_promp() : App.enter_hue()
    },
    invalid_promp: () => {
           console.log('\x1Bc')
           console.log('The following entrees are not valid HEX values ...')
           invalid_colors.map(i => console.log(i+'\n'))
           invalid_colors = []
           prompt(promp.re_input)
           .then(answer=> answer.response.length > 1 ? App.validate(answer.response): App.enter_hue())
       },
    enter_hue: ()=> {
        console.log('\x1Bc')        
        input_colors = _.sortedUniq(input_colors)
        prompt(promp.hue_input)
        .then(answer => isNaN(answer.response)? App.enter_hue() : App.generate_hue_pallet(answer.response))
    },
    generate_hue_pallet: (hue_offset)=>{
        let x = -180
        let fields = ['base color', x]        
        let i = 0
        while( i < 11){
            fields.push(x+=parseInt(hue_offset))
            i++
        }
        let result = generate_color_palette(hue_offset, input_colors)
        let merge = fields.concat(result)
        fs.writeFile('./PALETTE.csv', merge, err => err? console.log(err): console.log('written'))
        input_colors = []
        App.init()
    }
}
App.init()

