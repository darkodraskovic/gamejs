require.config({
    baseUrl: "./",
    
    paths: {
        "PIXI": "lib/pixi",
        "SAT": "lib/SAT",
        "Quadtree": "lib/quadtree"
    },

    shim: {
        "SAT": {
            exports: 'SAT'
        },
        "Quadtree": {
            exports: 'Quadtree'
        }
    }
});

requirejs(
    [
        'SAT',
        
        'core/constants',
        
        'core/class',
        'core/system',
        
        'core/application',
        'core/camera',
        'core/component',
        'core/container',
        'core/entity',
        'core/input',
        'core/layer',
        'core/pool',
        'core/scene',
        'core/tiledManager',
        'core/tile',
        'core/tilemap',
        
        'component/animator',
        'component/collider',
        'component/kinematics',
        'component/platformer',
        'component/projectile',
        'component/vehicle',

        'config',
    ],
    function(
        SAT,
        
        constants,
        
        Class,
        sys,
        
        Application,
        Camera,
        Component,
        Container,
        Entity,
        Input,
        Layer,
        Pool,
        Scene,
        TiledManager,
        Tile,
        Tilemap,
        
        Animator,
        Collider,
        Kinematics,
        Platformer,
        Projectile,
        Vehicle,

        config
    ) {
        window.SAT = SAT;
        
        var Game = window.Game = {};

        for (var c in constants) {
            Game[c] = constants[c];
        }
        
        Game.Class = Class;
        Game.sys = sys;
        
        Game.Application = Application;
        Game.Camera = Camera;
        Game.Component = Component;
        Game.Container = Container;
        Game.Entity = Entity;
        Game.Input = Input;
        Game.Layer = Layer;
        Game.Pool = Pool;
        Game.Scene = Scene;
        Game.TiledManager = TiledManager;
        Game.Tile = Tile;
        Game.Tilemap = Tilemap;

        Game.components = {};
        Game.components.Animator = Animator;
        Game.components.Collider = Collider;
        Game.components.Kinematics = Kinematics;
        Game.components.Platformer = Platformer;
        Game.components.Projectile = Projectile;
        Game.components.Vehicle = Vehicle;        

        Game.config = config;
    });

