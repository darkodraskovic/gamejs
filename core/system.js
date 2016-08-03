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
    
    var sys = {};
    sys.Class = Class;

    return sys;
});
