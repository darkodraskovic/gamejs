define(['PIXI', 'core/class'], function(PIXI, Class) {

    //=========================
    
    Number.prototype.clamp = function (min, max) {
        return Math.min(Math.max(this, min), max);
    };

    Number.prototype.toRad = function() {
	    return (this / 180) * Math.PI;
    };

    Number.prototype.toDeg = function() {
	    return (this * 180) / Math.PI;
    };

    Number.prototype.lerp = function(istart, istop, ostart, ostop) {
	    return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
    };

    Function.prototype.extend = Class.extend;

    //=========================

    PIXI.Rectangle.prototype.copy = function (rect)
    {
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;

        return this;
    };

    //==========================
    
    var Game = {};
    Game.Class = Class;

    Game.components = {};
    Game.utils = {};

    //==========================

    Game.Colors = {
        'aliceblue': '0xF0F8FF',
        'antiquewhite': '0xFAEBD7',
        'aquamarine': '0x7FFFD4',
        'azure': '0xF0FFFF',
        'beige': '0xF5F5DC',
        'bisque': '0xFFE4C4',
        'black': '0x000000',
        'blanchedalmond': '0xFFEBCD',
        'blue': '0x0000FF',
        'blueviolet': '0x8A2BE2',
        'brown': '0xA52A2A',
        'burlywood': '0xDEB887',
        'cadetblue': '0x5F9EA0',
        'chartreuse': '0x7FFF00',
        'chocolate': '0xD2691E',
        'coral': '0xFF7F50',
        'cornflowerblue': '0x6495ED',
        'cornsilk': '0xFFF8DC',
        'cyan': '0x00FFFF',
        'darkgoldenrod': '0xB8860B',
        'darkgreen': '0x006400',
        'darkkhaki': '0xBDB76B',
        'darkolivegreen': '0x556B2F',
        'darkorange': '0xFF8C00',
        'darkorchid': '0x9932CC',
        'darksalmon': '0xE9967A',
        'darkseagreen': '0x8FBC8F',
        'darkslateblue': '0x483D8B',
        'darkslategray': '0x2F4F4F',
        'darkturquoise': '0x00CED1',
        'darkviolet': '0x9400D3',
        'deeppink': '0xFF1493',
        'deepskyblue': '0x00BFFF',
        'dimgray': '0x696969',
        'dodgerblue': '0x1E90FF',
        'firebrick': '0xB22222',
        'floralwhite': '0xFFFAF0',
        'forestgreen': '0x228B22',
        'gainsboro': '0xDCDCDC',
        'ghostwhite': '0xF8F8FF',
        'gold': '0xFFD700',
        'goldenrod': '0xDAA520',
        'gray': '0x808080',
        'green': '0x008000',
        'greenyellow': '0xADFF2F',
        'honeydew': '0xF0FFF0',
        'hotpink': '0xFF69B4',
        'indianred': '0xCD5C5C',
        'ivory': '0xFFFFF0',
        'khaki': '0xF0E68C',
        'lavender': '0xE6E6FA',
        'lavenderblush': '0xFFF0F5',
        'lawngreen': '0x7CFC00',
        'lemonchiffon': '0xFFFACD',
        'lightblue': '0xADD8E6',
        'lightcoral': '0xF08080',
        'lightcyan': '0xE0FFFF',
        'lightgoldenrod': '0xEEDD82',
        'lightgoldenrodyellow': '0xFAFAD2',
        'lightgray': '0xD3D3D3',
        'lightpink': '0xFFB6C1',
        'lightsalmon': '0xFFA07A',
        'lightseagreen': '0x20B2AA',
        'lightskyblue': '0x87CEFA',
        'lightslate': '0x8470FF',
        'lightslategray': '0x778899',
        'lightsteelblue': '0xB0C4DE',
        'lightyellow': '0xFFFFE0',
        'limegreen': '0x32CD32',
        'linen': '0xFAF0E6',
        'magenta': '0xFF00FF',
        'maroon': '0xB03060',
        'mediumaquamarine': '0x66CDAA',
        'mediumblue': '0x0000CD',
        'mediumorchid': '0xBA55D3',
        'mediumpurple': '0x9370DB',
        'mediumseagreen': '0x3CB371',
        'mediumslateblue': '0x7B68EE',
        'mediumspringgreen': '0x00FA9A',
        'mediumturquoise': '0x48D1CC',
        'mediumviolet': '0xC71585',
        'midnightblue': '0x191970',
        'mintcream': '0xF5FFFA',
        'mistyrose': '0xFFE4E1',
        'moccasin': '0xFFE4B5',
        'navajowhite': '0xFFDEAD',
        'navy': '0x000080',
        'oldlace': '0xFDF5E6',
        'olivedrab': '0x6B8E23',
        'orange': '0xFFA500',
        'orangered': '0xFF4500',
        'orchid': '0xDA70D6',
        'palegoldenrod': '0xEEE8AA',
        'palegreen': '0x98FB98',
        'paleturquoise': '0xAFEEEE',
        'palevioletred': '0xDB7093',
        'papayawhip': '0xFFEFD5',
        'peachpuff': '0xFFDAB9',
        'peru': '0xCD853F',
        'pink': '0xFFC0CB',
        'plum': '0xDDA0DD',
        'powderblue': '0xB0E0E6',
        'purple': '0xA020F0',
        'red': '0xFF0000',
        'rosybrown': '0xBC8F8F',
        'royalblue': '0x4169E1',
        'saddlebrown': '0x8B4513',
        'salmon': '0xFA8072',
        'sandybrown': '0xF4A460',
        'seagreen': '0x2E8B57',
        'seashell': '0xFFF5EE',
        'sienna': '0xA0522D',
        'skyblue': '0x87CEEB',
        'slateblue': '0x6A5ACD',
        'slategray': '0x708090',
        'snow': '0xFFFAFA',
        'springgreen': '0x00FF7F',
        'steelblue': '0x4682B4',
        'tan': '0xD2B48C',
        'thistle': '0xD8BFD8',
        'tomato': '0xFF6347',
        'turquoise': '0x40E0D0',
        'violet': '0xEE82EE',
        'violetred': '0xD02090',
        'wheat': '0xF5DEB3',
        'white': '0xFFFFFF',
        'whitesmoke': '0xF5F5F5',
        'yellow': '0xFFFF00',
        'yellowgreen': '0x9ACD32'
    };

    Game.Key = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        PAUSE: 19,
        CAPS: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        _0: 48,
        _1: 49,
        _2: 50,
        _3: 51,
        _4: 52,
        _5: 53,
        _6: 54,
        _7: 55,
        _8: 56,
        _9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBSTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PLUS: 187,
        COMMA: 188,
        MINUS: 189,
        PERIOD: 190
    };

    return Game;
});
