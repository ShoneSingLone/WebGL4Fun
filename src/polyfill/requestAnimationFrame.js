/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = (function () {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

if (!window.cancelAnimationFrame) {

    window.cancelAnimationFrame = (function () {
        return window.webkitcancelAnimationFrame ||
            window.mozcancelAnimationFrame ||
            window.ocancelAnimationFrame ||
            window.mscancelAnimationFrame ||
            function (id) {
                window.clearTimeout(id);
            };
    })();
}