
function forms() {
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
}

export default forms;