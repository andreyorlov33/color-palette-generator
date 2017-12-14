#include "/Users/Zurg/Desktop/color-palet-tool/photoshop_script/palette_script.jsx"

function loadJson(relPath) {
    var script = new File($.fileName);
    var jsonFile = new File("/Users/Zurg/Desktop/color-palet-tool/photoshop_script/palette.json");
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

(function start() {
    var order = loadJson("/Users/Zurg/Desktop/color-palet-tool/photoshop_script/palette.json");
    try {
        generate(order)
    }
    catch (e) {
       alert(e)
    }
})();


function generate(order){
    var doc = app.activeDocument
    var class2_group = doc.layerSets.getByName('CLASS 2')
    var class2_array = order[0].split(',')
    var class3_array
    var class4_array
    if(order[1].length > 0){
        class3_array = order[1].split(',')
    }
    if(order[2].length > 0){
        class4_array = order[2].split(',')
    }

    for(var i = 0; i < 12 ; i++){
        var Color = new SolidColor
        var hex = class2_array[i].replace('#', '')
        Color.rgb.hexValue = hex
        var PTL = class2_group.layers[i]
        app.activeDocument.activeLayer = PTL
        app.activeDocument.selection.selectAll();
        app.activeDocument.selection.fill(Color);
        app.activeDocument.selection.deselect();
    }
}