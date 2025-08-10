document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabParent = document.querySelector('.tabheader__items');

    function hiddenTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hiddenTabContent();
    showTabContent();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hiddenTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    const endData = new Date('2025-07-29'),
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

    const timer1 = setTimeout(openModal, 150000000);
    const elementsModal = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal'); // обёртка
    elementsModal.forEach(item => {
        item.addEventListener('click', openModal);

    })

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(timer1);
    }

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    })
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // в конец страницы, по скольку вся страничка = сколько прокрутил + размер экрана клиента
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll);

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
    const getResourse = async (url) => {
        const res = await fetch(url); // GET
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    }

    // getResourse('http://localhost:3000/menu').then((data) => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     })
    // })

    getResourse('http://localhost:3000/menu').then((data) => {
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

    // forms 
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        fail: 'Что-то пошло не так....'
    }

    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindSendForm(item);
    })

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

            sendForm('http://localhost:3000/requests', json) // пришел промис
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
        openModal();
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
            closeModal();
        }, 4000);
    }

    // slider 

    const leftArrow = document.querySelector('.offer__slider-prev'),
        rigthArrow = document.querySelector('.offer__slider-next'),
        sliderImgs = document.querySelectorAll('.offer__slide'),
        currentPage = document.querySelector('#current');
    let currentIndex = 0;
    function hideSliderImg() {
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

    })

    rigthArrow.addEventListener('click', (e) => {
        currentIndex = (currentIndex + 1) % 4;
        hi
    })
})