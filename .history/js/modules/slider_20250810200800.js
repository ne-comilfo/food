function slider({ prevArrow, nextArrow, sliderSelector, current, slidesWrapperSelector, slidesFieldSelector, sliderImgsSelector }) {
    // slider 
    const dotsByHand = [];
    const leftArrow = document.querySelector(prevArrow'.offer__slider-prev'),
        slider = document.querySelector(sliderSelector'.offer__slider'),
        rigthArrow = document.querySelector(nextArrow'.offer__slider-next'),
        sliderImgs = document.querySelectorAll(sliderImgsSelector'.offer__slide'),
        currentPage = document.querySelector(current'#current'),
        slidesWrapper = document.querySelector(slidesWrapperSelector'.offer__slider-wrapper'),
        slidesField = document.querySelector(slidesFieldSelector'.offer__slider-inner'),
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

export default slider;