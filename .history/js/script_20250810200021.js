import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calc from './modules/calc';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    const timer1 = setTimeout(() => openModal('.modal', timer1), 150000000);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer();
    slider();
    modal('[data-modal]', '.modal', timer1);
    forms('form', timer1);
    cards();
    calc();
})