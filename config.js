define(['PIXI'], function(PIXI) {

    var config = {};

    config.renderer = {
        backgroundColor : '0x000000',
        antialiasing: false,
        transparent: false,
        resolution: 1
    };
    
    config.screen = {
        width: 1024,
        height: 768
    };

    var scrW = config.screen.width;
    var scrH = config.screen.height;

    config.cam = {
        offset: {
            x: scrW / 2 - scrW / 16,
            y: scrH / 2 - scrH / 16
        },
        max: {
            x: scrW * 3,
            y: scrH * 3
        },
        deadzone: {
            position: {
                x: 0,
                y: 0
            },
            size: {
                x: scrW / 4,
                y: scrH / 4
            }
        },
        damping: 5
    };

    return config;
});
