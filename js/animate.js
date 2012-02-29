var animate = function(elem, style, duration, callback) {
    this.elem = elem || this;
    this.style = style || {};
    this.duration = duration || 400;
    this.callback = callback || function(){};
    this.init();
}

animate.prototype = {
    init : function() {
        this.fx();
    },
    ontween : function(pos) {
        var obj,
            val,
            from,
            to,
            name,
            unit,
            css = this.style;
        for(var i = 0, len = css.length; i < len; i++){
            obj = css[i];
            from = obj[0];
            to = obj[1];
            name = obj[2];
            unit = obj[3];

            val = from + (to - from) * pos;
            if( name == 'opacity' ){
                val = val.toString();
                val = val.substring(0, val.charAt('.') + 3);
                val = val - 0;
                if( navigator.userAgent.toLowerCase().indexOf('msie') != -1){
                    val *= 100;
                    this.elem.style.filter = 'alpha(opacity=' + val + ')';
                }else{
                    this.elem.style.opacity = val;
                }
            }else{
                this.elem.style[name] = val + unit;
            }

        }
    },
    onend : function(pos) {
        this.ontween(pos);
        this.callback.call(this.elem);
    },
    fx : function() {
        var pos,
            runTime,
            startTime = + new Date(),
            _this = this,
            timer = setInterval(function() {
                runTime = + new Date() - startTime;
                pos = runTime / _this.duration;

                if( pos >= 1 ){
                    clearInterval(timer);
                    _this.onend(pos);
                }else{
                    _this.ontween(pos);
                }
            }, 13)

    }
}


