var classData = [];
classData["2"] = "母婴";
classData["3"] = "美妆";
classData["4"] = "居家";
classData["5"] = "鞋包配饰";
classData["6"] = "美食";
// classData["7"]="文体";
classData["8"] = "家电数码";
classData["10"] = "女装";
classData["12"] = "男装";
classData["11"] = "内衣";
classData["9"] = "其他";

var config = new Object();
config.isLoading = false;
config.page = 1;
config.sort=1;
config.isSort=false;

function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {

            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);

        }
    }
    return theRequest;
}

function setClassData() {

    var html = "";
    for (var key in classData) {
        var value = classData[key];

        html += "<a class=\"ceil\" href=\"./mobileclass.html?id=" + key + "\">" + value + "</a>";
    }
    $("div#class_info").append(html);
    return html;


}


/**
 *
 * @param page 页数
 * @param cat_par_id 对应分类id，即对应category表parent_id=0的ID，对应goods表的category_parent_id
 * @param cha_id 对应9.9 等
 * @param order 排序
 */
function loadmore(page, cat_par_id) {
    //console.log("加载更多");
    // document.getElementById("js-loadmore").innerHTML="正在加载...";

    jQuery.ajax({
        type: 'GET',
        async: false,
        data: {"page": page, "cat": cat_par_id, "page_size": 100},
        url: "https://api.todaydz.com/api/qingsoulist",
        success: function (data) {
            showData(data);
            config.isLoading = false;
            config.page += 1;

        },
        error: function () {
            config.isLoading = false;

        }
    });
}

function initSort(){
    for(var i=1;i<=4;i++) {

        if (i == config.sort) {
            $("div#sort_" + i).addClass("active");
        } else {
            $("div#sort_" + i).removeClass("active");
        }
    }
}

function sort(type){



    for(var i=1;i<=4;i++){

        if(i==type){
            $("div#sort_"+i).addClass("active");
        }else{
            $("div#sort_"+i).removeClass("active");
        }

     if(i==4&&i==type){
         var temp=$("#price_dirction").attr("class");
         if(temp==""){

             $("#price_dirction").addClass("up")

         }else if(temp=="up"){

             $("#price_dirction").removeClass("up")
             $("#price_dirction").addClass("down")
             type
                 =7;
         }else if(temp=="down"){
             $("#price_dirction").removeClass("down")
             $("#price_dirction").addClass("up")
         }
     }



    }


    config.page=1;
    config.sort=type;
    config.isLoading=false;
    if(!config.isSort){
        config.isSort=true;
        loadmore(1, getRequest().id,type);
    }


}
function replaceParamVal(paramName,replaceWith) {
    var oUrl = this.location.href.toString();
    var re=eval('/('+ paramName+'=)([^&]*)/gi');
    var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
    this.location = nUrl;
    window.location.href=nUrl
}


function loadmore(page, cat_par_id,sort) {
    //console.log("加载更多");
    // document.getElementById("js-loadmore").innerHTML="正在加载...";

    jQuery.ajax({
        type: 'GET',
        async: false,
        data: {"page": page, "cat": cat_par_id, "page_size": 100,"sort":sort},
        url: "https://api.todaydz.com/api/qingsoulist",
        success: function (data) {
            showData(data);
            config.isLoading = false;
            config.page += 1;

        },
        error: function () {
            config.isLoading = false;

        }
    });
}

function srarch(page, word) {
    //console.log("加载更多");
    // document.getElementById("js-loadmore").innerHTML="正在加载...";
    jQuery.ajax({
        type: 'GET',
        async: false,
        data: {"page": page, "key_word": word, "page_size": 100},
        url: "https://api.todaydz.com/api/search",
        success: function (data) {
            showData(data);
        },
        error: function () {
        }
    });
}

function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}


function listens() {

    window.onscroll = function () {
        if (getScrollHeight() - (getScrollTop() + getClientHeight()) < 100) {

            //此处发起AJAX请求
            if (!config.isLoading) {

                config.isLoading = true;
                console.log(config);
                loadmore(config.page + 1, 2)
            }
        }
    }
    return;

}
function listensClass() {

    window.onscroll = function () {
        if (getScrollHeight() - (getScrollTop() + getClientHeight()) < 100) {

            //此处发起AJAX请求
            if (!config.isLoading) {
                config.isLoading = true;
                console.log(config);
                loadmore(config.page + 1, 2,config.sort)
            }
        }
    }
    return;

}





function showData(data) {

    var obj = data;
    if (obj.er_code == 10000) {
        var html = "";
        var list = data.data.list;
        for (i = 0; i < list.length; i++) {
            html += getItem(list[i]);
        }
        if(config.isSort){
            config.isSort=false;
            $("div#js_search_list").empty();
            $("div#js_search_list").append(html);


        }else{
            $("div#js_search_list").append(html);
        }


    } else {
        // document.getElementById("js-loadmore").innerHTML="没有更多...";
        //document.getElementById("js-loadmore").innerHTML="点击加载更多";
    }

    function mul(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {
        }
        try {
            c += e.split(".")[1].length;
        } catch (f) {
        }
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    }

    function sub(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
    }

    function getItem(goods) {
        var html = "<div class=\"flex media-list line-btm\" >\n" +

            "    <div class=\"media-img\">\n" +
            "        <a href=\"https://uland.taobao.com/coupon/edetail?pid=mm_31587245_36774800_169834419&itemId=" + goods.goods_id + "&activityId=" + goods.coupon_id + "\" class=\"link wap-clk-counter\" \">\n" +
            "            <img class=\"lazy\" src=\"" + (goods.goods_pic.indexOf("http") == 0 ? goods.goods_pic : "http:" + goods.goods_pic+"_180x180xzq90.jpg") + "\" alt=\"" + goods.goods_short_title + "\" lazyimgloaded=\"true\" style=\"opacity: 1;\">\n" +
            "        </a>\n" +
            "    </div>\n" +
            "    <div class=\"flex-col media-main\">\n" +
            "        <a href=\"https://uland.taobao.com/coupon/edetail?pid=mm_31587245_36774800_169834419&itemId=" + goods.goods_id + "&activityId=" + goods.coupon_id + "\" \">\n" +
            "            <div class=\"title\">\n" +
            goods.goods_short_title + "</div>\n" +


            "            <div class=\"coupon\">\n" +
            "                <span class=\"txt\">券后</span>\n" +
            "                <span class=\"symbol\">¥</span>\n" +
            "                <span class=\"price\">" + (sub(goods.goods_price, goods.coupon_price)) + "</span>\n" +
            "            </div>\n" +
            "            <div class=\"flex commission\"></div>\n" +
            "            <div class=\"flex icon-area\">\n" +
            "                <div class=\"flex-col sales\">月销量：" + goods.goods_sales + "</div>\n" +
            "                <div class=\"icons\">\n" +
            "                    <span class=\"media-list-icon xian\"></span><span class=\"media-list-icon\"></span>                </div>\n" +
            "            </div>\n" +
            "        </a>\n" +
            "\n" +
            "        <span class=\"coupon-price\">\n" +
            "            <a class=\"wap-clk-counter ali\"   href=\"https://uland.taobao.com/coupon/edetail?pid=mm_31587245_36774800_169834419&itemId=" + goods.goods_id + "&activityId=" + goods.coupon_id + "\">" +
            "<em>券</em><b>" + goods.coupon_price + "元</b></a>\n" +
            "        </span>\n" +
            "    </div>\n" +

            "</div>"
        ;
        return html;
    }


}