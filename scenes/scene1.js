define(['core/scene',
        'entities/platform',
        'entities/simpleton',
        'entities/staticArea'],
       function (Scene) {
           
           var scene1 = Scene.extend({
               init: function(name) {
                   
                   var settings = {
                       bindings: [
                           'left', 'A',
                           'right', 'D',
                           'up', 'W',
                           'down', 'S',
                           'fire', 'SPACE'
                       ],
                       assets: [
                           'bg', 'assets/backgrounds/black.png',
                           'simpleton', 'assets/simpletons/simpleton.json',
                           'platforms', 'assets/platforms/platforms.json',
                           'scene2', 'assets/scenes/scene2.json'
                       ],
                       map: 'scene2'
                   };
                   
                   this._super(name, settings);
               },
               onAssetsLoaded: function() {
                   this.camera.entity = player;
               }
           });
           
           return scene1;
           
       });
