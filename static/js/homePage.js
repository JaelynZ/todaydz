var sort;
var page;
var page_size;
var cat;
var min_price;
var max_price;
var is_new;
var is_ju;
var is_tqg;
var searchWord;
var currentCheckApiType = "goodList";

$(function () {
    menuTabSelected('goodBank');
    menuTabUnSelected('hot');
    initData();
    bindEvent();
    loadGoodBankData();
});
function initData() {
    sort = 1;
    page = 1;
    page_size = 100;
    cat = 0;
    min_price = 0;
    max_price = 100000;
    is_new = 0;
    is_ju = 0;
    is_tqg = 0;
    searchWord = "";

    $("#is_new").attr("checked", false);
    $("#is_ju").attr("checked", false);
    $("#is_tqg").attr("checked", false);

}
function bindEvent() {
    $('#search').bind('keypress',function(event){
        if(event.keyCode == "13"){
            search();
        }
    });
    $("#is_new").change(function() {
        if(is_new == 1){
            is_new = 0;
        }else {
            is_new = 1;
        }
        setPrice();
        loadGoodBankData();
    });
    $("#is_ju").change(function() {
        if(is_ju == 1){
            is_ju = 0;
        }else {
            is_ju = 1;
        }
        setPrice();
        loadGoodBankData();
    });
    $("#is_tqg").change(function() {
        if(is_tqg == 1){
            is_tqg = 0;
        }else {
            is_tqg = 1;
        }
        setPrice();
        loadGoodBankData();
    });
    $('#min_price').bind('keypress',function(event){
        if(event.keyCode == "13"){
            setPrice();
            loadGoodBankData();
        }
    });
    $('#max_price').bind('keypress',function(event){
        if(event.keyCode == "13"){
            setPrice();
            loadGoodBankData();
        }
    });
}

function setPrice() {
    min_price = $('#min_price').val();
    if(min_price == ""){
        min_price = 0;
    }
    max_price = $('#max_price').val();
    if(max_price == ""){
        max_price = 100000;
    }
}

function setSort(value) {
    sort = value;
    for(var i = 0; i<= 4; i++){
        $('#sort'+i).removeAttr("style");
    }
    $('#sort'+value).css("color","#FF4400");
    loadGoodBankData();
}

function setCat(value) {
    cat = value;
    for(var i = 0; i<= 12; i++){
        $('#cat'+i).removeAttr("style");
    }
    $('#cat'+value).css("color","#FF4400");

    loadGoodBankData();
}

function search() {
    initData();
    searchWord = $('#search').val();
    if(searchWord == ""){
        window.location.href="";
    }
    currentCheckApiType = "goodSearch";
    loadGoodBankData();
}

//加载商品库页面
function loadGoodBankData() {
    var apiUrl;
    var param;

    if (currentCheckApiType == 'goodList') {
        param = "?sort=" + sort + "&page=" + page + "&page_size=" + page_size + "&cat=" + cat +
            "&min_price=" + min_price + "&max_price=" + max_price + "&new=" + is_new +
            "&is_ju=" + is_ju + "&is_tqg=" + is_tqg + "&is_ali=0";
        apiUrl = apiEnum.goodList + param;
    } else if (currentCheckApiType == 'goodSearch') {
        param = "?s_type=1&key_word=" + searchWord + "&page=" + page + "&cat=" + cat +
            "&min_price=" + min_price + "&max_price=" + max_price + "&sort=" + sort +
            "&new=" + is_new +"&is_ju=" + is_ju + "&is_tqg=" + is_tqg + "&is_ali=0";
        apiUrl = apiEnum.goodSearch + param;
    } else if(currentCheckApiType == 'goodExplosion'){
        param = "?cat=" + cat ;
        apiUrl = apiEnum.goodExplosion + param;
    }


    $.ajax({
        type: 'get',
        url: apiUrl,
        data: {},
        async: false,
        success: function (data) {
            if (data.data.total == 0) {
                alert("未查询到想要的数据！");
                return;
            }
            if (currentCheckApiType == 'goodExplosion' && data.data.length == 0) {
                alert("未查询到想要的数据！");
                return;
            }
            renderingContentList(data.data);
        }
    });

}

//渲染页面商品列表
function renderingContentList(data) {
    var total = data.total;
    var list = data.list;

    if(currentCheckApiType == 'goodExplosion'){
        total = data.length;
        list = data;
        $("#pageDiv").hide();
    }else {
        $("#pageDiv").show();
        updatePagger(total);
    }

    if (total == 0) {
        return;
    }
    //清空content-list内的元素
    $("div.content-list").empty();

    //填充分页组件

    for (var i = 0; i < list.length; i++) {
        var good = list[i];
        var couponAfterPrice =  good.goods_price - good.coupon_price;
        var hrefUrl = "https://uland.taobao.com/coupon/edetail?pid=mm_31587245_36774800_169834419&itemId=" + good.goods_id + "&activityId=" + good.coupon_id +"";
        var content = "<div class=\"good-out-border\">\n" +
            "                    <div class=\"good-inner-border\">\n" +
            "                        <div class=\"good-pic-box\">\n" +
            "                            <a class=\"good-pic-url\" target=\"_blank\" href=\""+ hrefUrl +"\">\n" +
            "                                <img class=\"good-pic\" src=\"" + good.goods_pic + "_300x300.jpg\">\n" +
            "                            </a>\n" +
            "                        </div>\n" +
            "                        <div class=\"good-title-box\">\n" +
            "                            <a class=\"good-title-url\" rel=\"nofollow\" target=\"_blank\" href=\"\"+ hrefUrl +\"\" >\n" +
            "                                <p class=\"good-title\" title=\"" + good.goods_short_title + "\">\n" +
            "                                    " + good.goods_short_title + "\n" +
            "                                </p>\n" +
            "                            </a>\n" +
            "                        </div>\n" +
            "                        <div class=\"good-price-box\">\n" +
            "                            <div class=\"good-price-left\">\n" +
            "                                <span class=\"good-price-icon\">券后 <i class=\"good-price-num-font\">¥</i></span>\n" +
            "                                <span class=\"good-price-num\"> " + couponAfterPrice.toFixed(1) + "</span>\n" +
            "                            </div>\n" +
            "                            <div class=\"good-price-right\">月销：" + good.goods_sales + "</div>\n" +
            "                        </div>\n" +
            "                        <div class=\"good-price-box\">\n" +
            "                            <div class=\"good-price-left\">\n" +
            "                                <span class=\"good-price-icon\">优惠券 <i class=\"good-price-num-font\">¥</i></span>\n" +
            "                                <span class=\"good-price-num\"> " + good.coupon_price + "</span>\n" +
            "                            </div>\n" +
            "                            <div class=\"good-price-right\">余量：" + good.coupon_number + "</div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>";

        $("div.content-list").append(content);

    }


}

//更新分页插件
function updatePagger(total) {
    if(total <= 100){
        $("#pageDiv").hide();
    }else {
        $("#pageDiv").show();
    }
    var setTotalCount = total;
    $('#pagger').paging({
        initPageNo: page, // 初始页码
        totalPages: Math.round(setTotalCount/100), //总页数
        totalCount: '合计' + setTotalCount + '条数据', // 条目总数
        slideSpeed: 600, // 缓动速度。单位毫秒
        jump: true, //是否支持跳转
        callback: function(pageNum) { // 回调函数
            if(page != pageNum){
                page = pageNum;
                loadGoodBankData();
                $('body,html').animate({ scrollTop: 0},500);
            }
        }
    })
}

function loadGoodBankTab() {
    $("#conditionDiv").show();
    initData();
    currentCheckApiType = "goodList";
    menuTabSelected('goodBank');
    menuTabUnSelected('hot');
    setCat(0);
}

//加载热销页面
function loadHotTab() {
    $("#conditionDiv").hide();
    initData();
    currentCheckApiType = "goodExplosion";
    menuTabSelected('hot');
    menuTabUnSelected('goodBank');
    setCat(0);
}

//菜单tab选中
function menuTabSelected(id) {
    $("#" + id).css("background-color","#E64C3E");
    $("#" + id).css("color","white");
}

//菜单tab取消选中
function menuTabUnSelected(id) {
    $("#" + id).css("background-color","#FFFFFF");
    $("#" + id).css("color","black");
}

//获取搜索热词
function getHotWord() {
    $.ajax({
        type: 'get',
        url: apiEnum.goodHotRank + "?t=1",
        data: {},
        async: false,
        success: function (data) {
            console.log(data);
        }
    });
}

