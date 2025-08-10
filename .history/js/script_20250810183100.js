
document.addEventListener('DOMContentLoaded', () => {
    import    tabs =require('./modules/tabs')
    import    timer  require('./modules/timer')
    import    slider= require('./modules/slider')
    import    modal  require('./modules/modal')
    import    forms  require('./modules/forms')
    import    cards  require('./modules/cards')
    import    calc =require('./modules/calc')
    tabs();
    timer();
    slider();
    modal();
    forms();
    cards();
    calc();
})