import inquirer from 'inquirer'

export const init = {
    type: 'confirm',
    name: 'response',
    message: 'Place SVG assets you would like palettized into the input folder \n',

}

export const asset_prompt = files => {
    return {
        type: 'list',
        name: 'asset',
        message: 'Please select asset',
        choices: files
    }
}

export const color_palette_range = class_num => {
    return {
        type: 'list',
        name: 'type',
        message: `\nSelect ${class_num} Color Palette Base HEX`,
        choices: ['Custom',new inquirer.Separator(), 'Red #FF0000',new inquirer.Separator(), 'Orange #FFBD00',new inquirer.Separator(), 'Yellow #FFFF00',new inquirer.Separator(), 'Green-Yellow #7FFF00',new inquirer.Separator(), 'Green #00FF00',new inquirer.Separator(), 'Green-Cyan #00FF7F',new inquirer.Separator(), 'Cyan 00FFFF',new inquirer.Separator(), 'Blue-Cyan #007FFFF',new inquirer.Separator(), 'Blue #0000FF',new inquirer.Separator(), 'Blue-Magenta #7F00FF',new inquirer.Separator(), 'Magenta #FF00FF',new inquirer.Separator(), 'Red-Magenta #FF007F',new inquirer.Separator()]
    }

}

export const brightness_prompt = class_num => {
    return {
        type: 'list',
        name: 'value',
        choices: ['NONE',new inquirer.Separator(),`INCREMENT ${class_num} Brightness`,new inquirer.Separator(), `DECREMENT ${class_num} Brightness`,new inquirer.Separator()],
        message: `Select ${class_num} BRIGHTNESS option ... \n Selecting "NONE" will skip any brightness options for ${class_num} \n`
    }
}

export const saturation_prompt = class_num => {
    return {
        type: 'list',
        name: 'value',
        choices: ['NONE',new inquirer.Separator(), 'DESATURATE',new inquirer.Separator(), 'SATURATE',new inquirer.Separator(),],
        message: `Select ${class_num} SATURATION options \n Selecting "NONE" will skip any SATURATION options for ${class_num} \n`
    }
}

export const hue_offset = class_num => {
    return {
        type: 'input',
        name: 'hue_offset',
        message: `Enter desired ${class_num} Hue offset° (degree) value\n  or leave EMPTY for default of 3°\n >`
    }
}

export const start_hex = class_num => {
    return {
        type: 'input',
        name: 'hex',
        message: `\n Enter HEX values for of ${class_num} base color \n \n >`
    }
}

export const offset_prompt =(class_num, val_type)=>{
    return {
        type: 'input',
        name: 'value',
        message: `Enter ${class_num} ${val_type} offset° (degree)`
    }  
}