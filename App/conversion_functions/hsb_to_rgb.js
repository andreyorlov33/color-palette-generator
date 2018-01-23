function HSB_to_RGB(h, s, v) {
    h = bound(h, 360) * 6;
    s = bound(s, 100)
    v = bound(v, 100)
    let i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod]
    let RGB = {
        r: r * 255,
        g: g * 255,
        b: b * 255
    }
    return {r:RGB.r, g:RGB.g, b:RGB.b}
}

function bound(n, max) {
    if (isOnePointZero(n)) { n = '100%' }
    let processPercent = isPercentage(n)
    n = Math.min(max, Math.max(0, parseFloat(n)))
    if (processPercent) {
        n = parseInt(n * max, 10)
    }
    if ((Math.abs(n - max) < 0.000001)) {
        return 1
    }
    return (n % max) / parseFloat(max)
}

function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('%') != -1;
}

function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') != -1
}


export default HSB_to_RGB