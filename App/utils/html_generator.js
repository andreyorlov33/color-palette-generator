import fs from 'fs'

function generate_html(asset_name, array){
     let div_array = []
     let svg_dir = '/Users/Zurg/Desktop/color-palet-tool/SVG/'
     let string = fs.readFileSync(svg_dir+asset_name, 'utf8')
    
     let start = string.indexOf('<defs>')
     let end =  string.indexOf('</defs>')+7
 
     let head = string.substring(0,start)
     let body = string.substring(end, 100000000)
     let style = string.slice(start, end)
     
     let count = (style.match(/fill: #/g)).length
     
     let fill_1_index = style.indexOf('#')
     let fill_2_index = style.indexOf('#', fill_1_index+1)
     let fill_3_index = style.indexOf('#', fill_2_index+1)
     
     let fill_1 = style.slice(fill_1_index +1, fill_1_index+7)
     let fill_2 = style.slice(fill_2_index +1, fill_2_index+7)
     let fill_3 = style.slice(fill_3_index +1, fill_3_index+7)

     console.log(fill_1)
     console.log(fill_2)
     console.log(fill_3)

     let svg_string = head+style+body
     div_array.push(svg_string)
     let html = svg_string    

     return html
}

export default generate_html


// let style = `
// <defs>
//     <style>
//     .cls-1 {
//         isolation: isolate;
//         fill: #ff0000
//     }

//     .cls-2 {
//         fill: #ff0000;
//     }

//     .cls-2, .cls-3 {
//         mix-blend-mode: overlay;
//     }

//     .cls-3 {
//         fill: #ff0000;
//     }
//     </style>
// </defs>
// `