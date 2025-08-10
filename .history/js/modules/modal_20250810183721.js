function modal() {
    const timer1 = setTimeout(openModal, 150000000);
    const elementsModal = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal'); // обёртка
    elementsModal.forEach(item => {
        item.addEventListener('click', openModal);

    })

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


}

export default modal;