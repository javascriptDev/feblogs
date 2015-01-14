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
        var me = $(this);
        var title = me.find('.i-title').text(),
            date = me.find('.i-date').text() || new Date(),
            content = me.find('.i-content').html();

        var html = '<hgroup class="a-head"><h1> ' + title + '</h1><h3>作者:{{author}}</h3><h4>' + date + '</h4></hgroup>' +
            '<section>' + content + '</section>';
        c.html(html);
    })
}
initEvent();
layout();