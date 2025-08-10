document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabParent = document.querySelector('.tabheader__items');
    
    function hiddenTabContent() {
        tabContent.forEach(item => {
            item.style.display = 'none';
        })
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i) {
        tabContent[i].style.display = 'block';
        tabContent[i].classList.add('tabheader__item_active');
    }

    hiddenTabContent();
    
})