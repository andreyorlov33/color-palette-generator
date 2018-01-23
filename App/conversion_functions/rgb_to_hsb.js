function RGB_to_HSB(r, g, b) {
    r /= 255; g /= 255; b /= 255; // Scale to unity.   
    let min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        HSB = { hue: 0, sat: 0, bri: max },
        del_R, del_G, del_B;

    if (delta !== 0) {
        HSB.sat = delta / max;
        del_R = (((max - r) / 6) + (delta / 2)) / delta;
        del_G = (((max - g) / 6) + (delta / 2)) / delta;
        del_B = (((max - b) / 6) + (delta / 2)) / delta;

        if (r === max) { HSB.hue = del_B - del_G; }
        else if (g === max) { HSB.hue = (1 / 3) + del_R - del_B; }
        else if (b === max) { HSB.hue = (2 / 3) + del_G - del_R; }

        if (HSB.hue < 0) { HSB.hue += 1; }
        if (HSB.hue > 1) { HSB.hue -= 1; }
    }
    HSB.hue *= 360;
    HSB.sat;
    HSB.bri;
    return HSB;
}

export default RGB_to_HSB