define(['core/Class'], function(Class) {
    
    // ==============================
    // KEYBOARD
    var Input = Class.extend({
        init: function() {
            this.actions = {};
            this.pressed = {};
            this.released = {};
            this.down = {};
            this.addEventListeners(this);        
        },
        update: function () {
            var action;
            for (action in this.pressed) {
                this.pressed[action] = false;
            }
            for (action in this.released) {
                this.released[action] = false;
            }
        },
        bind: function(action, key) {
            this.actions[key] = action;
            this.down[action] = false;
            this.pressed[action] = false;
            this.released[action] = false;        
        },
        unbind: function(keyOrAct) {
            // unbind key
            if (typeof keyOrAct === "number") {
                delete this.actions[keyOrAct];
            }
            // unbind action
            else if (typeof keyOrAct === "string") {
                for (var key in this.actions) {
                    if (this.actions[key] === keyOrAct) {
                        delete this.actions[key];
                        delete this.down[keyOrAct];
                        delete this.pressed[keyOrAct];
                        delete this.released[keyOrAct];
                    }
                }
            }
        },
        addEventListeners: function (input) {
            window.addEventListener("keydown", function (event) {
                var action = input.actions[event.keyCode];
                if (action) {
                    if (!input.down[action]) {
                        input.pressed[action] = true;
                        input.down[action] = true;
                    }
                    event.preventDefault();
                }
            }, false);

            window.addEventListener("keyup", function (event) {
                var action = input.actions[event.keyCode];
                if (action) {
                    input.released[action] = true;
                    input.down[action] = false;
                    event.preventDefault();
                }
            }, false);
        }
    });

    return Input;
});
