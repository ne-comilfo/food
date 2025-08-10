
document.addEventListener('DOMContentLoaded', () => {
    import tabs from ('./modules/tabs')
    import timer  from ('./modules/timer')
    import slider from ('./modules/slider')
    import modal  from ('./modules/modal')
    import forms  from ('./modules/forms')
    import cards  from ('./modules/cards')
    import calc from ('./modules/calc')
    tabs();
    timer();
    slider();
    modal();
    forms();
    cards();
    calc();
})