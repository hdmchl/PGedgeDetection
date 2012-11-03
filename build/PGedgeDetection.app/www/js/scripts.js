function startFilter() {
    var rect;
    var width;
    var height;
    var context;
    var inited = false;

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
            pixels[++j] = value;   //g*b >> 8;
            pixels[++j] = value;    //b*r >> 8;
            ++i;
            ++j;
        }
        return data;
    }
    
    var canvas = document.getElementById("canvas");
    
    function updateFrame() {
        try {
            console.log("1");
            if (!inited) {
                console.log(image.width);
                if (!image.width) return;
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
            //setInterval(updateFrame,15);
        }
    }
    updateFrame();
    //setInterval(updateFrame,15);
    
    var pressed = false;
    canvas.onmousedown = function(event) {
        var tRect=event.target.getClientRects()[0];
        rect = {x: event.clientX - tRect.left,
            y: event.clientY - tRect.top,
            width: 1, height: 1};
        pressed = true;
    }
    canvas.onmouseup = function(event) {
        pressed = false;
    }
    canvas.onmousemove = function(event) {
        if (!rect || !pressed) { return; }
        var tRect=event.target.getClientRects()[0];
        rect.width = event.clientX - tRect.left - rect.x;
        rect.height = event.clientY - tRect.top -rect.y;
    }

    var fps = 0;
    /*setInterval(function(){
     document.getElementById("fps").innerHTML = fps + "(" + [width, height] + ")";
     fps = 0;
     }, 1000);*/
}