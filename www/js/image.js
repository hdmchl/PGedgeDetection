/*
 * Edge detection based on code by Oliver Hunt
 * Modified by Hadi Michael in 2012
 *
 */

function startFilter() {
    var rect;
    var width;
    var height;
    var context;
    var inited=false;
    function grayscale(data, context) {
        var pixels = data.data;
        var width = data.width;
        var length = pixels.length;
        var abs = Math.abs;
        var j = -1;
        for (var i = -1; i < length-1-width*4; ) {
            var r = pixels[++i];
            var g = pixels[++i];
            var b = pixels[++i];
            var value = 0.3 * r + 0.59 * g + 0.11 * b;
            pixels[++j] = value;    //r*g >> 8;
            pixels[++j] = value;    //g*b >> 8;
            pixels[++j] = value;    //b*r >> 8;
            ++i;
            ++j;
        }
        return data;
    }

    var canvas = document.getElementById("canvas");
    //canvas.addEventListener("touchstart", touchdown, false);
    //canvas.addEventListener("touchmove", touchmove, true);
    //canvas.addEventListener("touchcancel", touchup, false);

    function updateFrame() {
        try {
            if (!inited) {
                console.log(image.width);
                if (!image.width) {setInterval(updateFrame,25); return;}
                inited = true;
                width = canvas.width = image.width;
                height = canvas.height = image.height;
                context = canvas.getContext("2d");
                rect = {x:0, y: 0, width: width, height: height};
            }
            
            try { context.drawImage(image, 0, 0, width, height); } catch(e) {}
            if (!rect)
            return;
            var rx = rect.x;
            var ry = rect.y;
            var rw = rect.width;
            var rh = rect.height;
            if (rw < 0) {
                rx += rw;
                rw = -rw;
            }
            if (rh < 0) {
                ry += rh;
                rh = -rh;
            }
            var data = context.getImageData(rx, ry, rw, rh);
            data = edge(data, context);
            context.putImageData(data, rx, ry);//, 50, 50, 100, 100);
        } finally {
            //setInterval(updateFrame,25);
        }
    }
    updateFrame();
    //setInterval(updateFrame,15);
    
    //select optimised for touch
    var pressed = false;
    function touchdown(event) {
        event.preventDefault();
        var tRect=event.target.getClientRects()[0];
        rect = {x: event.targetTouches[0].pageX - tRect.left,
            y: event.targetTouches[0].pageY - tRect.top,
            width: 1, height: 1};
        pressed = true;
    }
    function touchup(event) {
        pressed = false;
    }
    function touchmove(event) {
        event.preventDefault();
        if (!rect || !pressed) { return; }
        var tRect=event.target.getClientRects()[0];
        rect.width = event.targetTouches[0].pageX - tRect.left - rect.x;
        rect.height = event.targetTouches[0].pageY - tRect.top - rect.y;
    }
}