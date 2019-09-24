//获取dom节点的位置
function getXY(obj){
	var x = 0,y = 0;
	if (obj.getBoundingClientRect) {
        var box = obj.getBoundingClientRect();
        var D = document.documentElement;
		x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
		y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop
	}
	else{
		for (; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent) {}
	}
	return {
		x: x,
		y: y
	}
}

//计算应该下在哪个棋盘的点上
function getPoint(x,y,space,spacew,spaceh){
    let X = 0;
    let Y = 0;
    let spacewhalf = spacew / 2;
    let spacehhalf = spaceh / 2;
    for(let i = 0; i < 19; i++){
        if(Math.abs(x - (i * spacew + space)) < spacewhalf){
            X = i;
            break;
        }
    }

    for(let i = 0; i < 19; i++){
        if(Math.abs(y - (i * spaceh + space)) < spacehhalf){
            Y = i;
            break;
        }
    }
    return {
        x: X,
        y: Y
    }
}

//节流
function throttle(func, wait) {
    let timeout; //设置延迟
    return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}