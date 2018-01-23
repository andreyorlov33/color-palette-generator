function RGB_to_HSL(r, g, b){
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b) 
    let min = Math.min(r, g, b)
    let  del_R, del_G, del_B;
    let delta = max - min


    let l = (max + min) / 2;
    let HSL = {hue: 0, sat: 0, light: l}

    if (delta !== 0) {
        HSL.sat = delta / max;
        del_R = (((max - r) / 6) + (delta / 2)) / delta;
        del_G = (((max - g) / 6) + (delta / 2)) / delta;
        del_B = (((max - b) / 6) + (delta / 2)) / delta;

        if (r === max) { HSL.hue = del_B - del_G; }
        else if (g === max) { HSL.hue = (1 / 3) + del_R - del_B; }
        else if (b === max) { HSL.hue = (2 / 3) + del_G - del_R; }

        if (HSL.hue < 0) { HSL.hue += 1; }
        if (HSL.hue > 1) { HSL.hue -= 1; }
    }
    HSL.hue *= 360;
    HSL.sat;
    HSL.light;
    return  HSL;
}

export default RGB_to_HSL