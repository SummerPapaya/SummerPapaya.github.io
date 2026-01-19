// 1. 通过类名获取元素 (兼容旧版本浏览器)
function getbyclassname(tagname, classname) {
    var result = new Array();
    var allclass = document.getElementsByTagName(tagname);
    for (var i = 0; i < allclass.length; i++) {
        // 修复：使用 className.indexOf 或更严谨的判断，这里保持你原有的逻辑
        if (classname == allclass[i].className)
            result.push(allclass[i]);
    }
    return result;
}

// 2. 获取窗口尺寸及滚动条高度
function win(attr) {
    switch (attr) {
        case 'height':
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        case 'width':
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        case 'scrollTop':
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        default:
            return 0;
    }
}

// 3. 获取元素样式（包括旋转角度和普通像素值）
function css(obj, attr) {
    var re = [];
    switch (attr) {
        case 'rotate':
            var style = document.defaultView.getComputedStyle(obj, false);
            var transformstr = style['webkitTransform'] || style['msTransform'] || style['MozTransform'] || style['OTransform'] || style['transform'] || "matrix(1, 0, 0, 1, 0, 0)";
            var matrixarray = transformstr.split(",");
            if (matrixarray.length > 1) {
                // 从矩阵中计算旋转角度
                re.push(Math.round(Math.asin(matrixarray[1]) * (180 / Math.PI)));
            } else {
                re.push(0);
            }
            return re;
        default:
            var value = obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr];
            re.push(parseInt(value) || 0);
            return re;
    }
}

// 4. 实现元素拖拽
//在原来的代码基础上优化已适应移动端的拖拽需求
function drag(obj) {
    // 绑定按下事件 (兼容鼠标和触摸)
    obj.onmousedown = obj.ontouchstart = function (ev) {
        // 1. 获取事件对象和坐标
        var oev = ev || event;
        // 如果是触摸屏，取第一个手指的坐标；如果是鼠标，取 clientX
        var touch = oev.touches ? oev.touches[0] : oev;
        
        var disX = touch.clientX - obj.offsetLeft;
        var disY = touch.clientY - obj.offsetTop;
        
        // 提高当前拖动图片的层级
        obj.style.zIndex = new Date().getTime();

        // 2. 绑定移动事件
        // 注意：移动和抬起要绑定在 document 上，防止手指滑出元素
        document.onmousemove = document.ontouchmove = function (ev) {
            var oev = ev || event;
            var touch = oev.touches ? oev.touches[0] : oev;
            
            var left = touch.clientX - disX;
            var top = touch.clientY - disY;
            
            obj.style.left = left + 'px';
            obj.style.top = top + 'px';

            // 3. 关键：阻止手机端拖动时的屏幕滚动默认行为
            if (oev.preventDefault) {
                oev.preventDefault();
            }
            return false;
        };

        // 4. 绑定抬起事件
        document.onmouseup = document.ontouchend = function () {
            document.onmousemove = document.ontouchmove = null;
            document.onmouseup = document.ontouchend = null;
        };
        
        return false;
    };
}

