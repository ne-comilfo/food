// slider 
const dotsByHand = [];
const leftArrow = document.querySelector('.offer__slider-prev'),
    slider = document.querySelector('.offer__slider'),
    rigthArrow = document.querySelector('.offer__slider-next'),
    sliderImgs = document.querySelectorAll('.offer__slide'),
    currentPage = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
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
// сохранить выбранные чузы в локал стораж