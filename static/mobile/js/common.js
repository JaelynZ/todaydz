/* zepto.min.js */
/* baiduTemplate.js */
/**
 * baiduTemplateç®€å•å¥½ç”¨çš„Javascriptæ¨¡æ¿å¼•æ“Ž 1.0.6 ç‰ˆæœ¬
 * http://baidufe.github.com/BaiduTemplate
 * å¼€æºåè®®ï¼šBSD License
 * æµè§ˆå™¨çŽ¯å¢ƒå ç”¨å‘½åç©ºé—´ baidu.template ï¼ŒnodejsçŽ¯å¢ƒç›´æŽ¥å®‰è£… npm install baidutemplate
 * @param str{String} domç»“ç‚¹IDï¼Œæˆ–è€…æ¨¡æ¿string
 * @param data{Object} éœ€è¦æ¸²æŸ“çš„jsonå¯¹è±¡ï¼Œå¯ä»¥ä¸ºç©ºã€‚å½“dataä¸º{}æ—¶ï¼Œä»ç„¶è¿”å›žhtmlã€‚
 * @return å¦‚æžœæ— dataï¼Œç›´æŽ¥è¿”å›žç¼–è¯‘åŽçš„å‡½æ•°ï¼›å¦‚æžœæœ‰dataï¼Œè¿”å›žhtmlã€‚
 * @author wangxiao
 * @email 1988wangxiao@gmail.com
 */

;(function(window){

    //å–å¾—æµè§ˆå™¨çŽ¯å¢ƒçš„baiduå‘½åç©ºé—´ï¼Œéžæµè§ˆå™¨çŽ¯å¢ƒç¬¦åˆcommonjsè§„èŒƒexportså‡ºåŽ»
    //ä¿®æ­£åœ¨nodejsçŽ¯å¢ƒä¸‹ï¼Œé‡‡ç”¨baidu.templateå˜é‡å
    var baidu = typeof module === 'undefined' ? (window.baidu = window.baidu || {}) : module.exports;

    //æ¨¡æ¿å‡½æ•°ï¼ˆæ”¾ç½®äºŽbaidu.templateå‘½åç©ºé—´ä¸‹ï¼‰
    baidu.template = function(str, data){

        //æ£€æŸ¥æ˜¯å¦æœ‰è¯¥idçš„å…ƒç´ å­˜åœ¨ï¼Œå¦‚æžœæœ‰å…ƒç´ åˆ™èŽ·å–å…ƒç´ çš„innerHTML/valueï¼Œå¦åˆ™è®¤ä¸ºå­—ç¬¦ä¸²ä¸ºæ¨¡æ¿
        var fn = (function(){

            //åˆ¤æ–­å¦‚æžœæ²¡æœ‰documentï¼Œåˆ™ä¸ºéžæµè§ˆå™¨çŽ¯å¢ƒ
            if(!window.document){
                return bt._compile(str);
            };

            //HTML5è§„å®šIDå¯ä»¥ç”±ä»»ä½•ä¸åŒ…å«ç©ºæ ¼å­—ç¬¦çš„å­—ç¬¦ä¸²ç»„æˆ
            var element = document.getElementById(str);
            if (element) {

                //å–åˆ°å¯¹åº”idçš„domï¼Œç¼“å­˜å…¶ç¼–è¯‘åŽçš„HTMLæ¨¡æ¿å‡½æ•°
                if (bt.cache[str]) {
                    return bt.cache[str];
                };

                //textareaæˆ–inputåˆ™å–valueï¼Œå…¶å®ƒæƒ…å†µå–innerHTML
                var html = /^(textarea|input)$/i.test(element.nodeName) ? element.value : element.innerHTML;
                return bt._compile(html);

            }else{

                //æ˜¯æ¨¡æ¿å­—ç¬¦ä¸²ï¼Œåˆ™ç”Ÿæˆä¸€ä¸ªå‡½æ•°
                //å¦‚æžœç›´æŽ¥ä¼ å…¥å­—ç¬¦ä¸²ä½œä¸ºæ¨¡æ¿ï¼Œåˆ™å¯èƒ½å˜åŒ–è¿‡å¤šï¼Œå› æ­¤ä¸è€ƒè™‘ç¼“å­˜
                return bt._compile(str);
            };

        })();

        //æœ‰æ•°æ®åˆ™è¿”å›žHTMLå­—ç¬¦ä¸²ï¼Œæ²¡æœ‰æ•°æ®åˆ™è¿”å›žå‡½æ•° æ”¯æŒdata={}çš„æƒ…å†µ
        var result = bt._isObject(data) ? fn( data ) : fn;
        fn = null;

        return result;
    };

    //å–å¾—å‘½åç©ºé—´ baidu.template
    var bt = baidu.template;

    //æ ‡è®°å½“å‰ç‰ˆæœ¬
    bt.versions = bt.versions || [];
    bt.versions.push('1.0.6');

    //ç¼“å­˜  å°†å¯¹åº”idæ¨¡æ¿ç”Ÿæˆçš„å‡½æ•°ç¼“å­˜ä¸‹æ¥ã€‚
    bt.cache = {};

    //è‡ªå®šä¹‰åˆ†éš”ç¬¦ï¼Œå¯ä»¥å«æœ‰æ­£åˆ™ä¸­çš„å­—ç¬¦ï¼Œå¯ä»¥æ˜¯HTMLæ³¨é‡Šå¼€å¤´ <! !>
    bt.LEFT_DELIMITER = bt.LEFT_DELIMITER||'<%';
    bt.RIGHT_DELIMITER = bt.RIGHT_DELIMITER||'%>';

    //è‡ªå®šä¹‰é»˜è®¤æ˜¯å¦è½¬ä¹‰ï¼Œé»˜è®¤ä¸ºé»˜è®¤è‡ªåŠ¨è½¬ä¹‰
    bt.ESCAPE = true;

    //HTMLè½¬ä¹‰
    bt._encodeHTML = function (source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/\\/g,'&#92;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
    };

    //è½¬ä¹‰å½±å“æ­£åˆ™çš„å­—ç¬¦
    bt._encodeReg = function (source) {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g,'\\$1');
    };

    //è½¬ä¹‰UI UIå˜é‡ä½¿ç”¨åœ¨HTMLé¡µé¢æ ‡ç­¾onclickç­‰äº‹ä»¶å‡½æ•°å‚æ•°ä¸­
    bt._encodeEventHTML = function (source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;')
            .replace(/\\\\/g,'\\')
            .replace(/\\\//g,'\/')
            .replace(/\\n/g,'\n')
            .replace(/\\r/g,'\r');
    };

    //å°†å­—ç¬¦ä¸²æ‹¼æŽ¥ç”Ÿæˆå‡½æ•°ï¼Œå³ç¼–è¯‘è¿‡ç¨‹(compile)
    bt._compile = function(str){
        var funBody = "var _template_fun_array=[];\nvar fn=(function(__data__){\nvar _template_varName='';\nfor(name in __data__){\n_template_varName+=('var '+name+'=__data__[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('"+bt._analysisStr(str)+"');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";
        return new Function("_template_object",funBody);
    };

    //åˆ¤æ–­æ˜¯å¦æ˜¯Objectç±»åž‹
    bt._isObject = function (source) {
        return 'function' === typeof source || !!(source && 'object' === typeof source);
    };

    //è§£æžæ¨¡æ¿å­—ç¬¦ä¸²
    bt._analysisStr = function(str){

        //å–å¾—åˆ†éš”ç¬¦
        var _left_ = bt.LEFT_DELIMITER;
        var _right_ = bt.RIGHT_DELIMITER;

        //å¯¹åˆ†éš”ç¬¦è¿›è¡Œè½¬ä¹‰ï¼Œæ”¯æŒæ­£åˆ™ä¸­çš„å…ƒå­—ç¬¦ï¼Œå¯ä»¥æ˜¯HTMLæ³¨é‡Š <!  !>
        var _left = bt._encodeReg(_left_);
        var _right = bt._encodeReg(_right_);

        str = String(str)

        //åŽ»æŽ‰åˆ†éš”ç¬¦ä¸­jsæ³¨é‡Š
            .replace(new RegExp("("+_left+"[^"+_right+"]*)//.*\n","g"), "$1")

            //åŽ»æŽ‰æ³¨é‡Šå†…å®¹  <%* è¿™é‡Œå¯ä»¥ä»»æ„çš„æ³¨é‡Š *%>
            //é»˜è®¤æ”¯æŒHTMLæ³¨é‡Šï¼Œå°†HTMLæ³¨é‡ŠåŒ¹é…æŽ‰çš„åŽŸå› æ˜¯ç”¨æˆ·æœ‰å¯èƒ½ç”¨ <! !>æ¥åšåˆ†å‰²ç¬¦
            .replace(new RegExp("<!--.*?-->", "g"),"")
            .replace(new RegExp(_left+"\\*.*?\\*"+_right, "g"),"")

            //æŠŠæ‰€æœ‰æ¢è¡ŒåŽ»æŽ‰  \rå›žè½¦ç¬¦ \tåˆ¶è¡¨ç¬¦ \næ¢è¡Œç¬¦
            .replace(new RegExp("[\\r\\t\\n]","g"), "")

            //ç”¨æ¥å¤„ç†éžåˆ†éš”ç¬¦å†…éƒ¨çš„å†…å®¹ä¸­å«æœ‰ æ–œæ  \ å•å¼•å· â€˜ ï¼Œå¤„ç†åŠžæ³•ä¸ºHTMLè½¬ä¹‰
            .replace(new RegExp(_left+"(?:(?!"+_right+")[\\s\\S])*"+_right+"|((?:(?!"+_left+")[\\s\\S])+)","g"),function (item, $1) {
                var str = '';
                if($1){

                    //å°† æ–œæ  å•å¼• HTMLè½¬ä¹‰
                    str = $1.replace(/\\/g,"&#92;").replace(/'/g,'&#39;');
                    while(/<[^<]*?&#39;[^<]*?>/g.test(str)){

                        //å°†æ ‡ç­¾å†…çš„å•å¼•å·è½¬ä¹‰ä¸º\r  ç»“åˆæœ€åŽä¸€æ­¥ï¼Œæ›¿æ¢ä¸º\'
                        str = str.replace(/(<[^<]*?)&#39;([^<]*?>)/g,'$1\r$2')
                    };
                }else{
                    str = item;
                }
                return str ;
            });


        str = str
        //å®šä¹‰å˜é‡ï¼Œå¦‚æžœæ²¡æœ‰åˆ†å·ï¼Œéœ€è¦å®¹é”™  <%var val='test'%>
            .replace(new RegExp("("+_left+"[\\s]*?var[\\s]*?.*?[\\s]*?[^;])[\\s]*?"+_right,"g"),"$1;"+_right_)

            //å¯¹å˜é‡åŽé¢çš„åˆ†å·åšå®¹é”™(åŒ…æ‹¬è½¬ä¹‰æ¨¡å¼ å¦‚<%:h=value%>)  <%=value;%> æŽ’é™¤æŽ‰å‡½æ•°çš„æƒ…å†µ <%fun1();%> æŽ’é™¤å®šä¹‰å˜é‡æƒ…å†µ  <%var val='test';%>
            .replace(new RegExp("("+_left+":?[hvu]?[\\s]*?=[\\s]*?[^;|"+_right+"]*?);[\\s]*?"+_right,"g"),"$1"+_right_)

            //æŒ‰ç…§ <% åˆ†å‰²ä¸ºä¸€ä¸ªä¸ªæ•°ç»„ï¼Œå†ç”¨ \t å’Œåœ¨ä¸€èµ·ï¼Œç›¸å½“äºŽå°† <% æ›¿æ¢ä¸º \t
            //å°†æ¨¡æ¿æŒ‰ç…§<%åˆ†ä¸ºä¸€æ®µä¸€æ®µçš„ï¼Œå†åœ¨æ¯æ®µçš„ç»“å°¾åŠ å…¥ \t,å³ç”¨ \t å°†æ¯ä¸ªæ¨¡æ¿ç‰‡æ®µå‰é¢åˆ†éš”å¼€
            .split(_left_).join("\t");

        //æ”¯æŒç”¨æˆ·é…ç½®é»˜è®¤æ˜¯å¦è‡ªåŠ¨è½¬ä¹‰
        if(bt.ESCAPE){
            str = str

            //æ‰¾åˆ° \t=ä»»æ„ä¸€ä¸ªå­—ç¬¦%> æ›¿æ¢ä¸º â€˜ï¼Œä»»æ„å­—ç¬¦,'
            //å³æ›¿æ¢ç®€å•å˜é‡  \t=data%> æ›¿æ¢ä¸º ',data,'
            //é»˜è®¤HTMLè½¬ä¹‰  ä¹Ÿæ”¯æŒHTMLè½¬ä¹‰å†™æ³•<%:h=value%>
                .replace(new RegExp("\\t=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'");
        }else{
            str = str

            //é»˜è®¤ä¸è½¬ä¹‰HTMLè½¬ä¹‰
                .replace(new RegExp("\\t=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':$1,'");
        };

        str = str

        //æ”¯æŒHTMLè½¬ä¹‰å†™æ³•<%:h=value%>
            .replace(new RegExp("\\t:h=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'")

            //æ”¯æŒä¸è½¬ä¹‰å†™æ³• <%:=value%>å’Œ<%-value%>
            .replace(new RegExp("\\t(?::=|-)(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':$1,'")

            //æ”¯æŒurlè½¬ä¹‰ <%:u=value%>
            .replace(new RegExp("\\t:u=(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':encodeURIComponent($1),'")

            //æ”¯æŒUI å˜é‡ä½¿ç”¨åœ¨HTMLé¡µé¢æ ‡ç­¾onclickç­‰äº‹ä»¶å‡½æ•°å‚æ•°ä¸­  <%:v=value%>
            .replace(new RegExp("\\t:v=(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':baidu.template._encodeEventHTML($1),'")

            //å°†å­—ç¬¦ä¸²æŒ‰ç…§ \t åˆ†æˆä¸ºæ•°ç»„ï¼Œåœ¨ç”¨'); å°†å…¶åˆå¹¶ï¼Œå³æ›¿æ¢æŽ‰ç»“å°¾çš„ \t ä¸º ');
            //åœ¨ifï¼Œforç­‰è¯­å¥å‰é¢åŠ ä¸Š '); ï¼Œå½¢æˆ ');if  ');for  çš„å½¢å¼
            .split("\t").join("');")

            //å°† %> æ›¿æ¢ä¸º_template_fun_array.push('
            //å³åŽ»æŽ‰ç»“å°¾ç¬¦ï¼Œç”Ÿæˆå‡½æ•°ä¸­çš„pushæ–¹æ³•
            //å¦‚ï¼šif(list.length=5){%><h2>',list[4],'</h2>');}
            //ä¼šè¢«æ›¿æ¢ä¸º if(list.length=5){_template_fun_array.push('<h2>',list[4],'</h2>');}
            .split(_right_).join("_template_fun_array.push('")

            //å°† \r æ›¿æ¢ä¸º \
            .split("\r").join("\\'");

        return str;
    };

})(window);

/* m.slide.js */
var Mo = Mo || {};
(function(){
    Mo.slide = function (options){
        this.cur = 0;
        this.options = $.extend({delay : 5000}, options);
        this.init();
        Mo.slide.list.push(this);
    }

    Mo.slide.prototype = {
        init : function(){
            var _this = this,
                items = $(this.options.items),
                target = $(this.options.target),
                hasTap = this.options.hasTap === false ? false : true,
                nav_target = $(this.options.nav_target),
                margin = this.options.margin || 0,
                width = this.options.width,
                ratio = this.options.ratio || 0,
                height;

            if(this.options.resize === true){
                width = this.options.width = window.innerWidth || document.documentElement.clientWidth;
            }

            _this.prehtml = target.html();

            this.item_lenth =items.length;
            _this.cur = this.item_lenth;
            _this.real_cur = 0;

            var html = target.html();
            target.append(html + html);
            items = $(this.options.items);

            items.removeClass("cur").eq(_this.cur).addClass("cur");

            if (ratio > 0){
                height = Math.round(width / ratio);
                items.width(width).height(height).show();
                target.width(items.length * (width + margin)).height(height);
            } else {
                items.width(width).show();
                target.width(items.length * (width + margin));
            }

            target.css("margin-left", - this.item_lenth * (width + margin));
            this.max_margin_left = (items.length - 1) * (width + margin);

            nav_target.html("");

            for(var i = 0; i < this.item_lenth; i++){
                nav_target.append("<li></li>");
            }

            nav_target.find("li").eq(0).addClass("cur");

            _this.bind();

            _this.autoPlay();
        },

        bind : function(){
            var _this = this,
                items = $(this.options.items),
                target = $(this.options.target),
                hasTap = this.options.hasTap === false ? false : true,
                nav_target = $(this.options.nav_target),
                margin = this.options.margin || 0,
                width = this.options.width,
                ratio = this.options.ratio || 0;

            var is_touch_start = false;
            var start_x, end_x, start_y, end_y, margin_left;

            target.unbind("touchstart").bind("touchstart", function(e){
                var $this = $(this);
                if (is_touch_start) return false;

                is_touch_start = true;
                margin_left = parseInt(target.css("margin-left"));
                start_x = e.changedTouches[0].clientX;
                start_y = e.changedTouches[0].clientY;
                _this.stop();

            }).unbind("touchmove").bind("touchmove", function(e){
                var $this = $(this);
                if (!is_touch_start) return false;

                end_x = e.changedTouches[0].clientX;
                end_y = e.changedTouches[0].clientY;

                var _margin_left = end_x - start_x + margin_left;
                (_margin_left > 0) && (_margin_left = 0);
                (_margin_left < -_this.max_margin_left) && (_margin_left = -_this.max_margin_left);

                target.css({
                    "margin-left" : _margin_left
                });

                if (Math.abs(end_x - start_x) > 20 ){
                    e.preventDefault();
                }

            }).unbind("touchend").bind("touchend", function(e){
                is_touch_start = false;
                width = _this.options.width;
                var next = end_x - start_x > 0 ? _this.cur - 1 : _this.cur + 1;

                setTimeout(function(){
                    if (next >= 0 && next < items.length && Math.abs(end_x - start_x) > width / 3){
                        target.animate({
                            "margin-left" : - next * (width + margin)
                        }, 200, 'linear', function(){
                            items = $(_this.options.items);
                            if (next > _this.cur){
                                target.append(items[0]);
                                _this.real_cur++;
                                if (_this.real_cur == _this.item_lenth){
                                    _this.real_cur = 0;
                                }
                            } else {
                                target.prepend(items[items.length - 1]);
                                _this.real_cur--;
                                if (_this.real_cur == -1){
                                    _this.real_cur = _this.item_lenth - 1;
                                }
                            }

                            items.removeClass("cur").eq(next).addClass("cur");
                            nav_target.find("li").removeClass("cur").eq(_this.real_cur).addClass("cur");
                            target.css("margin-left", - _this.item_lenth * (width + margin));
                            items = $(_this.options.items);

                            _this.autoPlay();

                        });
                    } else {
                        target.animate({
                            "margin-left" : - _this.cur * (width + margin)
                        }, 200, 'linear', function(){
                            _this.autoPlay();
                        });
                    }

                },0);

            });
        },

        stop : function(){
            if (!this.options.autoplay) return;
            clearInterval(this.autoplaytimer);
        },

        autoPlay : function(){
            if (!this.options.autoplay) return;
            var _this = this,
                items = $(this.options.items),
                target = $(this.options.target),
                hasTap = this.options.hasTap === false ? false : true,
                nav_target = $(this.options.nav_target),
                margin = this.options.margin || 0,
                width = this.options.width,
                delay = this.options.delay;

            _this.stop();

            _this.autoplaytimer = setInterval(function(){
                var next = _this.cur + 1;
                width = _this.options.width;
                target.animate({
                    "margin-left" : - next * (width + margin)
                }, 200, function(){
                    items = $(_this.options.items);
                    target.append(items[0]);
                    _this.real_cur++;
                    if (_this.real_cur == _this.item_lenth){
                        _this.real_cur = 0;
                    }

                    nav_target.find("li").removeClass("cur").eq(_this.real_cur).addClass("cur");
                    target.css("margin-left", - _this.item_lenth * (width + margin));
                });

            }, delay);
        },

        reset : function(width){
            var _this = this,
                items = $(this.options.items),
                target = $(this.options.target),
                margin = this.options.margin  || 0,
                nav_target = $(this.options.nav_target),
                ratio = this.options.ratio || 0,
                height;

            this.options.width = width;

            if (ratio > 0){
                height = Math.round(width / ratio);
                items.width(width).height(height).show();
                target.width(items.length * (width + margin)).height(height);
            } else {
                items.width(width).show();
                target.width(items.length * (width + margin));
            }

            this.max_margin_left = (items.length - 1) * (width + margin);

            target.css({
                "margin-left" : - _this.cur * (width + margin)
            }, 200);
        }
    }

    Mo.slide.list = [];

    var RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        resize_time;

    var v_width;
    window.addEventListener(RESIZE_EV, function(){
        clearTimeout(resize_time);

        v_width = window.innerWidth || document.documentElement.clientWidth;
        resize_time = setTimeout(function(){
            for(var i = Mo.slide.list.length - 1; i >= 0; i--){
                if(typeof Mo.slide.list[i].options.resize === "function"){
                    Mo.slide.list[i].resize();
                } else if(Mo.slide.list[i].options.resize === true){
                    Mo.slide.list[i].reset(v_width);
                }
            }
        }, 500);
    });
})();


