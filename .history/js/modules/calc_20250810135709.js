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