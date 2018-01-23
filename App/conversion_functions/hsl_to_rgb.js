function HSL_to_RGB(hue, saturation, lightness) {

    saturation = parseFloat(saturation)
    lightness = parseFloat(lightness)
    if( hue == undefined ){
        return [0, 0, 0];
      }
    
      var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
      var huePrime = hue / 60;
      var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));
    
      huePrime = Math.floor(huePrime);
      var red;
      var green;
      var blue;
    
      if( huePrime === 0 ){
        red = chroma;
        green = secondComponent;
        blue = 0;
      }else if( huePrime === 1 ){
        red = secondComponent;
        green = chroma;
        blue = 0;
      }else if( huePrime === 2 ){
        red = 0;
        green = chroma;
        blue = secondComponent;
      }else if( huePrime === 3 ){
        red = 0;
        green = secondComponent;
        blue = chroma;
      }else if( huePrime === 4 ){
        red = secondComponent;
        green = 0;
        blue = chroma;
      }else if( huePrime === 5 ){
        red = chroma;
        green = 0;
        blue = secondComponent;
      }
    
      var lightnessAdjustment = lightness - (chroma / 2);
      red += lightnessAdjustment;
      green += lightnessAdjustment;
      blue += lightnessAdjustment;
    
      let RGB_L = {r:red * 255, g:green * 255, b:blue * 255}

      return RGB_L
    }

export default HSL_to_RGB