function openModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(timer1);
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(modalAttribute, modalSelector) {
    const timer1 = setTimeout(openModal, 150000000);
    const elementsModal = document.querySelectorAll(modalAttribute),
        modalWindow = document.querySelector(modalSelector); // обёртка
    elementsModal.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector));

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
            openModal(modalSelector);
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll);


}

export default modal;
export { openModal, closeModal };