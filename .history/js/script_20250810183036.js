
document.addEventListener('DOMContentLoaded', () => {
    timer = require('./modules/timer'),
    tabs = require('./modules/tabs'),
        slider = require('./modules/slider'),
        modal = require('./modules/modal'),
        forms = require('./modules/forms'),
        cards = require('./modules/cards'),
        calc = require('./modules/calc');
    tabs();
    timer();
    slider();
    modal();
    forms();
    cards();
    calc();
})