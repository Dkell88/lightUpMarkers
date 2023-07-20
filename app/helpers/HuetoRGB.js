function hsvToRgb(hue) {
    let r, g, b;
    let i;
    let f, p, q, t;
    
    // Make sure our hue input is in the range [0, 360]
    hue = hue % 360;
    if (hue < 0) hue += 360;
    
    const sat = 1;  // S = 100%
    const val = 1;  // V = 100%

    let h = hue / 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = val * (1 - sat);
    q = val * (1 - sat * f);
    t = val * (1 - sat * (1 - f));

    switch (i) {
        case 0:
            r = val, g = t, b = p;
            break;
        case 1:
            r = q, g = val, b = p;
            break;
        case 2:
            r = p, g = val, b = t;
            break;
        case 3:
            r = p, g = q, b = val;
            break;
        case 4:
            r = t, g = p, b = val;
            break;
        default: // case 5:
            r = val, g = p, b = q;
            break;
    }

    return {
        red: Math.round(r * 255),
        green: Math.round(g * 255),
        blue: Math.round(b * 255)
    };
}

module.exports = hsvToRgb