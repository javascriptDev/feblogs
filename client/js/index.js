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

layout();