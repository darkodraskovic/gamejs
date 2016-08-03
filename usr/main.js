(function (){
    var App = Game.Application.extend({
        init: function() {
            this._super();

            // scripts
            var scripts = [
                'usr/entities/classes.js',
                'usr/scenes/scene1.js'
            ];
            var scriptLoader = new Game.utils.ScriptLoader();
            scriptLoader.loadScripts(scripts, this.onScriptsLoaded.bind(this));
        },
        onScriptsLoaded: function() {
            var scene = new Simpletons.Scene1('scene');
        },
        update: function() {
            // loop
            this._super();
        }
    });

    new App();
})();
