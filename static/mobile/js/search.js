'use strict';
function check_search() {
    var keyword = $.trim($('input[name="keyword"]').val());
    //console.log(keyword);
    if(keyword){
        setHistoryItems(keyword);
    }

    if (!keyword) {
        return false;
    }



}

function search_pop() {
    var maskWidth = $(document).width();
    var maskHeight = $(document).height();
    var str = '<div style="position:absolute;background-color:#eee;left:0;top:0;width:'+maskWidth+'px; height:100%;z-index:999;" id="pop_bg">';
    $("body").append(str);
    $('#search_pop').show().css({position:"fixed", zIndex:1000, left:0, top:0});
    var display = $('.autocomplete-result-back').css('display');
    if (display == 'none') {
        var resultContainer = $('.autocomplete-result');
        resultContainer.html('');
        resultContainer.hide();
        $('.autocomplete-result-back').show();
    }
    $('input[name="keyword"]').val('').focus();
    $(".apptip").hide();
    $(".clist").hide();
    $('.more').hide();
    $('.foot').hide();
    listensDelteItem();
    getHistory();
};

function close_search_pop() {
    $('#search_pop').hide();
    $('#pop_bg').remove();

    $(".clist").show();
    $('.more').show();
    $('.foot').show();
};

$(function() {

    $('#clear_keyword_input').click(function() {
        $('input[name="keyword"]').val('').focus();
        var display = $('.autocomplete-result-back').css('display');
        if (display == 'none') {
            var resultContainer = $('.autocomplete-result');
            resultContainer.html('');
            resultContainer.hide();
            $('.autocomplete-result-back').show();
        }
    });

    //清空历史记录
    $('#clear_search_record').click(function() {
        // $.get('?m=search&op=clear_searched');
        $('ul.search_his_list').empty();
        $('h3.search_tip').html('还没有搜索记录哦~');
        $(this).remove();
        clearHistory();
    });

    //清空记录

    $('.clear_keyword').click(function(){console.log('222')});
});


function listensDelteItem(){
    $('.clear_keyword').click(function() {
        console.log("清空");
        var clear_key = $(this).prev().html();
        deleteHistory(clear_key);
        console.log("清楚单个");

        $(this).parent().remove();
        if (!$('ul.search_his_list').has('li').length) {
            $('#clear_search_record').remove();
            $('h3.search_tip').html('还没有搜索记录哦~');
        }

    });
};

function hideLoadMore() {
    $('#foot_more').hide();
};


function back() {
    history.go(-1);
}

	



function getHistory(){

    var str=localStorage.historyItems;
    var s = '';
    console.log(str+" "+(str==''));
    if(str==undefined){
        //s='<div class="rmssts">暂无搜索记录...</div>';
        //$("#lssslb").append(s);
        console.log("没有搜索历史")
        $('h3.search_tip').html('还没有搜索记录哦~');
        $('#clear_search_record').remove();
    }else{
        if(str=='')return;
        var strs= new Array();
        strs=str.split("|");
        for(var i=0;i<strs.length;i++){
            s+=" <li><a href='/mobile/search.do?keyword="+strs[i]+"'>"+strs[i]+"</a><span class='clear_keyword'></span></li>";

        }
        $('ul.search_his_list').html(s);
    }

};

function deleteHistory(keyword){
    console.log("未发现Cookies");
    var historyItems=localStorage;
    if (historyItems === undefined) {
        console.log("未发现Cookies");
    } else {
        historyItems =  historyItems.split('|').filter(e != keyword);;
        localStorage.historyItems = historyItems;
    }

}



function setHistoryItems(keyword) {
    if(keyword==null||keyword=='')return;
    var historyItems=localStorage;
    if (historyItems === undefined) {
        localStorage.historyItems = keyword;
    } else {
        historyItems = keyword + '|' + historyItems.split('|').filter( e != keyword).join('|');
        localStorage.historyItems = historyItems;
    }
};
//清除值
function clearHistory() {
    localStorage.removeItem('historyItems');
    console.log("clear");

}  ;
	
