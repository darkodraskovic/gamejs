({
    baseUrl: ".",
    
    paths: {
        "PIXI": "lib/pixi",
        "SAT": "lib/SAT",
        "Quadtree": "lib/quadtree",
        "requireLib": "lib/require"
    },

    shim: {
        "SAT": {
            exports: 'SAT'
        },
        "Quadtree": {
            exports: 'Quadtree'
        }
    },

    name: "main",
    out: "game.js",

    // namespace: 'Game',
    wrap: true,
    
    optimize: "none",
    include: ["requireLib"]
})
