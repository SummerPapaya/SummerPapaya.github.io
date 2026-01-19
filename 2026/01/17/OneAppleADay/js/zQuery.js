  function getbyclassname(tagname,classname){//ͨ��������ȡԪ�غ���������Ϊ��Ԫ�ء�����������ֵΪԪ������
  var result=new Array();
  var allclass=document.getElementsByTagName(tagname);
  for (var i=0; i<allclass.length;i++ )
  {

   if(classname==allclass[i].className)
	   result.push(allclass[i]);
  }
  return result;
  }

function win(attr)
{//��ȡ�������ߴ磬����Ϊheight|width
	switch(attr)
		{           
			case 'height'://��ȡ���ڸ߶�
             if (window.innerHeight)
			{
                   winHeight = window.innerHeight;return winHeight;
			}else if ((document.body) && (document.body.clientHeight)){
                   winHeight = document.body.clientHeight;return winHeight;
			}
			if (document.documentElement  && document.documentElement.clientHeight)
             {
                 winHeight = document.documentElement.clientHeight;return winHeight;
             }
			 break;
			case 'width'://��ȡ���ڿ���
			  if (window.innerWidth){
                   winWidth = window.innerWidth;return winWidth;
			  }else if ((document.body) && (document.body.clientWidth)){
                   winWidth = document.body.clientWidth;   return winWidth;          
			  }//ͨ������Document�ڲ���body���м�⣬��ȡ���ڴ�С
             if (document.documentElement  &&document.documentElement.clientWidth)
             {
                 winWidth = document.documentElement.clientWidth;return winWidth;
             }
			 break;
			 case 'scrollTop':
				var scrollTop;
				if(typeof window.pageYOffset != 'undefined'){
				scrollTop = window.pageYOffset;
				}
				else
				if(typeof document.compatMode != 'undefined' &&
				document.compatMode != 'BackCompat'){
				scrollTop = document.documentElement.scrollTop;
				}
				else 
				if(typeof document.body != 'undefined'){
				scrollTop = document.body.scrollTop;
				}
				return scrollTop;break;
			default :return 0;break;
		}
}

  function css(obj, attr)
{
	var re=[];
		switch(attr){
		case 'rotate':var transformstr=obj.currentStyle?obj.currentStyle['transform']:document.defaultView.getComputedStyle(obj, false)['webkitTransform']||document.defaultView.getComputedStyle(obj, false)['msTransform']||document.defaultView.getComputedStyle(obj, false)['MozTransform']||document.defaultView.getComputedStyle(obj, false)['OTransform']||document.defaultView.getComputedStyle(obj, false)['transform']+"";
								var matrixarray=transformstr.split(",");
								re.push(Math.asin(matrixarray[1])/Math.PI*180);return re;break;
			default :
			re.push(parseInt(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]));return re;break;
		}
}
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

