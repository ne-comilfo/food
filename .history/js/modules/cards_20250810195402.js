import { getResourse } from "../services/service";
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
}

export default cards;