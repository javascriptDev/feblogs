/**
 * author :  a2014.
 * date   :  14/12/26.
 */

function layout() {
    var left = $('.left'),
        content = $('.content'),
        header = $('.header');


    var h = $(window).height() - header.height() - 20 + 'px';

    left.height(h);
    content.height(h);
}

function initEvent() {
    var c = $('.content');
    var list = $('.left');
    list.delegate('.item', 'click', function () {

//        var html = '<hgroup class="a-head"> <h1>asdas</h1><h3>作者:addison </h3><h4>' +
//            new Date() +
//            '</h4></hgroup><section>asdasdada</section>';
//        c.html(html);
        c.addClass('openDownRightOut');
    })
}

initEvent();
layout();