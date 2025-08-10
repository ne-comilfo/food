
document.addEventListener('DOMContentLoaded', () => {
    import tabs from require('./modules/tabs')
    import timer  from require('./modules/timer')
    import slider from require('./modules/slider')
    import modal  from require('./modules/modal')
    import forms  from require('./modules/forms')
    import cards  from require('./modules/cards')
    import calc from require('./modules/calc')
    tabs();
    timer();
    slider();
    modal();
    forms();
    cards();
    calc();
})