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

    const timer1 = setTimeout(openModal, 15000);
    const elementsModal = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal'), // обёртка
        cancelModal = document.querySelector('[data-close]');

    elementsModal.forEach(item => {
        item.addEventListener('click', openModal);

    })

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        clearTimeout(timer1);
    }

    function closeModal() {

        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
    }
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModal();
        }
    })
    cancelModal.addEventListener('click', closeModal);

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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu__field .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        '.menu__field .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        '.menu__field .container',
        'menu__item'
    ).render();

    // forms 
    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        fail: 'Что-то пошло не так....'
    }

    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        const inputData = item.querySelectorAll('input');
        let flag = true;
        inputData.forEach(i => {
            if (i.length === 0) flag = false;
        });
        if (flag) sendForm(item);
    })
    function sendForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json'); // multipart/form-data не нужно юзать вместе с ajax и fetch
            const formData = new FormData(form);
            const obj = {};
            formData.forEach((key, value) => {
                obj[key] = value;
            });
            request.send(JSON.stringify(obj));
            request.addEventListener('load', (e) => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                } else {
                    statusMessage.textContent = message.fail;
                }
                form.reset();
                const id = setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            })
        });
    };

    function showThanksModal () {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        const thanksText = document.createElement('div');
        thanksText.classList.add('modal__dialog').add('modal__content');
        thanksText.innerHTML = `
            <div class='modal__close'>&times</div>
            <div class='modal__></div>
        `;
    }
})