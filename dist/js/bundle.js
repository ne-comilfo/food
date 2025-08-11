/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const genderData = document.querySelectorAll('#gender .calculating__choose-item'),
        sizeData = document.querySelectorAll('.calculating__choose_medium input'),
        activeData = document.querySelectorAll('.calculating__choose_big .calculating__choose-item'),
        calcResult = document.querySelector('.calculating__result'),
        params = {
            gender: '',
            height: 0,
            weight: 0,
            age: 0,
            activity: '',
        };

    const sex = localStorage.getItem('sex'),
        activity = localStorage.getItem('activity');

    if (sex !== null) {
        delActiveClass(genderData);
        genderData.forEach(field => {
            if (field.id == sex) {
                params.gender = field.id;
                checkParamsAndCalc();
                field.classList.add('calculating__choose-item_active');
            }
        })
    }
    if (activity !== null) {
        delActiveClass(activeData);
        activeData.forEach(field => {
            if (field.id === activity) {
                params.activity = field.id;
                checkParamsAndCalc();
                field.classList.add('calculating__choose-item_active');
            }
        })
    }
    function delActiveClass(data) {
        data.forEach(field => {
            field.classList.remove('calculating__choose-item_active');
        })
    }

    function checkParamsAndCalc() {
        const isEmpty = Object.values(params).some(val => !val);

        if (isEmpty) {
            calcResult.innerHTML = '_____ккал';
            return;
        }

        const genderP = coeefs[params.gender];
        const resultKkal =
            coeefs[params.activity] *
            (genderP.first +
                (genderP.weight * params.weight) +
                (genderP.height * params.height) -
                (genderP.age * params.age));

        calcResult.innerHTML = `<span>${Math.round(resultKkal)}</span> ккал`;
    }


    genderData.forEach(field => {
        field.addEventListener('click', (e) => {
            delActiveClass(genderData);
            const target = e.target;
            if (target && target.classList.contains('calculating__choose-item')) {
                params.gender = target.id;
                checkParamsAndCalc();
                target.classList.add('calculating__choose-item_active');
                localStorage.setItem('sex', target.id);
            }

        })
    })
    activeData.forEach(field => {
        field.addEventListener('click', (e) => {
            delActiveClass(activeData);
            const target = e.target;
            if (target && target.classList.contains('calculating__choose-item')) {
                params.activity = target.id;
                checkParamsAndCalc();
                target.classList.add('calculating__choose-item_active');
                localStorage.setItem('activity', target.id);
            }
        })
    })

    sizeData.forEach(inp => {
        inp.addEventListener('input', (e) => {
            const target = e.target;
            if (target.value.match(/\D/g)) {
                target.style.border = '1px solid red';
            } else {
                target.style.border = '';
            }
            params[target.id] = +target.value;
            checkParamsAndCalc();

        }
        )
    })
    const coeefs = {
        low: 1.375,
        small: 1.55,
        medium: 1.725,
        high: 1.9,
        male: {
            first: 88.36,
            weight: 13.4,
            height: 4.8,
            age: 5.7,
        },
        female: {
            first: 447.6,
            weight: 9.2,
            height: 3.1,
            age: 4.3,
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");

function cards() {
    class MenuCard {
        constructor(src, alt, subtitle, description, price, parent, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.description = description;
            this.price = price;
            this.parent = parent;
            this.classes = classes;
        }

        render() {
            const goida = document.querySelector(`${this.parent}`);
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                const className = 'menu__item';
                element.classList.add(className);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `<img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}"</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>`;
            goida.append(element);
        }
    }
    

    // getResourse('http://localhost:3000/menu').then((data) => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     })
    // })

    (0,_services_service__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/menu').then((data) => {
        createCard(data);
    })

    function createCard(data) {
        data.forEach(({ img, altimg, title, descr, price }) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');

            element.innerHTML = `<img src="${img}" alt="${altimg}">
                <h3 class="menu__item-subtitle">${title}"</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            </div>`;

            const parent = document.querySelector('.menu .container');
            parent.append(element);
        })
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");


function forms(formSelector, timer1) {
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        fail: 'Что-то пошло не так....'
    }

    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        bindSendForm(item);
    })

    function bindSendForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json'); // multipart/form-data не нужно юзать вместе с ajax и fetch

            const formData = new FormData(form); // могу передать так, могу передать в виде JSON

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_service__WEBPACK_IMPORTED_MODULE_1__.sendForm)('http://localhost:3000/requests', json) // пришел промис
                .then(data => {
                    showThanksModal(message.success);
                }).catch(() => {
                    showThanksModal(message.fail);
                }).finally(() => {
                    statusMessage.remove();
                    form.reset();
                })

            // const obj = {};
            // formData.forEach((value, key) => {
            //     obj[key] = value;
            // });
            // request.send(JSON.stringify(obj));
            // request.addEventListener('load', (e) => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //     } else {
            //         showThanksModal(message.fail);
            //     }
            //     statusMessage.remove();
            //     form.reset();
            // })
        });
    };

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', timer1);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, timer1) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (timer1) {
        clearTimeout(timer1);
    }
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(modalAttribute, modalSelector, timer1) {

    const elementsModal = document.querySelectorAll(modalAttribute),
        modalWindow = document.querySelector(modalSelector); // обёртка
    elementsModal.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, timer1));

    })

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    })
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // в конец страницы, по скольку вся страничка = сколько прокрутил + размер экрана клиента
            openModal(modalSelector, timer1);
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll);


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ prevArrow, nextArrow, sliderSelector, current, slidesWrapperSelector, slidesFieldSelector, sliderImgsSelector }) {
    // slider 
    const dotsByHand = [];
    const leftArrow = document.querySelector(prevArrow),
        slider = document.querySelector(sliderSelector),
        rigthArrow = document.querySelector(nextArrow),
        sliderImgs = document.querySelectorAll(sliderImgsSelector),
        currentPage = document.querySelector(current),
        slidesWrapper = document.querySelector(slidesWrapperSelector),
        slidesField = document.querySelector(slidesFieldSelector),
        width = window.getComputedStyle(slidesWrapper).width;

    let currentIndex = 0;
    let offset = 0;

    slidesField.style.width = 100 * sliderImgs.length + '%';
    sliderImgs.forEach((slide) => {
        slide.style.width = width;
    })
    slider.style.position = 'relative';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    const dots = document.createElement('ol');
    dots.classList.add('carousel-indicators');
    slider.append(dots);
    for (let i = 0; i < sliderImgs.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dots.append(dot);
        dotsByHand.push(dot);
        if (i === 0) dot.style.opacity = 1;
    }
    rigthArrow.addEventListener('click', (e) => {
        if (offset == parseInt(width) * (sliderImgs.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        currentIndex = Math.floor(offset / parseInt(width));
        currentPage.textContent = `0${currentIndex + 1}`;
        dotsByHand.forEach(dot => {
            dot.style.opacity = .5;
        })
        dotsByHand[currentIndex].style.opacity = 1;
    })
    leftArrow.addEventListener('click', (e) => {
        if (offset == 0) {
            offset = parseInt(width) * (sliderImgs.length - 1);
        } else {
            offset -= parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        currentIndex = Math.floor(Math.abs(offset) / parseInt(width));
        currentPage.textContent = `0${currentIndex + 1}`;
        dotsByHand.forEach(dot => {
            dot.style.opacity = .5;
        })
        dotsByHand[currentIndex].style.opacity = 1;
    })

    dotsByHand.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            currentIndex = slideTo - 1;
            currentPage.textContent = `0${currentIndex + 1}`;
            offset = parseInt(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            dotsByHand.forEach(dot => {
                dot.style.opacity = .5;
            })
            dotsByHand[currentIndex].style.opacity = 1;
        })
    })

    /* function hideSliderImg() {
        sliderImgs.forEach((item) => {
            item.classList.remove('show');
            item.classList.add('hide');
        })
    }

    function showSliderImg (currentIndex = 0) {
        sliderImgs[currentIndex].classList.remove('hide');
        sliderImgs[currentIndex].classList.add('show');
    }
    hideSliderImg();
    showSliderImg();

    leftArrow.addEventListener('click', (e) => {
        if (currentIndex - 1 < 0) currentIndex = 3;
        else {
            currentIndex--;
        }
        hideSliderImg();
        showSliderImg(currentIndex);
        currentPage.textContent = `0${currentIndex + 1}`
    })

    rigthArrow.addEventListener('click', (e) => {
        currentIndex = (currentIndex + 1) % 4;
        hideSliderImg();
        showSliderImg(currentIndex);
        currentPage.textContent = `0${currentIndex + 1}`
    }) */

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabsContentSelector),
        tabParent = document.querySelector(tabsParentSelector);

    function hiddenTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(activeClass);
    }

    hiddenTabContent();
    showTabContent();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hiddenTabContent();
                    showTabContent(i);
                }
            })
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadline) {
    const endData = new Date(deadline),
        hours = document.querySelector('#hours'),
        days = document.querySelector('#days'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds');

    function updateData() {
        const startData = new Date();
        let diffData = endData - startData;
        if (diffData <= 0) {
            days.textContent = '0';
            hours.textContent = '0';
            minutes.textContent = '0';
            seconds.textContent = '0';
            clearInterval(timerId);
            return;
        }
        const totalSeconds = Math.floor(diffData / 1000);
        days.textContent = Math.floor(totalSeconds / (3600 * 24));
        hours.textContent = Math.floor(totalSeconds / (3600) % 24) - 3;
        minutes.textContent = Math.floor(totalSeconds / 60) % 60;
        seconds.textContent = totalSeconds % 60;
    }
    const timerId = setInterval(updateData, 1000);
    updateData();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/service.js":
/*!********************************!*\
  !*** ./js/services/service.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResourse: () => (/* binding */ getResourse),
/* harmony export */   sendForm: () => (/* binding */ sendForm)
/* harmony export */ });
const sendForm = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    })
    return await res.json(); // дождаться готового промиса потом вернуть
}

const getResourse = async (url) => {
    const res = await fetch(url); // GET
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









document.addEventListener('DOMContentLoaded', () => {
    const timer1 = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', timer1), 150000000);
    const deadline = '2025-07-29';
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])(deadline);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
        prevArrow: '.offer__slider-prev',
        sliderSelector: '.offer__slider',
        nextArrow: '.offer__slider-next',
        sliderImgsSelector: '.offer__slide',
        current: '#current',
        slidesWrapperSelector: '.offer__slider-wrapper',
        slidesFieldSelector: '.offer__slider-inner',
    });
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', timer1);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', timer1);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map