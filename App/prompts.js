export const init = {
    type: 'confirm',
    name: 'response',
    message: 'Place SVG assets you would like palettized into the input folder \n',
    
}

export const  asset_prompt = files => {
    return {
             type: 'list',
             name: 'asset',
             message: 'Please select asset',
             choices: files
            }
}

export const color_palette_range = num => {
    return {
        type: 'list',
    name: 'color_palette',
    message: `\nSelect ${num} Color Palette`,
    choices: ['Red', 'Red-Orange', 'Orange', 'Yellow-Orange', 'Yellow', 'Lime Green', 'Green', 'Turquoise', 'Blue', 'Indigo', 'Violet', 'Crimson']
    }
    
}

export const brightness_prompt = {
    type: 'list',
    name: 'brightness',
    choices: ['🚫  None \n', '⬇️  100% - 0% \n', '⬆️  0% - 100% \n'],
    message: 'Select BRIGHTNESS interval start point ... \n',
}

export const saturation_prompt = {
    type: 'list',
    name: 'saturation',
    choices: ['🚫  None \n', '⬇️  100% - 0% \n', '⬆️  0% - 100% \n'],
    message: 'Select SATURATION interval start point ... \n'
}

