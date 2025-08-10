import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calc from './modules/calc';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    tabs();
    timer();
    slider();
    modal('[data-modal]', '.modal', timer1);
    forms();
    cards();
    calc();
})